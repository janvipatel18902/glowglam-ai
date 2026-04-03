export type ProductItem = {
    id: string;
    name: string;
    brand: string;
    type: string;
    description: string;
    image: string;
    price: string;
    rating: string;
    skinType: string;
    usage: string;
    category: string;
    aiRecommended: string;
};

export const products: ProductItem[] = [
    {
        id: 'hydrating-serum',
        name: 'Hydrating Serum',
        brand: 'GlowLab',
        type: 'Serum',
        description:
            'A lightweight hydrating serum designed to improve skin glow, softness, and moisture balance for everyday skincare routines.',
        image:
            'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80',
        price: '$45.00',
        rating: '★ 4.8',
        skinType: 'Dry to Normal',
        usage: 'Daily',
        category: 'Hydration Serum',
        aiRecommended: 'Yes',
    },
    {
        id: 'brightening-cream',
        name: 'Brightening Cream',
        brand: 'Radiance Co',
        type: 'Cream',
        description:
            'A brightening cream enriched with glow-supporting ingredients to improve dullness and uneven-looking skin tone.',
        image:
            'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80',
        price: '$52.00',
        rating: '★ 4.9',
        skinType: 'All Skin Types',
        usage: 'Morning / Night',
        category: 'Brightening Cream',
        aiRecommended: 'Yes',
    },
    {
        id: 'gentle-cleanser',
        name: 'Gentle Cleanser',
        brand: 'Pure Beauty',
        type: 'Cleanser',
        description:
            'A mild daily cleanser that removes impurities while helping maintain the skin barrier and moisture balance.',
        image:
            'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80',
        price: '$28.00',
        rating: '★ 4.7',
        skinType: 'Sensitive Skin',
        usage: 'Twice Daily',
        category: 'Face Cleanser',
        aiRecommended: 'Yes',
    },
    {
        id: 'vitamin-c-serum',
        name: 'Vitamin C Serum',
        brand: 'Youth Labs',
        type: 'Serum',
        description:
            'A daily antioxidant serum formulated to support brightness, clarity, and a healthy-looking radiant complexion.',
        image:
            'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=80',
        price: '$48.00',
        rating: '★ 4.8',
        skinType: 'Combination Skin',
        usage: 'Morning',
        category: 'Vitamin C Serum',
        aiRecommended: 'Yes',
    },
    {
        id: 'night-moisture',
        name: 'Night Moisture',
        brand: 'Sun Shield',
        type: 'Moisturizer',
        description:
            'An overnight moisturizer that helps replenish hydration and supports smoother, softer skin by morning.',
        image:
            'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&w=1200&q=80',
        price: '$39.00',
        rating: '★ 4.6',
        skinType: 'Dry Skin',
        usage: 'Night',
        category: 'Night Moisturizer',
        aiRecommended: 'Yes',
    },
    {
        id: 'barrier-repair',
        name: 'Barrier Repair',
        brand: 'Derma Care',
        type: 'Treatment',
        description:
            'A barrier-support treatment made for stressed or sensitive skin to help reduce dryness and restore comfort.',
        image:
            'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80',
        price: '$56.00',
        rating: '★ 4.9',
        skinType: 'Sensitive / Dry',
        usage: 'Daily',
        category: 'Barrier Treatment',
        aiRecommended: 'Yes',
    },
];