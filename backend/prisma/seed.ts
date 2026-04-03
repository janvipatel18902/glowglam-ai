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

  const cerave = await prisma.brand.upsert({
    where: { slug: 'cerave' },
    update: {},
    create: {
      name: 'CeraVe',
      slug: 'cerave',
      description: 'Dermatologist-developed skincare brand.',
      logoUrl: 'https://example.com/cerave-logo.png',
    },
  });

  const ordinary = await prisma.brand.upsert({
    where: { slug: 'the-ordinary' },
    update: {},
    create: {
      name: 'The Ordinary',
      slug: 'the-ordinary',
      description: 'Science-driven skincare products.',
      logoUrl: 'https://example.com/the-ordinary-logo.png',
    },
  });

  await prisma.product.upsert({
    where: { slug: 'hydrating-cleanser' },
    update: {},
    create: {
      brandId: cerave.id,
      name: 'Hydrating Cleanser',
      slug: 'hydrating-cleanser',
      description: 'Gentle cleanser for normal to dry skin.',
      imageUrl: 'https://example.com/hydrating-cleanser.png',
      price: 14.99,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'moisturizing-lotion' },
    update: {},
    create: {
      brandId: cerave.id,
      name: 'Moisturizing Lotion',
      slug: 'moisturizing-lotion',
      description: 'Lightweight daily moisturizer.',
      imageUrl: 'https://example.com/moisturizing-lotion.png',
      price: 16.99,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'niacinamide-10-zinc-1' },
    update: {},
    create: {
      brandId: ordinary.id,
      name: 'Niacinamide 10% + Zinc 1%',
      slug: 'niacinamide-10-zinc-1',
      description: 'Serum for blemish-prone skin.',
      imageUrl: 'https://example.com/niacinamide.png',
      price: 12.5,
    },
  });

  await prisma.$disconnect();
  await pool.end();

  console.log('Seeding completed successfully');
}

main().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
