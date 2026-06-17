import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';

export interface HeroData {
  name: string;
  role_description: string;
  portrait: string | null;
}

export interface AboutData {
  main_text: string;
  moon_icon: string | null;
  lego_icon: string | null;
  object_icon_1: string | null;
  object_icon_2: string | null;
}

export interface ServiceData {
  number: string;
  name: string;
  description: string;
}

export interface SkillData {
  name: string;
  level: number;
}

export interface ProjectData {
  number: string;
  category: string;
  name: string;
  live_link: string | null;
  video_url: string | null;
  video_file: string | null;
  images: string[];
}

export interface SocialData {
  platform: string;
  url: string;
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  services: ServiceData[];
  skills: SkillData[];
  marquee: string[];
  socials: SocialData[];
  projects: ProjectData[];
}

function App() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [accentColor, setAccentColor] = useState('rgba(181, 1, 167, 0.08)'); // Default Cyberpunk Pink

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/portfolio/')
      .then((res) => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then((data: PortfolioData) => {
        setData(data);
      })
      .catch((err) => {
        console.error('Error fetching dynamic portfolio data:', err);
      });
  }, []);

  // Cursor tracking for Glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="font-kanit relative bg-[#0C0C0C]">
      {/* Custom Theme Mouse Cursor Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(500px at ${mousePos.x}px ${mousePos.y}px, ${accentColor}, transparent 80%)`,
        }}
      />
      <HeroSection heroData={data?.hero} setAccentColor={setAccentColor} />
      <MarqueeSection marqueeData={data?.marquee} />
      <AboutSection aboutData={data?.about} />
      <SkillsSection skillsData={data?.skills} />
      <ServicesSection servicesData={data?.services} />
      <ProjectsSection projectsData={data?.projects} />
      <Footer socialsData={data?.socials} userName={data?.hero?.name} />
    </div>
  );
}

export default App;