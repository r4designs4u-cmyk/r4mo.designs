import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Star, Quote, ChevronDown, Youtube, Instagram, Twitter, Mail, Sparkles } from 'lucide-react';

/* ============================================
   GLOBAL LINK HELPER
   ============================================ */
const INSTAGRAM_URL = "https://instagram.com/r4mo_creates";
const YOUTUBE_URL = "https://yt.openinapp.co/rd13f";

function openLink(url: string) {
  window.location.href = url;
}

/* ============================================
   LOCAL DATA — No API, No Database
   ============================================ */

// Portfolio thumbnails — all from local uploads/
const PORTFOLIO_ITEMS = [
  { id: 1, title: 'Resident Evil 4 Remake', image: '/uploads/thumb-re4.png', category: 'gaming', client: 'Gaming Channel' },
  { id: 2, title: 'Red Dead Redemption 2', image: '/uploads/thumb-rdr2.png', category: 'gaming', client: 'Gaming Channel' },
  { id: 3, title: 'WMax BGMI Gaming', image: '/uploads/thumb-wmax.png', category: 'gaming', client: 'BGMI Creator' },
  { id: 4, title: 'ANNY Gaming', image: '/uploads/thumb-anny.png', category: 'gaming', client: 'ANNY Gaming' },
  { id: 5, title: 'Power is Live Valom', image: '/uploads/thumb-power.png', category: 'gaming', client: 'Power Live' },
  { id: 6, title: 'Tiger Is Live', image: '/uploads/thumb-tiger.png', category: 'gaming', client: 'Tiger' },
  { id: 7, title: 'Anony', image: '/uploads/thumb-anony.png', category: 'gaming', client: 'Anony' },
  { id: 8, title: 'Bacchu', image: '/uploads/thumb-bacchu.png', category: 'gaming', client: 'Bacchu' },
  { id: 9, title: 'Jonathan', image: '/uploads/thumb-jonathan.png', category: 'gaming', client: 'Jonathan' },
  { id: 10, title: 'LOVU', image: '/uploads/thumb-lovu.jpg', category: 'gaming', client: 'LOVU' },
  { id: 11, title: 'Muzzi Is Live', image: '/uploads/thumb-muzzi.png', category: 'gaming', client: 'Muzzi' },
  { id: 12, title: 'Snax', image: '/uploads/thumb-snax.png', category: 'gaming', client: 'Snax' },
  { id: 13, title: 'Vicotor Playz', image: '/uploads/thumb-vicotor.png', category: 'gaming', client: 'Vicotor Playz' },
  { id: 14, title: 'Viper Is Live', image: '/uploads/thumb-viper.png', category: 'gaming', client: 'Viper' },
  { id: 15, title: 'Mr Champion Plays - Valorant', image: '/uploads/thumb-mrchampion.png', category: 'gaming', client: 'Mr Champion' },
  { id: 16, title: 'Mr Beast Style Copy', image: '/uploads/thumb-mrbeast.png', category: 'gaming', client: 'Mr Beast' },
  { id: 17, title: 'Panther Playz', image: '/uploads/panther.png', category: 'gaming', client: 'Panther Playz' },
];

