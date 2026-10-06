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
    'training.enroll': 'Enroll Now',
    'training.enrollAria': 'Enroll in {course}',
    'training.includes': 'Full Course (Material + Training)',
    'training.students': 'students',
    'training.weeks': 'Weeks',
    'training.customPrompt': 'Need custom training for your team?',
    'training.customCta': 'Contact Us',
    'training.course.1.desc': 'Learn to design and build your own custom typefaces from sketch to final digital font files.',
    'training.course.1.f1': 'Letterform Design',
    'training.course.1.f2': 'Vector Construction',
    'training.course.1.f3': 'Font Software',
    'training.course.1.f4': 'Export & Distribution',
    'training.course.2.desc': 'Develop professional logo design skills from concept development to final presentation for clients.',
    'training.course.2.f1': 'Concept Development',
    'training.course.2.f2': 'Sketching Techniques',
    'training.course.2.f3': 'Vector Execution',
    'training.course.2.f4': 'Client Presentation',
    'training.course.3.desc': 'Master the fundamental principles of graphic design including color theory, typography, layout, and composition.',
    'training.course.3.f1': 'Color Theory',
    'training.course.3.f2': 'Typography Basics',
    'training.course.3.f3': 'Layout Design',
    'training.course.3.f4': 'Composition Rules',
    'training.course.4.desc': 'Comprehensive training on creating complete brand identity systems for businesses and organizations.',
    'training.course.4.f1': 'Brand Strategy',
    'training.course.4.f2': 'Visual Systems',
    'training.course.4.f3': 'Brand Guidelines',
    'training.course.4.f4': 'Real Projects',

    // Enrollment
    'enroll.eyebrow': 'Confirm your enrollment',
    'enroll.close': 'Close enrollment',
    'enroll.duration': 'Duration',
    'enroll.price': 'Course fee',
    'enroll.included': "What's included",
    'enroll.inc.live': 'Live interactive training sessions',
    'enroll.inc.mentorship': 'Mentorship & personal feedback',
    'enroll.inc.materials': 'All study materials, templates & assets',
    'enroll.proceed': 'Proceed to Payment',
    'enroll.proceedHint': "You'll complete payment securely with our team.",
    'enroll.or': 'Or enroll directly',
    'enroll.whatsappNg': 'WhatsApp Nigeria',
    'enroll.whatsappCm': 'WhatsApp Cameroon',
    'enroll.email': 'Email us',
    'enroll.message': "Hello Krown Creative Factory! I'd like to enroll in the {course} course ({price}). Please share the payment details.",
    'enroll.emailSubject': 'Enrollment: {course}',

    // Downloads
    'download.cta': 'Download',
    'download.again': 'Download again',
    'download.signin': 'Sign in to download',
    'download.limit': 'Upgrade to keep downloading',
    'download.processing': 'Preparing your file…',
    'download.watermarkNote': 'Watermarked — Upgrade to Pro for clean files',
    'download.cleanBadge': 'Clean Download',
    'download.remaining': '{count} free downloads left',
    'download.redownloadFree': 'Re-downloads never use your quota',
    'download.toastFree': 'Downloaded with watermark. Upgrade to Pro for clean files!',
    'download.toastPro': 'Clean download complete. Enjoy!',
    'download.toastError': "We couldn't prepare your download. Please check your connection and try again.",
    'download.upgradeAction': 'Upgrade',
    'download.tagline': 'Upgrade to Pro for clean downloads',
    'download.reasonLimit': "You've used your 12 free downloads. Upgrade to Pro for unlimited downloads!",
    'download.signedIn': 'Signed in. You can now download designs.',

    // WhatsApp sharing
    'share.button': 'Share on WhatsApp',
    'share.courseButton': 'Share this course on WhatsApp',
    'share.cardAria': 'Share {title} on WhatsApp',
    'share.subtitle': 'Every share carries the Krown Creative Factory brand.',
    'share.contact': 'Share to a contact or group',
    'share.contactHintNative': 'Pick WhatsApp, then your contact or group',
    'share.contactHintWeb': 'Opens WhatsApp with the message and link',
    'share.status': 'Share to WhatsApp Status',
    'share.statusHintNative': 'Pick WhatsApp, then "My status"',
    'share.statusHintWeb': 'Saves the branded image and copies the caption',
    'share.copy': 'Copy Link',
    'share.copyHint': 'For Instagram, Facebook, X and more',
    'share.preparing': 'Preparing branded image…',
    'share.previewAlt': 'Preview of the branded image you will share',
    'share.previewError': 'Image preview unavailable — the message and link will still be shared.',
    'share.noteFree': 'Free shares include the Krown watermark. Pro members share clean images with a small Krown badge.',
    'share.notePro': 'Pro share: clean image with a small Krown badge.',
    'share.quotaNote': 'Sharing never uses your download quota.',
    'share.toastShared': 'Shared! Thanks for spreading the word 🔥',
    'share.toastCopied': 'Link copied!',
    'share.toastStatusWeb': 'Image saved and caption copied. Open WhatsApp → Status to post it.',
    'share.toastError': "Couldn't share right now. Please try again.",
    'share.count': '{count} shares from you',
    'share.countOne': '1 share from you',
    'share.close': 'Close sharing',
    'share.logoLine': 'Logo design · {industry}',

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
    'about.team.title': 'Meet Our Team',
    'about.team.subtitle': 'The creative minds behind Krown Creative Factory',
    'about.founder': 'Founder',
    'about.team.founder': 'Founder & Creative Director',
    'about.team.co_founder': 'Co-Founder & Tech Lead',
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
    'training.enroll': "S'inscrire",
    'training.enrollAria': "S'inscrire à {course}",
    'training.includes': 'Formation complète (Supports + Formation)',
    'training.students': 'étudiants',
    'training.weeks': 'Semaines',
    'training.customPrompt': "Besoin d'une formation sur mesure pour votre équipe ?",
    'training.customCta': 'Contactez-nous',
    'training.course.1.desc': 'Apprenez à concevoir et créer vos propres polices, du croquis aux fichiers de police numériques finaux.',
    'training.course.1.f1': 'Dessin de lettres',
    'training.course.1.f2': 'Construction vectorielle',
    'training.course.1.f3': 'Logiciels de police',
    'training.course.1.f4': 'Export et distribution',
    'training.course.2.desc': 'Développez des compétences professionnelles en création de logos, du concept à la présentation finale au client.',
    'training.course.2.f1': 'Développement de concept',
    'training.course.2.f2': 'Techniques de croquis',
    'training.course.2.f3': 'Exécution vectorielle',
    'training.course.2.f4': 'Présentation client',
    'training.course.3.desc': 'Maîtrisez les principes fondamentaux du design graphique : théorie des couleurs, typographie, mise en page et composition.',
    'training.course.3.f1': 'Théorie des couleurs',
    'training.course.3.f2': 'Bases de la typographie',
    'training.course.3.f3': 'Mise en page',
    'training.course.3.f4': 'Règles de composition',
    'training.course.4.desc': "Formation complète sur la création de systèmes d'identité de marque pour les entreprises et organisations.",
    'training.course.4.f1': 'Stratégie de marque',
    'training.course.4.f2': 'Systèmes visuels',
    'training.course.4.f3': 'Charte graphique',
    'training.course.4.f4': 'Projets réels',

    // Enrollment
    'enroll.eyebrow': 'Confirmez votre inscription',
    'enroll.close': "Fermer l'inscription",
    'enroll.duration': 'Durée',
    'enroll.price': 'Frais de formation',
    'enroll.included': 'Ce qui est inclus',
    'enroll.inc.live': 'Sessions de formation interactives en direct',
    'enroll.inc.mentorship': 'Mentorat et retours personnalisés',
    'enroll.inc.materials': "Tous les supports, modèles et ressources d'étude",
    'enroll.proceed': 'Procéder au paiement',
    'enroll.proceedHint': 'Vous finaliserez le paiement en toute sécurité avec notre équipe.',
    'enroll.or': 'Ou inscrivez-vous directement',
    'enroll.whatsappNg': 'WhatsApp Nigeria',
    'enroll.whatsappCm': 'WhatsApp Cameroun',
    'enroll.email': 'Écrivez-nous',
    'enroll.message': "Bonjour Krown Creative Factory ! Je souhaite m'inscrire à la formation {course} ({price}). Merci de m'envoyer les détails de paiement.",
    'enroll.emailSubject': 'Inscription : {course}',

    // Downloads
    'download.cta': 'Télécharger',
    'download.again': 'Télécharger à nouveau',
    'download.signin': 'Connectez-vous pour télécharger',
    'download.limit': 'Passez à Pro pour continuer',
    'download.processing': 'Préparation de votre fichier…',
    'download.watermarkNote': 'Filigrane — Passez à Pro pour des fichiers sans filigrane',
    'download.cleanBadge': 'Téléchargement sans filigrane',
    'download.remaining': '{count} téléchargements gratuits restants',
    'download.redownloadFree': 'Les re-téléchargements ne consomment pas votre quota',
    'download.toastFree': 'Téléchargé avec filigrane. Passez à Pro pour des fichiers sans filigrane !',
    'download.toastPro': 'Téléchargement sans filigrane terminé. Profitez-en !',
    'download.toastError': 'Impossible de préparer votre téléchargement. Vérifiez votre connexion et réessayez.',
    'download.upgradeAction': 'Passer à Pro',
    'download.tagline': 'Passez à Pro pour des fichiers sans filigrane',
    'download.reasonLimit': 'Vous avez utilisé vos 12 téléchargements gratuits. Passez à Pro pour des téléchargements illimités !',
    'download.signedIn': 'Connecté. Vous pouvez maintenant télécharger des designs.',

    // WhatsApp sharing
    'share.button': 'Partager sur WhatsApp',
    'share.courseButton': 'Partager cette formation sur WhatsApp',
    'share.cardAria': 'Partager {title} sur WhatsApp',
    'share.subtitle': 'Chaque partage porte la marque Krown Creative Factory.',
    'share.contact': 'Partager à un contact ou un groupe',
    'share.contactHintNative': 'Choisissez WhatsApp, puis votre contact ou groupe',
    'share.contactHintWeb': 'Ouvre WhatsApp avec le message et le lien',
    'share.status': 'Partager sur le Statut WhatsApp',
    'share.statusHintNative': 'Choisissez WhatsApp, puis « Mon statut »',
    'share.statusHintWeb': "Enregistre l'image de marque et copie la légende",
    'share.copy': 'Copier le Lien',
    'share.copyHint': 'Pour Instagram, Facebook, X et plus',
    'share.preparing': "Préparation de l'image de marque…",
    'share.previewAlt': "Aperçu de l'image de marque que vous allez partager",
    'share.previewError': "Aperçu de l'image indisponible — le message et le lien seront tout de même partagés.",
    'share.noteFree': 'Les partages gratuits incluent le filigrane Krown. Les membres Pro partagent des images sans filigrane avec un petit badge Krown.',
    'share.notePro': 'Partage Pro : image sans filigrane avec un petit badge Krown.',
    'share.quotaNote': 'Le partage ne consomme jamais votre quota de téléchargements.',
    'share.toastShared': 'Partagé ! Merci de faire passer le mot 🔥',
    'share.toastCopied': 'Lien copié !',
    'share.toastStatusWeb': 'Image enregistrée et légende copiée. Ouvrez WhatsApp → Statut pour la publier.',
    'share.toastError': 'Partage impossible pour le moment. Veuillez réessayer.',
    'share.count': '{count} partages de votre part',
    'share.countOne': '1 partage de votre part',
    'share.close': 'Fermer le partage',
    'share.logoLine': 'Création de logo · {industry}',

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
    'about.team.title': 'Rencontrez Notre Équipe',
    'about.team.subtitle': 'Les esprits créatifs derrière Krown Creative Factory',
    'about.founder': 'Fondateur',
    'about.team.founder': 'Fondateur et Directeur Créatif',
    'about.team.co_founder': 'Co-Fondateur et Tech Lead',
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
