import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SkinTestAnalysisService } from './skin-test-analysis.service';

@Injectable()
export class SkinTestService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly skinTestAnalysisService: SkinTestAnalysisService,
  ) { }

  create(userId: string, imageUrl: string) {
    return this.prisma.skinTest.create({
      data: {
        userId,
        status: 'uploaded',
        images: {
          create: [
            {
              imageUrl,
            },
          ],
        },
      },
      include: {
        images: true,
      },
    });
  }

  findByUser(userId: string) {
    return this.prisma.skinTest.findMany({
      where: { userId },
      include: {
        images: true,
        recommendations: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string) {
    const skinTest = await this.prisma.skinTest.findUnique({
      where: { id },
      include: {
        images: true,
        recommendations: true,
      },
    });

    if (!skinTest) {
      throw new NotFoundException('Skin test not found');
    }

    if (skinTest.userId !== userId) {
      throw new ForbiddenException('You cannot access this skin test');
    }

    return skinTest;
  }

  async analyze(id: string, userId: string) {
    const skinTest = await this.prisma.skinTest.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });

    if (!skinTest) {
      throw new NotFoundException('Skin test not found');
    }

    if (skinTest.userId !== userId) {
      throw new ForbiddenException('You cannot analyze this skin test');
    }

    const firstImage = skinTest.images[0];

    if (!firstImage) {
      throw new NotFoundException('No image found for this skin test');
    }

    const analysis = await this.skinTestAnalysisService.analyzeImage(
      firstImage.imageUrl,
    );

    await this.prisma.recommendation.deleteMany({
      where: { skinTestId: skinTest.id },
    });

    const updatedSkinTest = await this.prisma.skinTest.update({
      where: { id: skinTest.id },
      data: {
        status: 'completed',
        resultJson: JSON.parse(JSON.stringify(analysis.resultJson)),
        summary: analysis.summary,
        recommendations: {
          create: analysis.recommendations,
        },
      },
      include: {
        images: true,
        recommendations: true,
      },
    });

    return {
      message: 'Skin test analyzed successfully',
      skinTest: updatedSkinTest,
    };
  }

  async remove(id: string, userId: string) {
    const skinTest = await this.prisma.skinTest.findUnique({
      where: { id },
    });

    if (!skinTest) {
      throw new NotFoundException('Skin test not found');
    }

    if (skinTest.userId !== userId) {
      throw new ForbiddenException('You cannot delete this skin test');
    }

    await this.prisma.skinTest.delete({
      where: { id },
    });

    return {
      message: 'Skin test deleted successfully',
    };
  }
}