import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const products = await this.prisma.product.findMany({
      include: {
        brand: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
        brand: {
          id: product.brand.id,
          name: product.brand.name,
          slug: product.brand.slug,
          logoUrl: product.brand.logoUrl,
        },
      })),
    };
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        brand: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return {
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
        brand: {
          id: product.brand.id,
          name: product.brand.name,
          slug: product.brand.slug,
          logoUrl: product.brand.logoUrl,
        },
      },
    };
  }
}
