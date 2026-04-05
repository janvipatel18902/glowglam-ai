import { apiFetch } from './api';
import { mapApiProductToProductItem, type ApiProduct, type ProductItem } from './products-api';

export type BrandItem = {
    id: string;
    name: string;
    slug: string;
    description: string;
    logoUrl: string | null;
    productsCount: number;
};

export type BrandDetails = BrandItem & {
    products: ProductItem[];
};

type ApiBrand = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    logoUrl: string | null;
    productsCount: number;
};

type ApiBrandDetails = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    logoUrl: string | null;
    productsCount: number;
    products: ApiProduct[];
};

function mapApiBrandToBrandItem(brand: ApiBrand): BrandItem {
    return {
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        description:
            brand.description ??
            'Premium skincare brand with products designed for healthy-looking skin.',
        logoUrl: brand.logoUrl,
        productsCount: brand.productsCount,
    };
}

export async function getBrands(): Promise<BrandItem[]> {
    const data = await apiFetch<{ brands: ApiBrand[] }>('/brands');
    return data.brands.map(mapApiBrandToBrandItem);
}

export async function getBrandBySlug(slug: string): Promise<BrandDetails> {
    const data = await apiFetch<{ brand: ApiBrandDetails }>(`/brands/${slug}`);

    return {
        ...mapApiBrandToBrandItem(data.brand),
        products: data.brand.products.map(mapApiProductToProductItem),
    };
}