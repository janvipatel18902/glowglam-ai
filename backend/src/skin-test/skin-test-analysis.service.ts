import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InferenceClient } from '@huggingface/inference';
import * as fs from 'fs';
import * as path from 'path';

type SkinConcern = 'acne' | 'dryness' | 'dark_circles' | 'oiliness' | 'redness';
type SkinType = 'dry' | 'oily' | 'combination' | 'normal';
type Sensitivity = 'low' | 'medium' | 'high';

type ClassificationItem = {
  label: string;
  score: number;
};

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

      const normalized: ClassificationItem[] = Array.isArray(rawResult)
        ? rawResult.map((item) => ({
          label: String(item.label || '').toLowerCase(),
          score: Number(item.score || 0),
        }))
        : [];

      const skincare = this.mapLabelsToSkincare(normalized);

      return {
        resultJson: {
          rawLabels: normalized,
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

  private mapLabelsToSkincare(labels: ClassificationItem[]) {
    const has = (keywords: string[]) =>
      labels
        .filter((item) =>
          keywords.some((keyword) => item.label.includes(keyword)),
        )
        .reduce((sum, item) => sum + item.score, 0);

    const dryScore = has(['dry', 'powder', 'ash', 'flake']);
    const oilyScore = has(['oil', 'oily', 'shine', 'gloss']);
    const acneScore = has(['acne', 'pimple', 'blemish', 'spot']);
    const darkCircleScore = has(['dark circle', 'eye bag', 'under-eye']);
    const rednessScore = has(['red', 'rash', 'irritation', 'inflamed']);

    let skinType: SkinType = 'normal';

    if (dryScore >= 0.2 && oilyScore >= 0.2) {
      skinType = 'combination';
    } else if (oilyScore > dryScore && oilyScore >= 0.2) {
      skinType = 'oily';
    } else if (dryScore > oilyScore && dryScore >= 0.2) {
      skinType = 'dry';
    }

    const concerns: SkinConcern[] = [];

    if (dryScore >= 0.18) concerns.push('dryness');
    if (oilyScore >= 0.18) concerns.push('oiliness');
    if (acneScore >= 0.15) concerns.push('acne');
    if (darkCircleScore >= 0.12) concerns.push('dark_circles');
    if (rednessScore >= 0.12) concerns.push('redness');

    let sensitivity: Sensitivity = 'low';
    if (rednessScore >= 0.2) {
      sensitivity = 'high';
    } else if (rednessScore >= 0.1 || dryScore >= 0.22) {
      sensitivity = 'medium';
    }

    const evidenceScore = Math.max(
      dryScore,
      oilyScore,
      acneScore,
      darkCircleScore,
      rednessScore,
      0.15,
    );

    const confidence = Math.min(0.92, Math.max(0.3, evidenceScore));

    return {
      skinType,
      sensitivity,
      concerns: [...new Set(concerns)],
      confidence: Number(confidence.toFixed(2)),
    };
  }

  private buildSummary(skincare: {
    skinType: SkinType;
    sensitivity: Sensitivity;
    concerns: SkinConcern[];
    confidence: number;
  }) {
    const formattedConcerns =
      skincare.concerns.length > 0
        ? skincare.concerns.map((item) => item.replace('_', ' ')).join(', ')
        : 'no strong concerns';

    if (skincare.confidence < 0.45) {
      return `The analysis suggests ${skincare.skinType} skin with ${skincare.sensitivity} sensitivity, but confidence is limited. Possible concerns: ${formattedConcerns}.`;
    }

    return `The analysis suggests ${skincare.skinType} skin with ${skincare.sensitivity} sensitivity. Detected concerns: ${formattedConcerns}.`;
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
          'Use a gentle cleanser twice daily to remove buildup without stripping the skin barrier.',
      },
      {
        title: 'Daily Sunscreen',
        description:
          'Apply broad-spectrum SPF 30+ every morning to protect your skin from UV damage.',
      },
    ];

    if (skincare.skinType === 'dry' || skincare.concerns.includes('dryness')) {
      recommendations.push({
        title: 'Hydrating Serum',
        description:
          'Use a hydrating serum with hyaluronic acid or glycerin to improve moisture retention.',
      });
      recommendations.push({
        title: 'Barrier Moisturizer',
        description:
          'Choose a moisturizer with ceramides to support the skin barrier and reduce tightness.',
      });
    }

    if (skincare.skinType === 'oily' || skincare.concerns.includes('oiliness')) {
      recommendations.push({
        title: 'Lightweight Moisturizer',
        description:
          'Use a lightweight, non-comedogenic moisturizer to hydrate without feeling greasy.',
      });
    }

    if (skincare.concerns.includes('acne')) {
      recommendations.push({
        title: 'Niacinamide Serum',
        description:
          'Use niacinamide to help calm blemish-prone skin and support oil balance.',
      });
    }

    if (skincare.concerns.includes('dark_circles')) {
      recommendations.push({
        title: 'Eye Cream',
        description:
          'Use a hydrating eye cream to improve the appearance of the under-eye area.',
      });
    }

    if (skincare.sensitivity === 'high') {
      recommendations.push({
        title: 'Barrier Repair Cream',
        description:
          'Use a barrier-support cream with soothing ingredients and avoid harsh actives for now.',
      });
    }

    return recommendations;
  }
}