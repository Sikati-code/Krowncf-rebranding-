// Training courses (shown in the Training section and found by site search).
import { Type, Crown, Palette, Fingerprint } from 'lucide-react';

export const courses = [
  {
    id: 1,
    title: 'Font Creation',
    icon: Type,
    weeks: 6,
    students: '856',
    rating: 4.9,
    gradient: 'from-blue-500/20 to-purple-500/20',
    iconColor: 'text-blue-400',
  },
  {
    id: 2,
    title: 'Professional Logo Creation',
    icon: Crown,
    weeks: 8,
    students: '2,100',
    rating: 4.9,
    gradient: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-400',
  },
  {
    id: 3,
    title: 'Basics of Graphics Design',
    icon: Palette,
    weeks: 4,
    students: '1,240',
    rating: 4.8,
    gradient: 'from-red-500/20 to-red-600/20',
    iconColor: 'text-red-400',
  },
  {
    id: 4,
    title: 'Brand Identity',
    icon: Fingerprint,
    weeks: 12,
    students: '1,580',
    rating: 5.0,
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  },
];

export type Course = (typeof courses)[number];
