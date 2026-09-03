export interface SocialLinks {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    github?: string;
    pinterest?: string;
    youtube?: string;
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    roleFr: string;
    bio?: string;
    bioFr?: string;
    image: string;
    isFounder?: boolean;
    isDeveloper?: boolean;
    social?: SocialLinks;
}

export const teamMembers: TeamMember[] = [
  // ===== 1. FOUNDER - MAJESTIC DISPLAY =====
  {
    id: 'david-shopekan',
    name: 'David Shopekan',
    role: 'Founder and Creative Director',
    roleFr: 'Fondateur et Directeur Créatif',
    bio: 'Visionary leader and creative force behind Krown Creative Factory. Passionate about African design and cultural heritage.',
    bioFr: 'Leader visionnaire et force créative derrière Krown Creative Factory. Passionné par le design africain et le patrimoine culturel.',
    image: '/assets/our team/DAVID SHOPEKAN.png',
    isFounder: true,
    social: {
      instagram: 'https://www.instagram.com/i_am_dave_shop',
      facebook: 'https://www.facebook.com/david.shopekan',
    },
  },

  // ===== 2. CO-FOUNDER =====
  {
    id: 'joshua-shopekan',
    name: 'Joshua Shopekan',
    role: 'Co-founder and Lead Designer',
    roleFr: 'Co-fondateur et Designer Principal',
    bio: 'Creative visionary and design leader shaping the visual identity of Krown Creative Factory.',
    bioFr: 'Visionnaire créatif et leader en design façonnant l\'identité visuelle de Krown Creative Factory.',
    image: '/assets/our team/joshua-shopekan.jpg',
    social: {
      pinterest: 'https://pin.it/2Obn1ru88',
      youtube: 'https://www.youtube.com/@themachineryInc',
      instagram: 'https://www.instagram.com/joshshop._',
    },
  },

  // ===== 3. TECH ARCHITECT & WEB DESIGNER =====
  {
    id: 'sikati-deker-fotso',
    name: 'Sikati Deker Fotso',
    role: 'Tech Architect and Web Designer',
    roleFr: 'Architecte Technique et Designer Web',
    bio: 'Technical visionary and web architect building the digital infrastructure of Krown Creative Factory.',
    bioFr: 'Visionnaire technique et architecte web construisant l\'infrastructure numérique de Krown Creative Factory.',
    image: '/assets/our team/SIKATI FOTSO DEKER.jpg',
    isDeveloper: true,
    social: {
      linkedin: 'https://linkedin.com/in/...',
      github: 'https://github.com/...',
      facebook: 'https://facebook.com/...',
      email: 'sikatifotso5@gmail.com',
    },
  },

  // ===== 4. EXECUTIVE ASSISTANT & DESIGNER =====
  {
    id: 'samuel-odugbesan',
    name: 'Samuel Odugbesan',
    role: 'Executive Assistant and Designer',
    roleFr: 'Assistant Exécutif et Designer',
    bio: 'Versatile designer and operations support ensuring smooth execution of creative projects.',
    bioFr: 'Designer polyvalent et soutien opérationnel assurant l\'exécution fluide des projets créatifs.',
    image: '/assets/team/samuel-odugbesan.jpg',
    social: {
      instagram: 'https://www.instagram.com/shegzy_graphics23',
      facebook: 'https://www.facebook.com/profile.php?id=100095238713179',
    },
  },

  // ===== 5. OPERATIONS HEAD =====
  {
    id: 'anyi-dalysia-fotoh',
    name: 'Anyi Dalysia Fotoh',
    role: 'Operations Head',
    roleFr: 'Responsable des Opérations',
    bio: 'Operations strategist ensuring Krown Creative Factory runs seamlessly and efficiently.',
    bioFr: 'Stratège opérationnelle veillant à ce que Krown Creative Factory fonctionne de manière fluide et efficace.',
    image: '/assets/our team/anyi-dalysia-fotoh.jpg',
    social: {
        instagram: 'https://www.instagram.com/anyidalysia',
        facebook: 'https://www.facebook.com/share/1HLhWg99mh/',
    },
  },
];
