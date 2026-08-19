/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Location
    'location.flag': '🇳🇬',
    'location.city': 'Lagos',
    'location.country': 'Nigeria',
    'location.full': 'Lagos, Nigeria',
    'location.language': 'English',

    // Navigation
    'nav.home': 'Home',
    'nav.categories': 'Categories',
    'nav.podcast': 'Podcast',
    'nav.entertainment': 'Entertainment',
    'nav.latest': 'Latest',
    'nav.about': 'About',
    'nav.contact': 'Contact Us',

    // Hero
    'hero.badge': 'Premium Graphic Design Marketplace',
    'hero.new': 'NEW',
    'hero.title1': 'Unleash Your',
    'hero.title2': 'Creative Potential',
    'hero.subtitle': 'Discover 15,000+ premium designs, templates, and creative assets. From church flyers to birthday invitations, we do it better than anyone else.',
    'hero.search': 'Search...',

    // Logo Portfolio
    'portfolio.badge': 'Our Work',
    'portfolio.title': 'Brands We\'ve Shaped',
    'portfolio.subtitle': 'Transforming visions into iconic brand identities. Explore our portfolio of logo designs crafted with precision and creativity.',
    'portfolio.cta': 'More',

    // Categories
    'categories.title': 'Popular Template Categories',
    'categories.subtitle': 'Browse our extensive collection of premium designs organized by category.',
    'categories.workers_day': 'Workers Day',
    'categories.womens_day': "Women's Day",
    'categories.wedding_invites': 'Wedding IVs',
    'categories.vector_illustrations': 'Vector Illustrations',
    'categories.valentines_day': "Valentine's Day",
    'categories.teachers_day': "Teacher's Day",
    'categories.posters': 'Posters',
    'categories.png': 'PNG',
    'categories.party_flyers': 'Party Flyers',
    'categories.nigeria': 'Nigeria',
    'categories.muslim': 'Muslim',
    'categories.music_covers': 'Music Covers',
    'categories.happy_new_year': 'Happy New Year',
    'categories.halloween': 'Halloween',
    'categories.fonts': 'Fonts',
    'categories.festivities': 'Festivities',
    'categories.fathers_day': "Father's Day",
    'categories.easter_design': 'Easter Design',
    'categories.church_flyers': 'Church Flyers',
    'categories.christmas': 'Christmas',
    'categories.cameroon': 'Cameroon',
    'categories.birthday_designs': 'Birthday Designs',
    'categories.african_celebrities': 'African Celebrities PNG',
    'categories.3d_pngs': '3D PNGs',

    // Training
    'training.title': 'Training & Workshops',
    'training.subtitle': 'Enhance your skills with our expert-led training programs and workshops.',

    // Podcasts
    'podcasts.title': 'Latest Podcasts',
    'podcasts.subtitle': 'Tune in to our podcast series featuring industry insights and creative discussions.',

    // Entertainment
    'entertainment.title': 'ENTERTAINMENT',
    'entertainment.subtitle': 'Discover music from our talented artists and creators. Stream on your favorite platforms.',
    'entertainment.viewAll': 'View All Releases',

    // Events
    'events.title': 'Events',
    'events.subtitle': 'Join us at our upcoming events, workshops, and exhibitions.',

    // Footer
    'footer.newsletter.title': 'Stay Updated',
    'footer.newsletter.subtitle': 'Subscribe to our newsletter for the latest designs, exclusive offers, and creative tips.',
    'footer.newsletter.placeholder': 'Enter your email',
    'footer.newsletter.subscribe': 'Subscribe',
    'footer.newsletter.subscribed': 'Subscribed!',
    'footer.brand.description': 'Nigeria\'s premier graphic design marketplace. Premium designs for creative professionals.',
    'footer.quickLinks': 'Quick Links',
    'footer.categories': 'Categories',
    'footer.ourOffice': 'Our Office',
    'footer.copyright': '© 2026 Krown Creative Factory. All rights reserved.',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.contact': 'Contact Us',

    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Have a question or want to work together? We\'d love to hear from you.',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.subject': 'Subject',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.sent': 'Message Sent!',
    'contact.direct': 'Get In Touch Directly',
    'contact.ourOffice': 'Our Office',
    'contact.viewMap': 'View on Map',
    'contact.chat.greeting': 'Hi! How can we help you today?',
    'contact.chat.placeholder': 'Type your message...',
    'contact.chat.send': 'Send',

    // About
    'about.title': 'About Us',
    'about.heading': 'We Are',
    'about.intro': 'Founded with a vision to revolutionize the graphic design industry, Krown Creative Factory has grown to become Africa\'s premier destination for culturally suited design assets.',
    'about.description': 'We blend African cultural heritage with modern design aesthetics to create unique, impactful visual experiences that resonate with audiences worldwide.',
    'about.cta': 'Start Your Project',
    'about.badge1': 'Creative',
    'about.badge1Sub': 'Excellence',
    'about.badge2': 'Award',
    'about.badge2Sub': 'Winning',
    'about.team': 'Meet Our',
    'about.teamSub': 'Creative Team',
    'about.teamDesc': 'The talented minds behind Krown Creative Factory',
    'about.founder': 'Founder',
    'about.subtitle': 'Learn more about our journey and mission.',
  },
  fr: {
    // Location
    'location.flag': '🇨🇲',
    'location.city': 'Yaoundé',
    'location.country': 'Cameroun',
    'location.full': 'Yaoundé, Cameroun',
    'location.language': 'Français',

    // Navigation
    'nav.home': 'Accueil',
    'nav.categories': 'Catégories',
    'nav.podcast': 'Podcast',
    'nav.entertainment': 'Divertissement',
    'nav.latest': 'Derniers',
    'nav.about': 'À Propos',
    'nav.contact': 'Contactez-Nous',

    // Hero
    'hero.badge': 'Marketplace Premium de Design Graphique',
    'hero.new': 'NOUVEAU',
    'hero.title1': 'Libérez Votre',
    'hero.title2': 'Potentiel Créatif',
    'hero.subtitle': 'Découvrez plus de 15 000 designs premium, modèles et actifs créatifs. Des flyers d\'église aux invitations d\'anniversaire, nous le faisons mieux que quiconque.',
    'hero.search': 'Rechercher...',

    // Logo Portfolio
    'portfolio.badge': 'Notre Travail',
    'portfolio.title': 'Marques Que Nous Avons Façonnées',
    'portfolio.subtitle': 'Transformer les visions en identités de marque emblématiques. Explorez notre portfolio de conceptions de logos créés avec précision et créativité.',
    'portfolio.cta': 'Plus',

    // Categories
    'categories.title': 'Catégories de Modèles Populaires',
    'categories.subtitle': 'Parcourez notre vaste collection de designs premium organisés par catégorie.',
    'categories.workers_day': 'Journée des Travailleurs',
    'categories.womens_day': "Journée de la Femme",
    'categories.wedding_invites': 'Faire-part de Mariage',
    'categories.vector_illustrations': 'Illustrations Vectorielles',
    'categories.valentines_day': "Saint-Valentin",
    'categories.teachers_day': "Journée des Enseignants",
    'categories.posters': 'Affiches',
    'categories.png': 'PNG',
    'categories.party_flyers': 'Flyers de Fête',
    'categories.nigeria': 'Nigéria',
    'categories.muslim': 'Musulman',
    'categories.music_covers': 'Pochettes Musicales',
    'categories.happy_new_year': 'Bonne Année',
    'categories.halloween': 'Halloween',
    'categories.fonts': 'Polices',
    'categories.festivities': 'Festivités',
    'categories.fathers_day': "Fête des Pères",
    'categories.easter_design': 'Design de Pâques',
    'categories.church_flyers': 'Flyers d\'Église',
    'categories.christmas': 'Noël',
    'categories.cameroon': 'Cameroun',
    'categories.birthday_designs': 'Designs d\'Anniversaire',
    'categories.african_celebrities': 'Célébrités Africaines PNG',
    'categories.3d_pngs': 'PNG 3D',

    // Training
    'training.title': 'Formation et Ateliers',
    'training.subtitle': 'Améliorez vos compétences avec nos programmes de formation et ateliers dirigés par des experts.',

    // Podcasts
    'podcasts.title': 'Derniers Podcasts',
    'podcasts.subtitle': 'Écoutez notre série de podcasts présentant des informations sur l\'industrie et des discussions créatives.',

    // Entertainment
    'entertainment.title': 'DIVERTISSEMENT',
    'entertainment.subtitle': 'Découvrez la musique de nos artistes et créateurs talentueux. Diffusez sur vos plateformes préférées.',
    'entertainment.viewAll': 'Voir Toutes les Sorties',

    // Events
    'events.title': 'Événements',
    'events.subtitle': 'Rejoignez-nous à nos événements, ateliers et expositions à venir.',

    // Footer
    'footer.newsletter.title': 'Restez Informé',
    'footer.newsletter.subtitle': 'Abonnez-vous à notre newsletter pour les derniers designs, offres exclusives et conseils créatifs.',
    'footer.newsletter.placeholder': 'Entrez votre email',
    'footer.newsletter.subscribe': 'S\'abonner',
    'footer.newsletter.subscribed': 'Abonné!',
    'footer.brand.description': 'Le marketplace premium de design graphique du Nigeria. Designs premium pour les professionnels créatifs.',
    'footer.quickLinks': 'Liens Rapides',
    'footer.categories': 'Catégories',
    'footer.ourOffice': 'Notre Bureau',
    'footer.copyright': '© 2026 Krown Creative Factory. Tous droits réservés.',
    'footer.terms': 'Conditions d\'Utilisation',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.contact': 'Contactez-Nous',

    // Contact
    'contact.title': 'Contactez-Nous',
    'contact.subtitle': 'Avez-vous une question ou souhaitez-vous travailler ensemble? Nous aimerions avoir de vos nouvelles.',
    'contact.name': 'Nom Complet',
    'contact.email': 'Adresse Email',
    'contact.phone': 'Numéro de Téléphone',
    'contact.subject': 'Sujet',
    'contact.message': 'Votre Message',
    'contact.send': 'Envoyer le Message',
    'contact.sending': 'Envoi...',
    'contact.sent': 'Message Envoyé!',
    'contact.direct': 'Contactez-Nous Directement',
    'contact.ourOffice': 'Notre Bureau',
    'contact.viewMap': 'Voir sur la Carte',
    'contact.chat.greeting': 'Salut! Comment pouvons-nous vous aider aujourd\'hui?',
    'contact.chat.placeholder': 'Tapez votre message...',
    'contact.chat.send': 'Envoyer',

    // About
    'about.title': 'À Propos de Nous',
    'about.heading': 'Nous Sommes',
    'about.intro': 'Fondé avec une vision de révolutionner l\'industrie du design graphique, Krown Creative Factory est devenu la destination premium d\'Afrique pour les actifs de design culturellement adaptés.',
    'about.description': 'Nous mélangeons le patrimoine culturel africain avec l\'esthétique de design moderne pour créer des expériences visuelles uniques et percutantes qui résonnent avec les publics du monde entier.',
    'about.cta': 'Commencer Votre Projet',
    'about.badge1': 'Excellence',
    'about.badge1Sub': 'Créative',
    'about.badge2': 'Prix',
    'about.badge2Sub': 'Gagnant',
    'about.team': 'Rencontrez Notre',
    'about.teamSub': 'Équipe Créative',
    'about.teamDesc': 'Les esprits talentueux derrière Krown Creative Factory',
    'about.founder': 'Fondateur',
    'about.subtitle': 'En savoir plus sur notre parcours et notre mission.',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
