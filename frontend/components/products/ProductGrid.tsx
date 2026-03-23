import { ProductCard } from './ProductCard';

const products = [
    {
        name: 'Hydrating Serum',
        brand: 'GlowLab',
        type: 'Serum',
        price: '$45.00',
        rating: '★ 4.8',
        image: '/images/products/product-1.jpg',
    },
    {
        name: 'Brightening Cream',
        brand: 'Radiance Co',
        type: 'Cream',
        price: '$52.00',
        rating: '★ 4.9',
        image: '/images/products/product-2.jpg',
    },
    {
        name: 'Gentle Cleanser',
        brand: 'Pure Beauty',
        type: 'Cleanser',
        price: '$28.00',
        rating: '★ 4.7',
        image: '/images/products/product-3.jpg',
    },
    {
        name: 'Vitamin C Serum',
        brand: 'Youth Labs',
        type: 'Serum',
        price: '$48.00',
        rating: '★ 4.8',
        image: '/images/products/product-4.jpg',
    },
    {
        name: 'Night Moisture',
        brand: 'Sun Shield',
        type: 'Moisturizer',
        price: '$39.00',
        rating: '★ 4.6',
        image: '/images/products/product-5.jpg',
    },
    {
        name: 'Barrier Repair',
        brand: 'Derma Care',
        type: 'Treatment',
        price: '$56.00',
        rating: '★ 4.9',
        image: '/images/products/product-6.jpg',
    },
];

export function ProductGrid() {
    return (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
                <ProductCard key={`${product.name}-${product.brand}`} product={product} />
            ))}
        </div>
    );
}