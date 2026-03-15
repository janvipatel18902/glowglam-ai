import { ProductCard } from './ProductCard';

const products = [
    { name: 'Hydrating Serum', brand: 'GlowLab', type: 'Serum' },
    { name: 'Vitamin C Cream', brand: 'SkinPro', type: 'Cream' },
    { name: 'Acne Cleanser', brand: 'PureFace', type: 'Cleanser' },
    { name: 'Night Repair', brand: 'DermaX', type: 'Treatment' },
    { name: 'Moisturizer', brand: 'GlowLab', type: 'Moisturizer' },
    { name: 'SPF 50', brand: 'SunCare', type: 'Sunscreen' },
];

export function ProductGrid() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
                <ProductCard key={p.name} product={p} />
            ))}
        </div>
    );
}