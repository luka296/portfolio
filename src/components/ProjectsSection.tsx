import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { ProjectData } from '../App';
import LiveProjectButton from './LiveProjectButton';

const defaultProjects = [
  {
    number: '01',
    category: 'Client',
    name: 'Nextlevel Studio',
    live_link: 'https://github.com',
    video_url: null,
    video_file: null,
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    ]
  },
  {
    number: '02',
    category: 'Personal',
    name: 'Aura Brand Identity',
    live_link: 'https://github.com',
    video_url: null,
    video_file: null,
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    ]
  },
  {
    number: '03',
    category: 'Client',
    name: 'Solaris Digital',
    live_link: 'https://github.com',
    video_url: null,
    video_file: null,
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    ]
  },
];

function ProjectCard({
  project,
  index,
  totalCards,
}: {
  project: ProjectData;
  index: number;
  totalCards: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  // Determine video content
  const videoSrc = project.video_file || project.video_url;

  // Distribute images and video into the grid layout
  let col1Image1Src = '';
  let col1Image2Src = '';
  let col2MediaElement: React.ReactNode = null;

  if (videoSrc) {
    // Large slot is the video
    col2MediaElement = (
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover"
      />
    );
    col1Image1Src = project.images[0] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80';
    col1Image2Src = project.images[1] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80';
  } else {
    // Large slot is the first image
    const mainImg = project.images[0] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80';
    col2MediaElement = (
      <img
        src={mainImg}
        alt={`${project.name} main preview`}
        className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover"
      />
    );
    col1Image1Src = project.images[1] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80';
    col1Image2Src = project.images[2] || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80';
  }

  // Wrap project header/name inside clickable link
  const renderProjectName = () => {
    if (project.live_link) {
      return (
        <a
          href={project.live_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[#F3F4F6] hover:text-[#B501A7] text-xl sm:text-2xl md:text-3xl font-medium uppercase tracking-wider mb-4 border-b border-transparent hover:border-[#B501A7] transition-all duration-200"
        >
          {project.name}
        </a>
      );
    }
    return (
      <h3 className="text-[#F3F4F6] text-xl sm:text-2xl md:text-3xl font-medium uppercase tracking-wider mb-4">
        {project.name}
      </h3>
    );
  };

  return (
    <div
      ref={containerRef}
      className="h-[85vh] relative"
      style={{ top: `${index * 28}px` }}
    >
      <motion.div
        style={{ scale }}
        initial={{ opacity: 0, y: 80, rotateX: -5 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="sticky top-24 md:top-32 h-[calc(100vh-12rem)] md:h-[calc(100vh-16rem)] bg-[#0C0C0C]/90 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border border-white/10 hover:border-[#B501A7]/40 hover:shadow-[0_20px_45px_rgba(181,1,167,0.1)] transition-all duration-300 p-4 sm:p-6 md:p-8 flex flex-col backdrop-blur-md"
      >
        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="font-black text-[#F3F4F6] text-[clamp(2rem,8vw,120px)] leading-none" style={{ color: '#ffffff' }}>
              {project.number}
            </span>
            <span className="text-white text-sm sm:text-base md:text-lg font-medium uppercase tracking-wider" style={{ color: '#ffffff' }}>
              {project.category}
            </span>
          </div>
          <LiveProjectButton href={project.live_link} />
        </div>

        {/* Project Name (clickable if link available) */}
        <div className="flex justify-start">
          {renderProjectName()}
        </div>

        {/* Image Grid */}
        <div className="flex-1 flex gap-3 min-h-0">
          {/* Left Column - 40% */}
          <div className="w-2/5 flex flex-col gap-3">
            <img
              src={col1Image1Src}
              alt={`${project.name} preview 1`}
              className="w-full h-[clamp(130px,16vw,230px)] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover"
            />
            <img
              src={col1Image2Src}
              alt={`${project.name} preview 2`}
              className="w-full h-[clamp(160px,22vw,340px)] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover"
            />
          </div>
          {/* Right Column - 60% */}
          <div className="w-3/5">
            {col2MediaElement}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface ProjectsSectionProps {
  projectsData?: ProjectData[];
}

export default function ProjectsSection({ projectsData }: ProjectsSectionProps) {
  const displayProjects = projectsData && projectsData.length > 0 ? projectsData : defaultProjects;

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-20 px-5 sm:px-8 md:px-10 py-20"
    >
      <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16">
        Project
      </h2>

      <div className="max-w-7xl mx-auto">
        {displayProjects.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={displayProjects.length}
          />
        ))}
      </div>
    </section>
  );
}