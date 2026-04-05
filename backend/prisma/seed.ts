import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  const pool = new Pool({
    connectionString,
  });

  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const brands = [
    {
      name: 'GlowLab',
      slug: 'glowlab',
      description: 'Hydration-focused skincare for soft, radiant skin.',
      logoUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Radiance Co',
      slug: 'radiance-co',
      description: 'Brightening essentials for a healthy-looking glow.',
      logoUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Pure Beauty',
      slug: 'pure-beauty',
      description: 'Gentle daily skincare designed for balance and comfort.',
      logoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Youth Labs',
      slug: 'youth-labs',
      description: 'Antioxidant and radiance-support formulas.',
      logoUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Sun Shield',
      slug: 'sun-shield',
      description: 'Moisture and recovery care for day and night.',
      logoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Derma Care',
      slug: 'derma-care',
      description: 'Barrier-support and treatment products for sensitive skin.',
      logoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    },
  ];

  const brandMap: Record<string, string> = {};

  for (const brand of brands) {
    const savedBrand = await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {
        name: brand.name,
        description: brand.description,
        logoUrl: brand.logoUrl,
      },
      create: brand,
    });

    brandMap[brand.slug] = savedBrand.id;
  }

  const products = [
    {
      brandSlug: 'glowlab',
      name: 'Hydrating Serum',
      slug: 'hydrating-serum',
      description:
        'A lightweight hydrating serum designed to improve skin glow, softness, and moisture balance for everyday skincare routines.',
      imageUrl:
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80',
      price: 45,
    },
    {
      brandSlug: 'radiance-co',
      name: 'Brightening Cream',
      slug: 'brightening-cream',
      description:
        'A brightening cream enriched with glow-supporting ingredients to improve dullness and uneven-looking skin tone.',
      imageUrl:
        'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80',
      price: 52,
    },
    {
      brandSlug: 'pure-beauty',
      name: 'Gentle Cleanser',
      slug: 'gentle-cleanser',
      description:
        'A mild daily cleanser that removes impurities while helping maintain the skin barrier and moisture balance.',
      imageUrl:
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80',
      price: 28,
    },
    {
      brandSlug: 'youth-labs',
      name: 'Vitamin C Serum',
      slug: 'vitamin-c-serum',
      description:
        'A daily antioxidant serum formulated to support brightness, clarity, and a healthy-looking radiant complexion.',
      imageUrl:
        'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=80',
      price: 48,
    },
    {
      brandSlug: 'sun-shield',
      name: 'Night Moisture',
      slug: 'night-moisture',
      description:
        'An overnight moisturizer that helps replenish hydration and supports smoother, softer skin by morning.',
      imageUrl:
        'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&w=1200&q=80',
      price: 39,
    },
    {
      brandSlug: 'derma-care',
      name: 'Barrier Repair',
      slug: 'barrier-repair',
      description:
        'A barrier-support treatment made for stressed or sensitive skin to help reduce dryness and restore comfort.',
      imageUrl:
        'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80',
      price: 56,
    },
    {
      brandSlug: 'pure-beauty',
      name: 'Hydrating Cleanser',
      slug: 'hydrating-cleanser',
      description:
        'A soft foaming cleanser that refreshes the skin without stripping away moisture.',
      imageUrl:
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
      price: 26,
    },
    {
      brandSlug: 'glowlab',
      name: 'Daily Glow Cream',
      slug: 'daily-glow-cream',
      description:
        'A soft daily cream that helps support smoother texture and lasting hydration.',
      imageUrl:
        'https://images.unsplash.com/photo-1601612628452-9e99ced43524?auto=format&fit=crop&w=1200&q=80',
      price: 34,
    },
    {
      brandSlug: 'derma-care',
      name: 'Soothing Repair Balm',
      slug: 'soothing-repair-balm',
      description:
        'A comforting treatment balm for dry, sensitive, or stressed skin.',
      imageUrl:
        'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?auto=format&fit=crop&w=1200&q=80',
      price: 42,
    },
    {
      brandSlug: 'sun-shield',
      name: 'Overnight Recovery Cream',
      slug: 'overnight-recovery-cream',
      description:
        'A rich overnight cream formulated to help the skin feel soft and replenished by morning.',
      imageUrl:
        'https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&w=1200&q=80',
      price: 44,
    },
    {
      brandSlug: 'radiance-co',
      name: 'Glow Renewal Treatment',
      slug: 'glow-renewal-treatment',
      description:
        'A treatment cream designed to support brightness and improve the look of uneven skin tone.',
      imageUrl:
        'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1200&q=80',
      price: 58,
    },
    {
      brandSlug: 'youth-labs',
      name: 'Bright Eye Cream',
      slug: 'bright-eye-cream',
      description:
        'A lightweight eye cream that helps refresh and brighten tired-looking eyes.',
      imageUrl:
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      price: 36,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        brandId: brandMap[product.brandSlug],
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
      },
      create: {
        brandId: brandMap[product.brandSlug],
        name: product.name,
        slug: product.slug,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
      },
    });
  }

  await prisma.$disconnect();
  await pool.end();

  console.log('Seeding completed successfully');
}

main().catch(async (error) => {
  console.error(error);
  process.exit(1);
});