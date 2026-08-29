export interface Logo {
  id: number;
  name: string;
  industry: string;
  image: string;
  gradient: string;
}

export const logos: Logo[] = [
  { id: 1, name: 'Food Drink Dance Festival', industry: 'Community Event', image: '/assets/brands/FDD Logo.png', gradient: 'from-purple-500/20 to-indigo-500/20' },
  { id: 2, name: 'HalloWill', industry: 'Entertainment Event', image: '/assets/brands/HalloWil Logo.png', gradient: 'from-blue-500/20 to-cyan-500/20' },
  { id: 3, name: 'Nigeria Coppa Cup Select', industry: 'Sport Event', image: '/assets/brands/Nigeria Coppa Cup Select Logo 2A.png', gradient: 'from-green-500/20 to-emerald-500/20' },
  { id: 4, name: 'Kingsmen Legal Advisory', industry: 'Legal Brand', image: '/assets/brands/Kingsmen LA Logo 2 new.png', gradient: 'from-pink-500/20 to-rose-500/20' },
  { id: 5, name: 'Fruitime', industry: 'Juice Brand', image: '/assets/brands/FruiTime Logo 2.png', gradient: 'from-teal-500/20 to-green-500/20' },
  { id: 6, name: 'SaveEdu', industry: 'Educational Brand', image: '/assets/brands/SavEdu Partners Logo 2.png', gradient: 'from-orange-500/20 to-red-500/20' },
  { id: 7, name: 'Eze', industry: 'Clothing Brand', image: '/assets/brands/Eze Logo 1 new.png', gradient: 'from-amber-500/20 to-yellow-500/20' },
  { id: 8, name: 'Bstz Fashion House', industry: 'Fashion House Brand', image: '/assets/brands/Beta Steez Logo 7.png', gradient: 'from-yellow-500/20 to-orange-500/20' },
  { id: 9, name: 'Jays Design', industry: 'Fashion House Brand', image: '/assets/brands/JayDesigns Logo 3.png', gradient: 'from-red-500/20 to-orange-500/20' },
  { id: 10, name: "Laura's Box", industry: 'Gift Brand', image: "/assets/brands/Lahra's Box Logo 3B.png", gradient: 'from-cyan-500/20 to-blue-500/20' },
  { id: 11, name: 'COLGAR', industry: 'Charity Organisation', image: '/assets/brands/COLGAR Logo new 1.png', gradient: 'from-blue-500/20 to-violet-500/20' },
  { id: 12, name: 'One Talent Africa', industry: 'Community Brand', image: '/assets/brands/OT Africa.png', gradient: 'from-slate-500/20 to-blue-500/20' },
  { id: 13, name: 'Shiloh FM', industry: 'Media Brand', image: '/assets/brands/SHILOH FM Logo 4.png', gradient: 'from-indigo-500/20 to-purple-500/20' },
  { id: 14, name: 'WAF Sarl', industry: 'Agricultural Brand', image: '/assets/brands/WAF Sarl Logo 2.png', gradient: 'from-purple-500/20 to-pink-500/20' },
  { id: 15, name: 'Woubri', industry: 'Mobile App Tech Brand', image: '/assets/brands/Woubri Logo 2.png', gradient: 'from-orange-500/20 to-amber-500/20' },
  { id: 16, name: 'Table Track', industry: 'Mobile App Tech Brand', image: '/assets/brands/Table Track Main Logo.png', gradient: 'from-rose-500/20 to-red-500/20' },
  { id: 17, name: 'Aesthetic Mentality', industry: 'Clothing Brand', image: '/assets/brands/Aesthetic Mentality Logo 5.png', gradient: 'from-violet-500/20 to-purple-500/20' },
  { id: 18, name: 'Aiidra Properties', industry: 'Real Estate Brand', image: '/assets/brands/Aiidra Properties Logo 2.png', gradient: 'from-cyan-500/20 to-teal-500/20' },
  { id: 19, name: 'Mirror Pixels', industry: 'Media Brand', image: '/assets/brands/Mirror Pixels Logo 2.png', gradient: 'from-emerald-500/20 to-green-500/20' },
  { id: 20, name: 'JIMWACIT Foundation', industry: 'Charity Organisation', image: '/assets/brands/JIMWACIT Logo 2.png', gradient: 'from-lime-500/20 to-green-500/20' },
  { id: 21, name: 'Girlfriends', industry: 'Beauty Brand', image: '/assets/brands/Girlfriends HC Logo 3.png', gradient: 'from-fuchsia-500/20 to-pink-500/20' },
  { id: 22, name: 'Teddy Nails', industry: 'Beauty Brand', image: '/assets/brands/Teddy Nails Logo 3.png', gradient: 'from-pink-500/20 to-rose-500/20' },
  { id: 23, name: 'WallyBabs', industry: 'Automobile Brand', image: '/assets/brands/WallyBabs Automobile Logo 2w.png', gradient: 'from-sky-500/20 to-blue-500/20' },
  { id: 24, name: 'Purge', industry: 'Entertainment Brand', image: '/assets/brands/Purge Ent 4.png', gradient: 'from-indigo-500/20 to-blue-500/20' },
  { id: 25, name: 'Glymz', industry: 'Beauty Brand', image: '/assets/brands/Glymz Beauty Store Logo 2.png', gradient: 'from-violet-500/20 to-fuchsia-500/20' },
  { id: 26, name: 'Imperial Auto Clinic', industry: 'Automobile Brand', image: '/assets/brands/Imperial Autoclinic Logo.png', gradient: 'from-teal-500/20 to-cyan-500/20' },
];

// Split logos into two sets for the slider
export const rowOneLogos = logos.slice(0, 13);
export const rowTwoLogos = logos.slice(13, 26);
