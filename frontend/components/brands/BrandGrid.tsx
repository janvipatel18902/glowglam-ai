import { BrandCard } from './BrandCard';

const brands = [
    {
        name: 'GlowLab',
        description: 'Modern skincare products focused on hydration and glow.',
    },
    {
        name: 'SkinPro',
        description: 'Science-backed skincare for brightening and daily care.',
    },
    {
        name: 'PureFace',
        description: 'Gentle and clean skincare for acne-prone and sensitive skin.',
    },
    {
        name: 'DermaX',
        description: 'Targeted treatment solutions for repair and recovery.',
    },
    {
        name: 'SunCare',
        description: 'Daily sun protection with lightweight skincare formulas.',
    },
    {
        name: 'LumiSkin',
        description: 'Beauty-first skincare designed for radiance and softness.',
    },
];

export function BrandGrid() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {brands.map((brand) => (
                <BrandCard key={brand.name} brand={brand} />
            ))}
        </div>
    );
}