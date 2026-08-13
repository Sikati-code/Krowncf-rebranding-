import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  GraduationCap,
  Palette,
  Type,
  Crown,
  Fingerprint,
  Clock,
  Users,
  Star,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import EnrollmentModal from '../components/EnrollmentModal';

const courses = [
  {
    id: 1,
    title: 'Font Creation',
    description: 'Learn to design and build your own custom typefaces from sketch to final digital font files.',
    price: '₦150,000',
    includes: 'Full Course (Material + Training)',
    icon: Type,
    duration: '6 Weeks',
    students: '856',
    rating: 4.9,
    features: ['Letterform Design', 'Vector Construction', 'Font Software', 'Export & Distribution'],
    gradient: 'from-blue-500/20 to-purple-500/20',
    iconColor: 'text-blue-400',
  },
  {
    id: 2,
    title: 'Professional Logo Creation',
    description: 'Develop professional logo design skills from concept development to final presentation for clients.',
    price: '₦150,000',
    includes: 'Full Course (Material + Training)',
    icon: Crown,
    duration: '8 Weeks',
    students: '2,100',
    rating: 4.9,
    features: ['Concept Development', 'Sketching Techniques', 'Vector Execution', 'Client Presentation'],
    gradient: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-400',
  },
  {
    id: 3,
    title: 'Basics of Graphics Design',
    description: 'Master the fundamental principles of graphic design including color theory, typography, layout, and composition.',
    price: '₦100,000',
    includes: 'Full Course (Material + Training)',
    icon: Palette,
    duration: '4 Weeks',
    students: '1,240',
    rating: 4.8,
    features: ['Color Theory', 'Typography Basics', 'Layout Design', 'Composition Rules'],
    gradient: 'from-red-500/20 to-red-600/20',
    iconColor: 'text-red-400',
  },
  {
    id: 4,
    title: 'Brand Identity',
    description: 'Comprehensive training on creating complete brand identity systems for businesses and organizations.',
    price: '₦100,000',
    includes: 'Full Course (Material + Training)',
    icon: Fingerprint,
    duration: '12 Weeks',
    students: '1,580',
    rating: 5.0,
    features: ['Brand Strategy', 'Visual Systems', 'Brand Guidelines', 'Real Projects'],
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  },
];

function CourseCard({ course, index, onEnroll }: { course: typeof courses[0]; index: number; onEnroll: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className={`relative overflow-hidden rounded-2xl glass-card transition-all duration-500 ${isHovered ? 'border-krown-red/30 shadow-glow' : ''
        }`}>
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Content */}
        <div className="relative p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center`}>
              <course.icon className={`w-6 h-6 ${course.iconColor}`} />
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-lg">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-medium text-white/80">{course.rating}</span>
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-krown-orange transition-colors duration-300">
            {course.title}
          </h3>
          <p className="text-sm text-white/50 mb-4 line-clamp-2">
            {course.description}
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            {course.features.map((feature) => (
              <div key={feature} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-krown-orange/70 flex-shrink-0" />
                <span className="text-xs text-white/60">{feature}</span>
              </div>
            ))}
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-5 text-xs text-white/40">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>{course.students} students</span>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex flex-col gap-0.5">
              <span className="text-xl sm:text-2xl font-bold text-krown-orange mt-1">
                {course.price}
              </span>
              <span className="text-[11px] font-medium text-white/50 bg-white/5 px-2 py-0.5 rounded-full inline-block">
                {course.includes}
              </span>
            </div>
            <button
              onClick={onEnroll}
              className="flex items-center gap-1.5 px-4 py-2 bg-krown-orange text-white text-sm font-medium rounded-full hover:bg-krown-orange-dark transition-all duration-300 hover:shadow-glow group/btn"
            >
              Enroll Now
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Training() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnrollClick = (course: typeof courses[0]) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  return (
    <section id="training" className="relative py-20 sm:py-28 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-krown-black via-krown-dark/50 to-krown-black" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto" ref={ref}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 sm:mb-6 glass rounded-full">
              <GraduationCap className="w-4 h-4 text-krown-orange" />
              <span className="text-sm text-white/70">{t('training.title')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t('training.title')}
            </h2>
            <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto px-4">
              {t('training.subtitle')}
            </p>
          </motion.div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} onEnroll={() => handleEnrollClick(course)} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-10 sm:mt-12"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-krown-orange transition-colors duration-300"
            >
              Need custom training for your team?
              <span className="text-krown-orange hover:underline">Contact Us</span>
            </a>
          </motion.div>
        </div>
      </div>

      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={selectedCourse}
      />
    </section>
  );
}
