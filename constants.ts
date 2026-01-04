
import { User, BuilderProfile, Project } from './types';

export const COLORS = {
  primary: '#D4AF37', // Gold
  secondary: '#1A1A1A', // Charcoal
  accent: '#71717A', // Gray
  light: '#F4F4F5',
  success: '#10B981',
  error: '#EF4444'
};

export const MOCK_USERS: User[] = [
  {
    id: 'c1',
    role: 'CLIENT',
    name: 'Olumide Johnson',
    email: 'olumide@example.com',
    phone: '+44 7700 900000',
    country: 'United Kingdom',
    city: 'London',
    verified: true,
    verificationStatus: 'APPROVED',
    createdAt: '2023-10-01'
  },
  {
    id: 'b1',
    role: 'BUILDER',
    name: 'Tunde Adebayo',
    email: 'tunde@build.ng',
    phone: '+234 802 345 6789',
    country: 'Nigeria',
    city: 'Lagos',
    verified: true,
    verificationStatus: 'APPROVED',
    createdAt: '2023-09-15'
  },
  {
    id: 'admin1',
    role: 'ADMIN',
    name: '47Builders Support',
    email: 'admin@47builders.com',
    phone: '+234 1 000 0000',
    country: 'Nigeria',
    city: 'Lagos',
    verified: true,
    verificationStatus: 'APPROVED',
    createdAt: '2023-01-01'
  }
];

export const MOCK_BUILDER_PROFILES: BuilderProfile[] = [
  {
    userId: 'b1',
    trades: ['General Builder', 'Architect'],
    bio: 'Expert in modern residential structures with 15 years experience in Lagos and Ogun states.',
    serviceCities: ['Lagos', 'Ibadan', 'Abeokuta'],
    portfolioMedia: ['https://picsum.photos/seed/build1/800/600', 'https://picsum.photos/seed/build2/800/600'],
    ratingAvg: 4.8,
    ratingCount: 24,
    pricingNote: 'Quotes depend on project scope. Milestone-based only.',
    responseTime: '< 2 hours'
  }
];

export const NIGERIAN_CITIES = ['Lagos', 'Benin City', 'Port Harcourt', 'Abuja', 'Enugu', 'Ibadan', 'Warri'];
export const TRADES = ['Builder', 'Architect', 'Engineer', 'Plumber', 'Electrician', 'Carpenter', 'Tiler', 'Painter'];
