import type { SocialData } from '../App';

interface FooterProps {
  socialsData?: SocialData[];
  userName?: string;
}

export default function Footer({ socialsData, userName }: FooterProps) {
  const displaySocials = socialsData && socialsData.length > 0 ? socialsData : [
    { platform: 'GitHub', url: 'https://github.com' },
    { platform: 'LinkedIn', url: 'https://linkedin.com' },
    { platform: 'Behance', url: 'https://behance.net' }
  ];

  const name = userName || 'Abdelrhaman';

  return (
    <footer id="contact" className="bg-[#0C0C0C] py-16 px-6 md:px-10 border-t border-[#F3F4F6]/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Branding */}
        <div>
          <span className="text-[#F3F4F6] font-semibold tracking-wider text-xl uppercase">
            {name}
          </span>
           <p className="text-[#F3F4F6]/50 text-sm mt-2">
            © 2026 {name}. All rights reserved.
          </p>
        </div>

        {/* Dynamic Social Networks */}
        <div className="flex gap-6 sm:gap-8 flex-wrap justify-center">
          {displaySocials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F3F4F6]/70 hover:text-[#F3F4F6] font-medium tracking-wide uppercase text-sm sm:text-base border-b border-transparent hover:border-[#F3F4F6] transition-all duration-200"
            >
              {social.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
