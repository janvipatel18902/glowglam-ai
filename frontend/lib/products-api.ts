import { apiFetch } from './api';

export type ApiProduct = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    imageUrl: string | null;
    price: number | null;
    brand: {
        id: string;
        name: string;
        slug: string;
        logoUrl: string | null;
    };
};

export type ProductItem = {
    id: string;
    slug: string;
    name: string;
    brand: string;
    brandSlug: string;
    type: 'Serum' | 'Cream' | 'Cleanser' | 'Moisturizer' | 'Treatment';
    description: string;
    image: string;
    price: string;
    rating: string;
    skinType: string;
    usage: string;
    category: string;
    aiRecommended: string;
};

const PRODUCT_META: Record<
    string,
    Omit<ProductItem, 'id' | 'slug' | 'name' | 'brand' | 'brandSlug' | 'description' | 'image' | 'price'>
> = {
    'hydrating-serum': {
        type: 'Serum',
        rating: '★ 4.8',
        skinType: 'Dry to Normal',
        usage: 'Daily',
        category: 'Hydration Serum',
        aiRecommended: 'Yes',
    },
    'brightening-cream': {
        type: 'Cream',
        rating: '★ 4.9',
        skinType: 'All Skin Types',
        usage: 'Morning / Night',
        category: 'Brightening Cream',
        aiRecommended: 'Yes',
    },
    'gentle-cleanser': {
        type: 'Cleanser',
        rating: '★ 4.7',
        skinType: 'Sensitive Skin',
        usage: 'Twice Daily',
        category: 'Face Cleanser',
        aiRecommended: 'Yes',
    },
    'vitamin-c-serum': {
        type: 'Serum',
        rating: '★ 4.8',
        skinType: 'Combination Skin',
        usage: 'Morning',
        category: 'Vitamin C Serum',
        aiRecommended: 'Yes',
    },
    'night-moisture': {
        type: 'Moisturizer',
        rating: '★ 4.6',
        skinType: 'Dry Skin',
        usage: 'Night',
        category: 'Night Moisturizer',
        aiRecommended: 'Yes',
    },
    'barrier-repair': {
        type: 'Treatment',
        rating: '★ 4.9',
        skinType: 'Sensitive / Dry',
        usage: 'Daily',
        category: 'Barrier Treatment',
        aiRecommended: 'Yes',
    },
};

function inferProductType(name: string, description: string): ProductItem['type'] {
    const text = `${name} ${description}`.toLowerCase();

    if (text.includes('serum')) return 'Serum';
    if (text.includes('cleanser')) return 'Cleanser';
    if (text.includes('moisturizer') || text.includes('moisture') || text.includes('lotion')) {
        return 'Moisturizer';
    }
    if (text.includes('repair') || text.includes('treatment')) return 'Treatment';
    return 'Cream';
}

function formatPrice(price: number | null) {
    if (price == null) return '$0.00';
    return `$${price.toFixed(2)}`;
}

function buildFallbackMeta(
    slug: string,
    name: string,
    description: string,
): Omit<ProductItem, 'id' | 'slug' | 'name' | 'brand' | 'brandSlug' | 'description' | 'image' | 'price'> {
    return (
        PRODUCT_META[slug] ?? {
            type: inferProductType(name, description),
            rating: '★ 4.7',
            skinType: 'All Skin Types',
            usage: 'Daily',
            category: name,
            aiRecommended: 'Yes',
        }
    );
}

export function mapApiProductToProductItem(product: ApiProduct): ProductItem {
    const description =
        product.description ??
        'A premium skincare product designed to support a healthy-looking, radiant complexion.';

    const meta = buildFallbackMeta(product.slug, product.name, description);

    return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand.name,
        brandSlug: product.brand.slug,
        description,
        image: product.imageUrl ?? '',
        price: formatPrice(product.price),
        ...meta,
    };
}

export async function getProducts(): Promise<ProductItem[]> {
    const data = await apiFetch<{ products: ApiProduct[] }>('/products');
    return data.products.map(mapApiProductToProductItem);
}

export async function getProductBySlug(slug: string): Promise<ProductItem> {
    const data = await apiFetch<{ product: ApiProduct }>(`/products/${slug}`);
    return mapApiProductToProductItem(data.product);
}