// Creator avatars — local or external (these are small, load fast)
const CREATORS = [
  { name: 'Alex Rivera', avatar: 'https://i.postimg.cc/vBw4Z3bn/channels4-profile.jpg' },
  { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=5' },
  { name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?img=3' },
  { name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=9' },
  { name: 'David Kim', avatar: 'https://i.pravatar.cc/150?img=8' },
  { name: 'Lisa Park', avatar: 'https://i.pravatar.cc/150?img=10' },
  { name: 'James Brown', avatar: 'https://i.pravatar.cc/150?img=11' },
];

// Testimonials — static data
const TESTIMONIALS = [
  {
    name: 'Alex Rivera',
    role: 'Tech YouTuber • 500K subs',
    content: 'Zee completely transformed my channel\'s CTR. My views jumped 300% in just one month after using his thumbnails.',
    avatar: 'https://i.postimg.cc/vBw4Z3bn/channels4-profile.jpg',
  },
  {
    name: 'Sarah Chen',
    role: 'Lifestyle Creator • 1M subs',
    content: 'I\'ve worked with many designers but R4MO is on another level. He understands what makes people click.',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Mike Johnson',
    role: 'Gaming YouTuber • 800K subs',
    content: 'The best investment I\'ve made for my channel. Professional, fast, and the results speak for themselves!',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    name: 'Emma Wilson',
    role: 'Education Channel • 2M subs',
    content: 'Our click-through rate went from 4% to 14% after working with him. Absolutely incredible work!',
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
  {
    name: 'David Kim',
    role: 'Review Channel • 600K subs',
    content: 'Incredibly talented designer who actually understands YouTube. Worth every penny!',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
  {
    name: 'Lisa Park',
    role: 'Vlog Channel • 350K subs',
    content: 'Working with R4MO was a game-changer. My videos finally get the attention they deserve!',
    avatar: 'https://i.pravatar.cc/150?img=10',
  },
];

// Scroll row images (derived from portfolio)
const SCROLL_ROW_1 = PORTFOLIO_ITEMS.slice(0, 8).map(p => p.image);
const SCROLL_ROW_2 = [...PORTFOLIO_ITEMS].reverse().slice(0, 8).map(p => p.image);
const SCROLL_ROW_3 = PORTFOLIO_ITEMS.map(p => p.image).reverse();

/* ============================================
   LIQUID GLASS BUTTON
   ============================================ */
function LiquidGlassButton({ 
  children, 
  onClick, 
  href,
  variant = 'primary',
  className = '',
  icon: Icon,
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'badge' | 'process';
  className?: string;
  icon?: React.ComponentType<{size?: number}>;
}) {
  const baseClasses = "relative group inline-flex items-center justify-center gap-1.5 font-medium transition-all duration-200 overflow-hidden will-change-transform";
  
  const variants = {
    primary: `
      px-6 py-3 rounded-full text-sm text-white
      bg-gradient-to-br from-white/20 via-white/10 to-white/5
      backdrop-blur-lg md:backdrop-blur-xl
      border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.06)]
      hover:border-white/50 active:scale-[0.98]
    `,
    secondary: `
      px-5 py-2 rounded-full text-xs text-white/90
      bg-gradient-to-br from-white/15 via-white/8 to-transparent
      backdrop-blur-lg md:backdrop-blur-xl
      border border-white/25 shadow-[0_0_10px_rgba(255,255,255,0.04)]
      hover:border-white/40 active:scale-[0.98]
    `,
    ghost: `
      px-6 py-2.5 rounded-full text-sm text-gray-300
      bg-white/5
      border border-white/10
      hover:text-white hover:bg-white/10 hover:border-white/20
      active:scale-[0.98]
    `,
    badge: `
      inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium
      bg-green-500/12 backdrop-blur-lg md:backdrop-blur-xl
      border border-green-500/25 shadow-[0_0_10px_rgba(34,197,94,0.08)]
    `,
    process: `
      px-7 py-3.5 rounded-full text-sm font-semibold text-white
      bg-gradient-to-br from-indigo-500/20 via-purple-500/12 to-blue-500/18
      backdrop-blur-lg md:backdrop-blur-xl
      border border-indigo-400/30 shadow-[0_0_20px_rgba(129,140,248,0.1)]
      hover:border-indigo-400/50 active:scale-[0.97]
    `,
  };

  return (
    <motion.a
      {...(href ? { href, onClick: (e: React.MouseEvent) => { e.preventDefault(); openLink(href); } } : { onClick })}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
      <span className="relative z-10 flex items-center gap-1.5">
        {Icon && <Icon size={16} />}
        {children}
      </span>
    </motion.a>
  );
}

/* ============================================
   INFINITE SCROLL ROW — Pure CSS 60fps
   ============================================ */
function InfiniteScrollRow({ 
  images, 
  direction = 'left', 
  speed = 30, 
  size = 'large',
}: { 
  images: string[]; 
  direction?: 'left' | 'right'; 
  speed?: number;
  size?: 'large' | 'small';
}) {
  const isLeft = direction === 'left';
  const animId = `scr-${direction}-${size}-${Math.random().toString(36).slice(2, 7)}`;
  const heightClass = size === 'large' ? 'h-26 sm:h-32 md:h-38 lg:h-44 xl:h-48' : 'h-16 sm:h-20 md:h-24 lg:h-28 xl:h-30';
  const widthClass = size === 'large' ? 'w-44 sm:w-52 md:w-60 lg:w-68 xl:w-76' : 'w-32 sm:w-38 md:w-44 lg:w-50 xl:w-56';
  const gapClass = size === 'large' ? 'gap-2.5 sm:gap-3' : 'gap-2 sm:gap-2.5';
  const radiusClass = size === 'large' ? 'rounded-xl' : 'rounded-lg';

  return (
    <>
      <style>{`
        @keyframes ${animId} {
          0% { transform: translateX(${isLeft ? '0' : '-50%'}); }
          100% { transform: translateX(${isLeft ? '-50%' : '0'}); }
        }
        .${animId}-row { animation: ${animId} ${speed}s linear infinite; will-change: transform; backface-visibility: hidden; }
        @media (prefers-reduced-motion: reduce) { .${animId}-row { animation: none !important; } }
      `}</style>

      <div className={`relative w-full overflow-hidden ${heightClass} flex items-center contain-layout`}>
        <div className="absolute left-0 top-0 bottom-0 w-14 sm:w-18 md:w-24 z-10 bg-gradient-to-r from-[#0a0a0f] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-14 sm:w-18 md:w-24 z-10 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none" />
        
        <div className={`flex ${gapClass} whitespace-nowrap ${animId}-row`}>
          {[...images, ...images].map((img, i) => (
            <div key={`${animId}-${i}`} className={`relative flex-shrink-0 ${widthClass} aspect-video ${radiusClass} overflow-hidden cursor-pointer`}>
              <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" style={{ transform: 'translateZ(0)' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ============================================
   STATS CARD
   ============================================ */
function StatCard({ imageSrc, value, label }: { imageSrc: string; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 p-3.5 sm:p-4 sm:gap-2.5 rounded-xl sm:rounded-2xl bg-white/[0.05] border border-white/[0.07] min-w-[95px] sm:min-w-[125px]">
      <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-lg sm:rounded-xl overflow-hidden ring-1 ring-white/12">
        <img src={imageSrc} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
      </div>
      <span className="text-lg sm:text-2xl font-bold text-white tracking-tight">{value}</span>
      <span className="text-[11px] sm:text-sm text-gray-400 font-medium leading-tight text-center">{label}</span>
    </div>
  );
}

/* ============================================
   MAIN APP — FULLY STATIC, NO API CALLS
   ============================================ */
function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // NO useEffect, NO fetch(), NO loading state!
  // Data comes from local constants above

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'thumbnails', label: 'Thumbnails' },
    { id: 'about', label: 'About Me' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faq', label: 'FAQ' },
    { id: 'socials', label: 'Socials' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Global styles */}
      <style>{`
        * { -webkit-tap-highlight-color: transparent; }
        html { scroll-behavior: smooth; }
        img { image-rendering: -webkit-optimize-contrast; }
        .contain-layout { content-visibility: auto; contain-intrinsic-size: auto 200px; }
      `}</style>

      {/* ========== NAVIGATION ========== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md md:backdrop-blur-2xl border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-13 md:h-14">
            <div className="flex items-center gap-0.5 cursor-pointer" onClick={() => scrollToSection('home')}>
              <span className="text-base md:text-lg font-bold text-white tracking-tight">R4</span>
              <span className="text-base md:text-lg font-black text-white tracking-tight">MO</span>
            </div>

            <div className="hidden md:flex items-center gap-5">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollToSection(item.id)}
                  className={`text-[11px] font-medium transition-colors hover:text-white ${activeSection === item.id ? 'text-white' : 'text-gray-400'}`}>
                  {item.label}
                </button>
              ))}
            </div>

            <div className="hidden md:block">
              <LiquidGlassButton variant="secondary" onClick={() => openLink(INSTAGRAM_URL)}>Get Started</LiquidGlassButton>
            </div>

            <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.15 }}
              className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-md border-t border-white/[0.05] overflow-hidden">
              <div className="px-4 py-3 space-y-1.5">
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => scrollToSection(item.id)} className="block w-full text-left py-2 text-gray-300 hover:text-white transition-colors text-xs">{item.label}</button>
                ))}
                <div className="pt-2"><LiquidGlassButton variant="secondary" onClick={() => openLink(INSTAGRAM_URL)} className="w-full">Get Started</LiquidGlassButton></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ========== HERO SECTION ========== */}
      <section id="home" className="relative pt-22 pb-4 md:pt-26 md:pb-6 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="hidden md:block absolute top-[-50px] left-1/4 w-[450px] h-[450px] bg-purple-600/5 rounded-full blur-[120px]" />
          <div className="hidden md:block absolute top-10 right-1/4 w-[350px] h-[350px] bg-blue-600/5 rounded-full blur-[100px]" />
          <div className="md:hidden absolute top-0 left-1/3 w-[200px] h-[200px] bg-purple-600/4 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <LiquidGlassButton variant="badge">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Available Now
            </LiquidGlassButton>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.35 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mt-5 mb-4 tracking-tight">
            Crafting<br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Instant Clicks.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.35 }}
            className="text-sm md:text-base text-gray-400 max-w-lg mx-auto mb-7 leading-relaxed">
            My work isn't just good-looking — it's about making visuals that pull people in and get real engagement.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26, duration: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <LiquidGlassButton variant="primary" onClick={() => openLink(INSTAGRAM_URL)} icon={ArrowRight}>Get Started</LiquidGlassButton>
            <LiquidGlassButton variant="ghost" onClick={() => scrollToSection('thumbnails')}>View Portfolio</LiquidGlassButton>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34, duration: 0.35 }}
            className="flex flex-col items-center gap-2.5">
            <p className="text-[11px] text-gray-500">Trusted by 150+ creators</p>
            <div className="flex items-center -space-x-2">
              {CREATORS.slice(0, 7).map((c, i) => (
                <img key={i} src={c.avatar} alt={c.name} loading="lazy" decoding="async"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-[#0a0a0f] object-cover hover:scale-110 hover:z-10 hover:ring-purple-500/50 transition-all cursor-pointer" />
              ))}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 ring-2 ring-[#0a0a0f] flex items-center justify-center text-[9px] font-bold">+</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== INFINITE SCROLL THUMBNAILS — Local Images Only! ========== */}
      <section className="py-4 md:py-5 space-y-2 md:space-y-3 relative contain-layout">
        <InfiniteScrollRow images={SCROLL_ROW_1} direction="right" speed={35} size="large" />
        <InfiniteScrollRow images={SCROLL_ROW_2} direction="left" speed={28} size="small" />
        <InfiniteScrollRow images={SCROLL_ROW_3} direction="right" speed={42} size="large" />
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="py-6 md:py-8 px-4 relative contain-layout">
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-3 sm:gap-5 md:gap-8">
          <StatCard imageSrc="/uploads/stat-eye.png" value="90M+" label="Views Generated" />
          <StatCard imageSrc="/uploads/stat-thumb.png" value="1500+" label="Thumbnails Made" />
          <StatCard imageSrc="/uploads/stat-user.png" value="150+" label="Happy Creators" />
        </div>
      </section>

      {/* ========== PROCESS SECTION ========== */}
      <section className="py-6 md:py-10 px-4 relative contain-layout">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-5">
            <LiquidGlassButton variant="process" onClick={() => openLink(INSTAGRAM_URL)} icon={Sparkles}>Start Your Project</LiquidGlassButton>
          </div>
          <p className="text-base md:text-lg font-semibold text-white mb-5">
            Our Thumbnail Design Process in{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">3 Simple Steps</span>
          </p>
          <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-black/20">
            <img src="/uploads/process-dn.png" alt="Design Process" loading="lazy" decoding="async" className="w-full h-auto object-contain" />
          </div>
        </div>
      </section>

      {/* Scroll Down */}
      <div className="flex justify-center pb-6 pt-1">
        <button onClick={() => scrollToSection('thumbnails')} className="p-1.5 rounded-full text-gray-500 hover:text-white transition-colors animate-bounce">
          <ChevronDown size={18} />
        </button>
      </div>

      {/* ========== PORTFOLIO SECTION — Local Images Only! ========== */}
      <section id="thumbnails" className="py-16 md:py-20 px-4 relative contain-layout">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">My Thumbnails</h2>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">High-converting thumbnails designed to stop the scroll and drive clicks.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {PORTFOLIO_ITEMS.map((item) => (
              <div key={item.id} onClick={() => setLightboxImage(item.image)}
                className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-white/5">
                <img src={item.image} alt={item.title} loading="lazy" decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
                  <p className="text-xs font-semibold text-white">{item.title}</p>
                  <p className="text-[10px] text-gray-300">{item.client}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer">
            <motion.img initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.15 }}
              src={lightboxImage} alt="" className="max-w-full max-h-[85vh] object-contain rounded-xl" onClick={(e) => e.stopPropagation()} />
            <button onClick={() => setLightboxImage(null)} className="absolute top-5 right-5 p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== ABOUT ME SECTION ========== */}
      <section id="about" className="py-16 md:py-20 px-4 relative contain-layout">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-7">
            <Sparkles size={15} className="text-purple-400" /> <span className="text-sm text-purple-400 font-medium">About Me</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-7">
            The Mind Behind the <br /><span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Thumbnails</span>
          </h2>
          
          <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            <p>Hey there! I'm <strong className="text-white">R4MO</strong>, a professional thumbnail designer who's helped over 150+ creators transform their click-through rates.</p>
            <p>I specialize in creating eye-catching, high-converting YouTube thumbnails that don't just look good — they perform. My designs combine psychology, color theory, and proven marketing principles.</p>
            <p>With years of experience in digital design and a deep understanding of what makes viewers click, I've developed a unique style that balances creativity with conversion optimization.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-12 md:mt-14">
            {[
              { value: '150+', label: 'Happy Clients' },
              { value: '1500+', label: 'Thumbnails Made' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '5+', label: 'Years Experience' },
            ].map((stat) => (
              <div key={stat.label} className="group p-4 md:p-5 rounded-2xl bg-white text-black shadow-[0_4px_20px_rgba(255,255,255,0.08)] border border-white/80 hover:shadow-[0_6px_28px_rgba(255,255,255,0.14)] transition-all duration-250">
                <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-[11px] md:text-sm text-gray-500 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS SECTION — Static Data! ========== */}
      <section id="testimonials" className="py-16 md:py-20 px-4 relative contain-layout">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">What Clients Say</h2>
            <p className="text-gray-400 text-sm md:text-base">Real feedback from real creators</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                <Quote size={24} className="text-purple-500/30 mb-3" />
                <p className="text-gray-300 mb-5 leading-relaxed text-xs md:text-sm">{t.content}</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} loading="lazy" decoding="async" className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover ring-2 ring-purple-500/30" />
                  <div><p className="font-semibold text-white text-xs md:text-sm">{t.name}</p><p className="text-[10px] md:text-xs text-gray-400">{t.role}</p></div>
                </div>
                <div className="flex gap-1 mt-3">{[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section id="faq" className="py-16 md:py-20 px-4 relative contain-layout">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">FAQ</h2>
            <p className="text-gray-400 text-sm md:text-base">Got questions? I've got answers.</p>
          </div>

          <div className="space-y-3">
            {[
              { q: 'How long does it take to get my thumbnails?', a: 'Typically 24-48 hours for standard orders. Rush delivery is available for an additional fee.' },
              { q: 'How many revisions do I get?', a: 'Every package includes unlimited revisions until you\'re 100% satisfied with the result.' },
              { q: 'What formats do you deliver?', a: 'I deliver in PNG (recommended), JPG, and PSD source files so you have full flexibility.' },
              { q: 'Do you work with small channels?', a: 'Absolutely! I work with creators of all sizes — from new channels to established YouTubers with millions of subscribers.' },
              { q: 'What makes your thumbnails different?', a: 'I combine design psychology, color theory, and proven CRO principles. Every element is intentional.' },
            ].map((faq, index) => <FaqItem key={index} question={faq.q} answer={faq.a} index={index} />)}
          </div>
        </div>
      </section>

      {/* ========== SOCIALS / CTA SECTION ========== */}
      <section id="socials" className="py-16 md:py-20 px-4 relative contain-layout">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-5">
            Let's Create Something{' '}<span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Amazing</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-8 max-w-xl mx-auto">Ready to transform your click-through rate? Let's talk about your next project.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 md:mb-14">
            <LiquidGlassButton variant="primary" href={INSTAGRAM_URL} icon={Mail}>Get In Touch</LiquidGlassButton>
            <LiquidGlassButton variant="ghost" href={INSTAGRAM_URL}>View Pricing</LiquidGlassButton>
          </div>

          <div className="flex items-center justify-center gap-3">
            {[{ icon: Youtube, href: YOUTUBE_URL }, { icon: Twitter, href: '#' }, { icon: Instagram, href: INSTAGRAM_URL }, { icon: Mail, href: INSTAGRAM_URL }].map((s) => (
              <motion.a key={s.href} href="#" onClick={(e) => { e.preventDefault(); openLink(s.href); }} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}
                className="group relative p-3 md:p-3.5 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] hover:border-white/20 transition-all duration-200">
                <s.icon size={20} className="text-gray-400 group-hover:text-white transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-7 px-4 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-0.5"><span className="text-sm font-bold text-white">R4</span><span className="text-sm font-black text-white">MO</span></div>
          <p className="text-[11px] text-gray-500">© {new Date().getFullYear()} R4MO. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[11px] text-gray-500 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-[11px] text-gray-500 hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* FAQ Item */
function FaqItem({ question, answer }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-4 md:p-5 text-left">
        <span className="font-medium text-white pr-4 text-xs md:text-sm">{question}</span>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} className="flex-shrink-0">
          <ChevronDown size={16} className="text-gray-400" />
        </span>
      </button>
      {isOpen && (
        <div style={{ animation: 'fadeIn 0.15s ease-out' }}>
          <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
          <p className="px-4 md:px-5 pb-4 md:pb-5 text-gray-400 leading-relaxed text-xs md:text-sm">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;
