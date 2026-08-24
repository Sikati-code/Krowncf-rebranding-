export interface BrandLogo {
  id: number;
  name: string;
  category: string;
  image: string;
  gradient: string;
  price?: string;
  downloads?: number;
  badge?: 'Premium' | 'Best Seller';
}

export const brandLogos: BrandLogo[] = [
  { id: 1, name: 'Aesthetic Mentality', category: 'Mentality', image: '/assets/brands/Aesthetic Mentality Logo 5.png', gradient: 'from-purple-500/20 to-indigo-500/20', price: '₦10,000', downloads: 50, badge: 'Best Seller' },
  { id: 2, name: 'Aiidra Properties', category: 'Real Estate', image: '/assets/brands/Aiidra Properties Logo 2.png', gradient: 'from-blue-500/20 to-cyan-500/20', price: '₦15,000', downloads: 38, badge: 'Premium' },
  { id: 3, name: 'Beta Steez', category: 'Fashion', image: '/assets/brands/Beta Steez Logo 7.png', gradient: 'from-green-500/20 to-emerald-500/20', price: '₦12,000', downloads: 42 },
  { id: 4, name: 'Colgar', category: 'Corporate', image: '/assets/brands/COLGAR Logo new 1.png', gradient: 'from-pink-500/20 to-rose-500/20', price: '₦15,000', downloads: 30, badge: 'Premium' },
  { id: 5, name: 'Colgar Alternate', category: 'Corporate', image: '/assets/brands/COLGAR logo.png', gradient: 'from-rose-500/20 to-red-500/20', price: '₦12,000', downloads: 24 },
  { id: 6, name: 'Eze', category: 'Brand', image: '/assets/brands/Eze Logo 1 new.png', gradient: 'from-amber-500/20 to-yellow-500/20', price: '₦10,000', downloads: 35 },
  { id: 7, name: 'Eze Alternate', category: 'Brand', image: '/assets/brands/Eze Logo 2 new.png', gradient: 'from-yellow-500/20 to-orange-500/20', price: '₦10,000', downloads: 21 },
  { id: 8, name: 'FDD', category: 'Brand', image: '/assets/brands/FDD Logo.png', gradient: 'from-red-500/20 to-orange-500/20', price: '₦11,000', downloads: 29 },
  { id: 9, name: 'FruiTime', category: 'Beverages', image: '/assets/brands/FruiTime Logo 2.png', gradient: 'from-teal-500/20 to-green-500/20', price: '₦12,000', downloads: 47, badge: 'Best Seller' },
  { id: 10, name: 'Girlfriends HC', category: 'Community', image: '/assets/brands/Girlfriends HC Logo 3.png', gradient: 'from-orange-500/20 to-red-500/20', price: '₦10,000', downloads: 33 },
  { id: 11, name: 'Glymz Beauty', category: 'Beauty', image: '/assets/brands/Glymz Beauty Store Logo 2.png', gradient: 'from-violet-500/20 to-purple-500/20', price: '₦12,000', downloads: 45, badge: 'Best Seller' },
  { id: 12, name: 'HalloWil', category: 'Brand', image: '/assets/brands/HalloWil Logo.png', gradient: 'from-yellow-500/20 to-orange-500/20', price: '₦10,000', downloads: 26 },
  { id: 13, name: 'Imperial Autoclinic', category: 'Automotive', image: '/assets/brands/Imperial Autoclinic Logo.png', gradient: 'from-cyan-500/20 to-blue-500/20', price: '₦15,000', downloads: 41, badge: 'Premium' },
  { id: 14, name: 'JayDesigns', category: 'Design', image: '/assets/brands/JayDesigns Logo 3.png', gradient: 'from-blue-500/20 to-violet-500/20', price: '₦10,000', downloads: 19 },
  { id: 15, name: 'JIMWACIT', category: 'Corporate', image: '/assets/brands/JIMWACIT Logo 2.png', gradient: 'from-slate-500/20 to-blue-500/20', price: '₦14,000', downloads: 22 },
  { id: 16, name: 'Kingsmen LA', category: 'Fashion', image: '/assets/brands/Kingsmen LA Logo 2 new.png', gradient: 'from-indigo-500/20 to-purple-500/20', price: '₦13,000', downloads: 31 },
  { id: 17, name: 'Kingsmen LA Alternate', category: 'Fashion', image: '/assets/brands/Kingsmen LA Logo 2.png', gradient: 'from-purple-500/20 to-pink-500/20', price: '₦11,000', downloads: 18 },
  { id: 18, name: "Lahra's Box Black", category: 'Food', image: "/assets/brands/Lahra's Box Logo 3B.png", gradient: 'from-orange-500/20 to-amber-500/20', price: '₦10,000', downloads: 28 },
  { id: 19, name: "Lahra's Box White", category: 'Food', image: "/assets/brands/Lahra's Box Logo 3W.png", gradient: 'from-amber-500/20 to-red-500/20', price: '₦10,000', downloads: 17 },
  { id: 20, name: 'Mirror Pixels', category: 'Creative', image: '/assets/brands/Mirror Pixels Logo 2.png', gradient: 'from-cyan-500/20 to-teal-500/20', price: '₦12,000', downloads: 27 },
  { id: 21, name: 'Nigeria Coppa Cup', category: 'Sports', image: '/assets/brands/Nigeria Coppa Cup Select Logo 2A.png', gradient: 'from-green-500/20 to-lime-500/20', price: '₦14,000', downloads: 36, badge: 'Premium' },
  { id: 22, name: 'OT Africa', category: 'Media', image: '/assets/brands/OT Africa.png', gradient: 'from-red-500/20 to-yellow-500/20', price: '₦11,000', downloads: 23 },
  { id: 23, name: 'OT School Edition', category: 'Education', image: '/assets/brands/OT School Edition.png', gradient: 'from-blue-500/20 to-green-500/20', price: '₦10,000', downloads: 16 },
  { id: 24, name: 'Purge Ent', category: 'Entertainment', image: '/assets/brands/Purge Ent 4.png', gradient: 'from-fuchsia-500/20 to-red-500/20', price: '₦12,000', downloads: 32 },
  { id: 25, name: 'SavEdu Partners', category: 'Education', image: '/assets/brands/SavEdu Partners Logo 2.png', gradient: 'from-emerald-500/20 to-cyan-500/20', price: '₦13,000', downloads: 25 },
  { id: 26, name: 'SHILOH FM', category: 'Media', image: '/assets/brands/SHILOH FM Logo 4.png', gradient: 'from-orange-500/20 to-pink-500/20', price: '₦12,000', downloads: 34 },
  { id: 27, name: 'Table Track', category: 'Business', image: '/assets/brands/Table Track Main Logo.png', gradient: 'from-sky-500/20 to-indigo-500/20', price: '₦14,000', downloads: 20 },
  { id: 28, name: 'Teddy Nails', category: 'Beauty', image: '/assets/brands/Teddy Nails Logo 3.png', gradient: 'from-pink-500/20 to-orange-500/20', price: '₦11,000', downloads: 39, badge: 'Best Seller' },
  { id: 29, name: 'WAF Sarl', category: 'Corporate', image: '/assets/brands/WAF Sarl Logo 2.png', gradient: 'from-slate-500/20 to-cyan-500/20', price: '₦13,000', downloads: 15 },
  { id: 30, name: 'WallyBabs Automobile Black', category: 'Automotive', image: '/assets/brands/WallyBabs Automobile Logo 2b.png', gradient: 'from-zinc-500/20 to-red-500/20', price: '₦15,000', downloads: 29, badge: 'Premium' },
  { id: 31, name: 'WallyBabs Automobile White', category: 'Automotive', image: '/assets/brands/WallyBabs Automobile Logo 2w.png', gradient: 'from-red-500/20 to-zinc-500/20', price: '₦15,000', downloads: 14 },
  { id: 32, name: 'Woubri', category: 'Brand', image: '/assets/brands/Woubri Logo 2.png', gradient: 'from-violet-500/20 to-blue-500/20', price: '₦10,000', downloads: 18 },
];
