import { Room, DiningVenue } from './types';

export const ROOMS: Room[] = [
  {
    id: 'ocean-suite',
    name: 'Ocean View Suite',
    description: 'Wake up to the sound of waves in our spacious Ocean View Suite, featuring a private balcony and premium amenities.',
    price: 850,
    image: 'https://picsum.photos/800/600?random=1',
    features: ['Ocean View', 'King Size Bed', 'Private Balcony', 'Rain Shower'],
    maxGuests: 2,
  },
  {
    id: 'garden-villa',
    name: 'Private Garden Villa',
    description: 'A secluded sanctuary surrounded by lush tropical gardens, complete with a private plunge pool and outdoor shower.',
    price: 1200,
    image: 'https://picsum.photos/800/600?random=2',
    features: ['Private Pool', 'Tropical Garden', 'Outdoor Shower', 'Butler Service'],
    maxGuests: 4,
  },
  {
    id: 'overwater-bungalow',
    name: 'Overwater Bungalow',
    description: 'The ultimate luxury experience. Perched above the turquoise lagoon with direct water access and glass floor panels.',
    price: 2500,
    image: 'https://picsum.photos/800/600?random=3',
    features: ['Direct Lagoon Access', 'Glass Floors', 'Sunset Views', 'Jacuzzi'],
    maxGuests: 2,
  },
];

export const DINING: DiningVenue[] = [
  {
    id: 'azure',
    name: 'Azure',
    type: 'Fine Dining',
    description: 'Modern seafood cuisine with a Mediterranean twist, served in an elegant oceanfront setting.',
    cuisine: 'Seafood',
    image: 'https://picsum.photos/800/600?random=4',
  },
  {
    id: 'spice-route',
    name: 'The Spice Route',
    type: 'Casual Dining',
    description: 'A journey through Asian flavors, featuring live cooking stations and an vibrant atmosphere.',
    cuisine: 'Asian Fusion',
    image: 'https://picsum.photos/800/600?random=5',
  },
  {
    id: 'sunset-lounge',
    name: 'Sunset Lounge',
    type: 'Bar & Lounge',
    description: 'Handcrafted cocktails and light bites accompanied by breathtaking sunset views.',
    cuisine: 'Cocktails & Tapas',
    image: 'https://picsum.photos/800/600?random=6',
  },
];
