import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Magnet from './Magnet';
import type { HeroData } from '../App';

const navLinks = ['About', 'Price', 'Projects', 'Contact'];

const themeOptions = [
  { name: 'Pink', color: 'rgba(181, 1, 167, 0.08)', value: 'linear-gradient(180deg, #646973 0%, #BBCCD7 100%)' },
  { name: 'Emerald', color: 'rgba(16, 185, 129, 0.08)', value: 'linear-gradient(180deg, #10B981 0%, #A7F3D0 100%)' },
  { name: 'Orange', color: 'rgba(249, 115, 22, 0.08)', value: 'linear-gradient(180deg, #F97316 0%, #FED7AA 100%)' },
  { name: 'Blue', color: 'rgba(59, 130, 246, 0.08)', value: 'linear-gradient(180deg, #3B82F6 0%, #DBEAFE 100%)' }
];

interface HeroSectionProps {
  heroData?: HeroData;
  setAccentColor: (color: string) => void;
}

export default function HeroSection({ heroData, setAccentColor }: HeroSectionProps) {
  const name = heroData?.name || "Abdelrhaman";
  const portraitUrl = heroData?.portrait || "https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png";
  const [selectedTheme, setSelectedTheme] = useState(themeOptions[0]);

  // Motion values for portrait parallax tilt
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const rotateX = useTransform(cardY, [-200, 200], [10, -10]);
  const rotateY = useTransform(cardX, [-200, 200], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    cardX.set(mouseX);
    cardY.set(mouseY);
  };

  const handleMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };



  return (
    <section className="h-screen flex flex-col overflow-hidden relative">


      {/* Hero Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        className="overflow-hidden mt-6 sm:mt-4 md:-mt-5 px-4 z-10"
      >
        <h1
          className="hero-heading font-black uppercase tracking-tight leading-none w-full text-[9vw] sm:text-[10vw] md:text-[11vw] lg:text-[12vw] text-center"
          style={{ background: selectedTheme.value, WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
        >
          Hi, i&apos;m {name}
        </h1>
      </motion.div>



      {/* 3D Parallax Tilt Portrait */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] sm:top-auto sm:translate-y-0 sm:bottom-0"
        style={{ top: '50%', transform: 'translate(-50%, -50%)' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Magnet padding={150} strength={3}>
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <img
              src={portraitUrl}
              alt={`${name} Portrait`}
              className="w-full h-auto cursor-pointer drop-shadow-[0_15px_30px_rgba(255,255,255,0.05)] transition-shadow duration-300 hover:drop-shadow-[0_20px_50px_rgba(255,255,255,0.15)]"
            />
          </motion.div>
        </Magnet>
      </motion.div>
    </section>
  );
}