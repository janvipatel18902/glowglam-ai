import { BrandCard } from './BrandCard';

const brands = [
    {
        name: 'GlowGlam',
        description: 'Glow Radiance +',
    },
    {
        name: 'Radiance Co',
        description: 'Glow Radiance +',
    },
    {
        name: 'Pure Beauty',
        description: 'View Products +',
    },
    {
        name: 'Youth Labs',
        description: 'View Products +',
    },
    {
        name: 'Sun Shield',
        description: 'View Products +',
    },
    {
        name: 'Derma Care',
        description: 'View Products +',
    },
];

export function BrandGrid() {
    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
                <BrandCard key={brand.name} brand={brand} />
            ))}
        </div>
    );
}