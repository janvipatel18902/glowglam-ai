import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InferenceClient } from '@huggingface/inference';
import * as fs from 'fs';
import * as path from 'path';

type SkinConcern = 'acne' | 'dryness' | 'dark_circles' | 'oiliness' | 'redness';
type SkinType = 'dry' | 'oily' | 'combination' | 'normal';
type Sensitivity = 'low' | 'medium' | 'high';

@Injectable()
export class SkinTestAnalysisService {
  async analyzeImage(imageUrl: string) {
    const apiKey = process.env.HUGGINGFACE_API_KEY;

    if (!apiKey) {
      throw new InternalServerErrorException('HUGGINGFACE_API_KEY is not set');
    }

    try {
      const fileName = imageUrl.split('/uploads/')[1];

      if (!fileName) {
        throw new InternalServerErrorException('Invalid image URL');
      }

      const filePath = path.join(process.cwd(), 'uploads', fileName);

      if (!fs.existsSync(filePath)) {
        throw new InternalServerErrorException(
          `Image file not found at ${filePath}`,
        );
      }

      const imageBuffer = fs.readFileSync(filePath);

      const extension = path.extname(filePath).toLowerCase();

      let mimeType = 'image/jpeg';
      if (extension === '.png') mimeType = 'image/png';
      if (extension === '.webp') mimeType = 'image/webp';

      const imageBlob = new Blob([imageBuffer], { type: mimeType });

      const client = new InferenceClient(apiKey);

      const rawResult = await client.imageClassification({
        model: 'google/vit-base-patch16-224',
        data: imageBlob,
      });

      const labels = Array.isArray(rawResult)
        ? rawResult.map((item) => item.label.toLowerCase())
        : [];

      const skincare = this.mapLabelsToSkincare(labels);

      return {
        resultJson: {
          rawLabels: rawResult,
          skincare,
        },
        summary: this.buildSummary(skincare),
        recommendations: this.buildRecommendations(skincare),
      };
    } catch (error) {
      console.error('HuggingFace error:', error);
      throw new InternalServerErrorException('HuggingFace analysis failed');
    }
  }

  private mapLabelsToSkincare(labels: string[]) {
    const joined = labels.join(' ');

    let skinType: SkinType = 'normal';
    let sensitivity: Sensitivity = 'medium';
    const concerns: SkinConcern[] = [];

    if (
      joined.includes('shine') ||
      joined.includes('gloss') ||
      joined.includes('oil')
    ) {
      skinType = 'oily';
      concerns.push('oiliness');
    }

    if (
      joined.includes('powder') ||
      joined.includes('dust') ||
      joined.includes('dry')
    ) {
      skinType = 'dry';
      concerns.push('dryness');
    }

    if (
      joined.includes('face') ||
      joined.includes('cheek') ||
      joined.includes('nose') ||
      joined.includes('skin') ||
      joined.includes('lipstick') ||
      joined.includes('mascara') ||
      joined.includes('hair slide')
    ) {
      skinType = 'combination';
    }

    if (
      joined.includes('spot') ||
      joined.includes('pimple') ||
      joined.includes('acne')
    ) {
      concerns.push('acne');
    }

    if (
      joined.includes('dark') ||
      joined.includes('shade') ||
      joined.includes('eyeshadow')
    ) {
      concerns.push('dark_circles');
    }

    if (
      joined.includes('red') ||
      joined.includes('rash') ||
      joined.includes('blush')
    ) {
      concerns.push('redness');
      sensitivity = 'high';
    }

    if (concerns.length === 0) {
      concerns.push('dryness', 'dark_circles');
    }

    const uniqueConcerns = [...new Set(concerns)];

    return {
      skinType,
      sensitivity,
      concerns: uniqueConcerns,
      confidence: 0.65,
    };
  }

  private buildSummary(skincare: {
    skinType: SkinType;
    sensitivity: Sensitivity;
    concerns: SkinConcern[];
    confidence: number;
  }) {
    const formattedConcerns = skincare.concerns
      .map((item) => item.replace('_', ' '))
      .join(', ');

    return `Your skin appears ${skincare.skinType} with ${skincare.sensitivity} sensitivity. Main concerns detected: ${formattedConcerns}.`;
  }

  private buildRecommendations(skincare: {
    skinType: SkinType;
    sensitivity: Sensitivity;
    concerns: SkinConcern[];
  }) {
    const recommendations = [
      {
        title: 'Gentle Cleanser',
        description:
          'Use a gentle cleanser twice daily to remove buildup without over-drying your skin.',
      },
      {
        title: 'Daily Moisturizer',
        description:
          'Apply a lightweight moisturizer every morning and night to support your skin barrier.',
      },
      {
        title: 'Sunscreen',
        description:
          'Use broad-spectrum SPF 30+ every day to protect your skin from sun damage.',
      },
    ];

    if (skincare.concerns.includes('acne')) {
      recommendations.push({
        title: 'Niacinamide Serum',
        description:
          'Use niacinamide serum to help calm blemish-prone skin and support oil balance.',
      });
    }

    if (skincare.concerns.includes('dryness')) {
      recommendations.push({
        title: 'Hydrating Serum',
        description:
          'Add a hydrating serum with hyaluronic acid to improve moisture retention.',
      });
    }

    if (skincare.concerns.includes('dark_circles')) {
      recommendations.push({
        title: 'Eye Cream',
        description:
          'Use an eye cream with hydrating ingredients to improve under-eye appearance.',
      });
    }

    if (skincare.sensitivity === 'high') {
      recommendations.push({
        title: 'Barrier Repair Cream',
        description:
          'Use a barrier-supporting cream with ceramides to reduce irritation and redness.',
      });
    }

    return recommendations;
  }
}
