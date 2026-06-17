import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { SkillData } from '../App';

const defaultSkills = [
  { name: '3D Modeling', level: 95 },
  { name: 'Texturing & Rendering', level: 90 },
  { name: 'Motion Graphics', level: 85 },
  { name: 'Web Design', level: 80 },
];

interface SkillsSectionProps {
  skillsData?: SkillData[];
}

// 3D Hover Tilt Wrapper
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const rotateX = useTransform(cardY, [-150, 150], [6, -6]);
  const rotateY = useTransform(cardX, [-150, 150], [-6, 6]);

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
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      className={`bg-[#0F1015] border border-[#1F222F] rounded-[20px] shadow-[0_20px_45px_rgba(0,0,0,0.6)] ${className}`}
    >
      <div style={{ transform: 'translateZ(10px)', padding: '24px' }} className="h-full w-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}

export default function SkillsSection({ skillsData }: SkillsSectionProps) {
  const displaySkills = skillsData && skillsData.length > 0 ? skillsData : defaultSkills;

  // Calculate average for progress gauge
  const avgLevel = Math.round(
    displaySkills.reduce((acc, curr) => acc + curr.level, 0) / displaySkills.length
  );

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Generate SVG path for Solid Line (Current Skill Mastery)
  const generateSolidPath = () => {
    if (displaySkills.length === 0) return '';
    const width = 500;
    const height = 150;
    const padding = 25;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const points: string[] = [];

    displaySkills.forEach((skill, i) => {
      const x = padding + (i / (displaySkills.length - 1)) * chartWidth;
      const y = padding + chartHeight - (skill.level / 100) * chartHeight;
      points.push(`${x},${y}`);
    });

    // Generate smooth bezier curve coordinates
    let path = `M ${points[0]}`;
    for (let i = 0; i < points.length - 1; i++) {
      const [x1, y1] = points[i].split(',').map(Number);
      const [x2, y2] = points[i + 1].split(',').map(Number);
      const cpX1 = x1 + (x2 - x1) / 2;
      const cpY1 = y1;
      const cpX2 = x1 + (x2 - x1) / 2;
      const cpY2 = y2;
      path += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${x2},${y2}`;
    }
    return path;
  };

  // Generate SVG path for Dashed Line (Target Mastery / Dotted Magenta line)
  const generateDashedPath = () => {
    if (displaySkills.length === 0) return '';
    const width = 500;
    const height = 150;
    const padding = 25;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const points: string[] = [];

    displaySkills.forEach((skill, i) => {
      const x = padding + (i / (displaySkills.length - 1)) * chartWidth;
      // Offset values slightly down to create the second comparison line
      const targetLevel = Math.min(100, skill.level - 12);
      const y = padding + chartHeight - (targetLevel / 100) * chartHeight;
      points.push(`${x},${y}`);
    });

    let path = `M ${points[0]}`;
    for (let i = 0; i < points.length - 1; i++) {
      const [x1, y1] = points[i].split(',').map(Number);
      const [x2, y2] = points[i + 1].split(',').map(Number);
      const cpX1 = x1 + (x2 - x1) / 2;
      const cpY1 = y1;
      const cpX2 = x1 + (x2 - x1) / 2;
      const cpY2 = y2;
      path += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${x2},${y2}`;
    }
    return path;
  };

  // SVG color arrays for the doughnut divisions
  const doughnutColors = ['#0091FF', '#00F0FF', '#10B981', '#0561F5'];

  return (
    <section
      id="skills"
      className="bg-[#0A0B0E] px-5 sm:px-8 md:px-10 py-24 sm:py-32 relative z-10"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-6 md:gap-8">
        
        {/* ROW 1: Wavy Area Chart (Tickets Created vs Tickets Solved styling) */}
        <TiltCard className="w-full min-h-[300px] flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-white font-bold tracking-wide" style={{ color: '#ffffff', paddingLeft: '12px', fontSize: '24px' }}>
                Skills Mastery vs Experience
              </h3>
            </div>
            {/* Legend indicators */}
            <div className="flex items-center gap-4 font-semibold" style={{ color: 'rgba(243, 244, 246, 0.8)', fontSize: '15px' }}>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#00F0FF]" /> Mastery Level
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 border-t border-dashed border-[#B600A8]" /> Reference Index
              </div>
            </div>
          </div>

          {/* SVG Line / Area Graph */}
          <div className="relative w-full h-[180px] flex items-center justify-center mt-2">
            <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="solidGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 25, 50, 75, 100].map((val) => (
                <line
                  key={val}
                  x1="25"
                  y1={25 + (val / 100) * 100}
                  x2="475"
                  y2={25 + (val / 100) * 100}
                  stroke="rgba(255, 255, 255, 0.04)"
                  strokeWidth="1"
                />
              ))}

              {/* Solid Line Area Gradient Fill */}
              <path d={`${generateSolidPath()} L 475,125 L 25,125 Z`} fill="url(#solidGlow)" />

              {/* Dotted/Dashed Comparison Line (Magenta) */}
              <path
                d={generateDashedPath()}
                fill="none"
                stroke="#B600A8"
                strokeWidth="2"
                strokeDasharray="3,3"
                opacity="0.8"
              />

              {/* Solid Line (Cyan) */}
              <path
                d={generateSolidPath()}
                fill="none"
                stroke="#00F0FF"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0px 0px 4px rgba(0, 240, 255, 0.4))' }}
              />

              {/* Tooltip nodes */}
              {displaySkills.map((skill, i) => {
                const x = 25 + (i / (displaySkills.length - 1)) * 450;
                const y = 125 - (skill.level / 100) * 100;
                const isHovered = hoverIndex === i;

                return (
                  <g key={skill.name}>
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered ? "7" : "4.5"}
                      fill="#00F0FF"
                      stroke="#0F1015"
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-150"
                      onMouseEnter={() => setHoverIndex(i)}
                      onMouseLeave={() => setHoverIndex(null)}
                    />
                    {isHovered && (
                      <g>
                        <rect
                          x={x - 45}
                          y={y - 38}
                          width="90"
                          height="24"
                          rx="6"
                          fill="#1A1B22"
                          stroke="rgba(255,255,255,0.08)"
                          strokeWidth="1"
                        />
                        <text
                          x={x}
                          y={y - 22}
                          fill="#fff"
                          fontSize="9"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          Level: {skill.level}%
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Grid Axis Labels (Looping Marquee going right) */}
          <div className="w-full overflow-hidden mt-6 border-t border-white/5 pt-4">
            <div className="relative flex w-full overflow-x-hidden">
              <motion.div
                className="flex gap-32 whitespace-nowrap"
                animate={{ x: ['-50%', '0%'] }}
                transition={{
                  ease: 'linear',
                  duration: 22,
                  repeat: Infinity,
                }}
                style={{ width: 'fit-content' }}
              >
                {[...displaySkills, ...displaySkills, ...displaySkills, ...displaySkills].map((s, idx) => (
                  <span
                    key={`${s.name}-${idx}`}
                    className="font-black uppercase tracking-widest flex items-center gap-10"
                    style={{ color: '#ffffff', fontSize: '42px' }}
                  >
                    <span>{s.name}</span>
                    <span className="w-5 h-5 bg-[#B501A7] rounded-full opacity-85 shadow-[0_0_15px_#B501A7]" />
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </TiltCard>

        {/* ROW 2: Doughnut and circular progress side-by-side */}
        <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8">
          
          {/* WIDGET 2: Doughnut Chart (Tickets By Type Styling) */}
          <TiltCard className="flex-1 min-h-[260px] flex flex-col justify-between">
            <h3 className="text-white font-bold text-lg tracking-wide mb-2" style={{ color: '#ffffff', paddingLeft: '12px' }}>
              Skills Breakdown
            </h3>

            <div className="flex items-center justify-around flex-1 py-2 gap-4">
              {/* Doughnut SVG Circle */}
              <div className="relative w-[130px] h-[130px] flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-full h-full transform -rotate-90">
                  <circle cx="20" cy="20" r="15" fill="transparent" stroke="rgba(255,255,255,0.02)" strokeWidth="4.5" />
                  
                  {/* Segment 1 */}
                  <circle
                    cx="20"
                    cy="20"
                    r="15"
                    fill="transparent"
                    stroke="#0091FF"
                    strokeWidth="4.5"
                    strokeDasharray="94.2"
                    strokeDashoffset="10"
                    style={{ filter: 'drop-shadow(0px 0px 3px rgba(0, 145, 255, 0.4))' }}
                  />
                  {/* Segment 2 */}
                  <circle
                    cx="20"
                    cy="20"
                    r="15"
                    fill="transparent"
                    stroke="#00F0FF"
                    strokeWidth="4.5"
                    strokeDasharray="94.2"
                    strokeDashoffset="40"
                    style={{ filter: 'drop-shadow(0px 0px 3px rgba(0, 240, 255, 0.4))' }}
                  />
                  {/* Segment 3 */}
                  <circle
                    cx="20"
                    cy="20"
                    r="15"
                    fill="transparent"
                    stroke="#10B981"
                    strokeWidth="4.5"
                    strokeDasharray="94.2"
                    strokeDashoffset="65"
                    style={{ filter: 'drop-shadow(0px 0px 3px rgba(16, 185, 129, 0.4))' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-black text-white" style={{ color: '#ffffff' }}>Share</span>
                </div>
              </div>

              {/* Side Legends (mockup aligned vertical listing) */}
              <div className="flex flex-col gap-3 text-sm text-[#F3F4F6]" style={{ paddingRight: '16px' }}>
                {displaySkills.slice(0, 4).map((skill, idx) => (
                  <div key={skill.name} className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/10"
                      style={{ backgroundColor: doughnutColors[idx % doughnutColors.length] }}
                    />
                    <span className="font-bold uppercase tracking-wider truncate max-w-[180px] text-white" style={{ color: '#ffffff', fontSize: '22px' }}>
                      {skill.name.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>

          {/* WIDGET 3: Progress Gauge (New Tickets vs Returned Tickets styling) */}
          <TiltCard className="flex-1 min-h-[260px] flex flex-col justify-between">
            <h3 className="text-white font-bold text-lg tracking-wide mb-2" style={{ color: '#ffffff', paddingLeft: '12px' }}>
              Performance Target
            </h3>

            <div className="flex items-center justify-around flex-1 py-2 gap-4">
              {/* Splitted Circular track */}
              <div className="relative w-[130px] h-[130px] flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="rgba(255,255,255,0.02)"
                    strokeWidth="7"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#B600A8"
                    strokeWidth="7.5"
                    fill="transparent"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    whileInView={{ strokeDashoffset: 251.2 - (251.2 * avgLevel) / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{ filter: 'drop-shadow(0px 0px 6px rgba(182, 0, 168, 0.5))' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="uppercase font-bold tracking-wider" style={{ color: '#F3F4F6', fontSize: '15px' }}>Mastery</span>
                  <span className="font-black mt-0.5" style={{ color: '#ffffff', fontSize: '38px' }}>{avgLevel}%</span>
                </div>
              </div>

              {/* Side index metrics */}
              <div className="flex flex-col gap-3 text-sm text-white" style={{ color: '#ffffff', paddingRight: '16px' }}>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full border border-white/10 bg-[#B600A8]" />
                  <div className="flex flex-col">
                    <span className="uppercase font-bold" style={{ color: 'rgba(243, 244, 246, 0.8)', fontSize: '14px' }}>Active Index</span>
                    <span className="font-black" style={{ color: '#ffffff', fontSize: '22px' }}>{avgLevel}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full border border-white/10 bg-[#7621B0]" />
                  <div className="flex flex-col">
                    <span className="uppercase font-bold" style={{ color: 'rgba(243, 244, 246, 0.8)', fontSize: '14px' }}>Growth Space</span>
                    <span className="font-black" style={{ color: '#ffffff', fontSize: '22px' }}>{100 - avgLevel}%</span>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>

        </div>
      </div>
    </section>
  );
}
