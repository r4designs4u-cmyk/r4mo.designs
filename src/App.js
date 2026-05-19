import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Star, Quote, ChevronDown, Youtube, Instagram, Twitter, Mail, Sparkles } from 'lucide-react';
/* ============================================
   GLOBAL LINK HELPER
   ============================================ */
const INSTAGRAM_URL = "https://instagram.com/r4mo_creates";
const YOUTUBE_URL = "https://yt.openinapp.co/rd13f";
function openLink(url) {
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
];
// Creator avatars — local or external (these are small, load fast)
const CREATORS = [
    { name: 'Jonathan Gaming', avatar: 'https://i.postimg.cc/vBw4Z3bn/channels4-profile.jpg' },
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
        name: 'Jonathan Gaming',
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
function LiquidGlassButton({ children, onClick, href, variant = 'primary', className = '', icon: Icon, }) {
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
    return (_jsxs(motion.a, { ...(href ? { href, onClick: (e) => { e.preventDefault(); openLink(href); } } : { onClick }), whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 }, className: `${baseClasses} ${variants[variant]} ${className}`, children: [_jsx("div", { className: "absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" }), _jsxs("span", { className: "relative z-10 flex items-center gap-1.5", children: [Icon && _jsx(Icon, { size: 16 }), children] })] }));
}
/* ============================================
   INFINITE SCROLL ROW — Pure CSS 60fps
   ============================================ */
function InfiniteScrollRow({ images, direction = 'left', speed = 30, size = 'large', }) {
    const isLeft = direction === 'left';
    const animId = `scr-${direction}-${size}-${Math.random().toString(36).slice(2, 7)}`;
    const heightClass = size === 'large' ? 'h-26 sm:h-32 md:h-38 lg:h-44 xl:h-48' : 'h-16 sm:h-20 md:h-24 lg:h-28 xl:h-30';
    const widthClass = size === 'large' ? 'w-44 sm:w-52 md:w-60 lg:w-68 xl:w-76' : 'w-32 sm:w-38 md:w-44 lg:w-50 xl:w-56';
    const gapClass = size === 'large' ? 'gap-2.5 sm:gap-3' : 'gap-2 sm:gap-2.5';
    const radiusClass = size === 'large' ? 'rounded-xl' : 'rounded-lg';
    return (_jsxs(_Fragment, { children: [_jsx("style", { children: `
        @keyframes ${animId} {
          0% { transform: translateX(${isLeft ? '0' : '-50%'}); }
          100% { transform: translateX(${isLeft ? '-50%' : '0'}); }
        }
        .${animId}-row { animation: ${animId} ${speed}s linear infinite; will-change: transform; backface-visibility: hidden; }
        @media (prefers-reduced-motion: reduce) { .${animId}-row { animation: none !important; } }
      ` }), _jsxs("div", { className: `relative w-full overflow-hidden ${heightClass} flex items-center contain-layout`, children: [_jsx("div", { className: "absolute left-0 top-0 bottom-0 w-14 sm:w-18 md:w-24 z-10 bg-gradient-to-r from-[#0a0a0f] to-transparent pointer-events-none" }), _jsx("div", { className: "absolute right-0 top-0 bottom-0 w-14 sm:w-18 md:w-24 z-10 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none" }), _jsx("div", { className: `flex ${gapClass} whitespace-nowrap ${animId}-row`, children: [...images, ...images].map((img, i) => (_jsxs("div", { className: `relative flex-shrink-0 ${widthClass} aspect-video ${radiusClass} overflow-hidden cursor-pointer`, children: [_jsx("img", { src: img, alt: "", loading: "lazy", decoding: "async", className: "w-full h-full object-cover", style: { transform: 'translateZ(0)' } }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200" })] }, `${animId}-${i}`))) })] })] }));
}
/* ============================================
   STATS CARD
   ============================================ */
function StatCard({ imageSrc, value, label }) {
    return (_jsxs("div", { className: "flex flex-col items-center gap-2 p-3.5 sm:p-4 sm:gap-2.5 rounded-xl sm:rounded-2xl bg-white/[0.05] border border-white/[0.07] min-w-[95px] sm:min-w-[125px]", children: [_jsx("div", { className: "w-11 h-11 sm:w-13 sm:h-13 rounded-lg sm:rounded-xl overflow-hidden ring-1 ring-white/12", children: _jsx("img", { src: imageSrc, alt: "", loading: "lazy", decoding: "async", className: "w-full h-full object-cover" }) }), _jsx("span", { className: "text-lg sm:text-2xl font-bold text-white tracking-tight", children: value }), _jsx("span", { className: "text-[11px] sm:text-sm text-gray-400 font-medium leading-tight text-center", children: label })] }));
}
/* ============================================
   MAIN APP — FULLY STATIC, NO API CALLS
   ============================================ */
function App() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [lightboxImage, setLightboxImage] = useState(null);
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
    const scrollToSection = (id) => {
        setActiveSection(id);
        setMobileMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };
    return (_jsxs("div", { className: "min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden", children: [_jsx("style", { children: `
        * { -webkit-tap-highlight-color: transparent; }
        html { scroll-behavior: smooth; }
        img { image-rendering: -webkit-optimize-contrast; }
        .contain-layout { content-visibility: auto; contain-intrinsic-size: auto 200px; }
      ` }), _jsxs("nav", { className: "fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md md:backdrop-blur-2xl border-b border-white/[0.05]", children: [_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between h-13 md:h-14", children: [_jsxs("div", { className: "flex items-center gap-0.5 cursor-pointer", onClick: () => scrollToSection('home'), children: [_jsx("span", { className: "text-base md:text-lg font-bold text-white tracking-tight", children: "R4" }), _jsx("span", { className: "text-base md:text-lg font-black text-white tracking-tight", children: "MO" })] }), _jsx("div", { className: "hidden md:flex items-center gap-5", children: navItems.map((item) => (_jsx("button", { onClick: () => scrollToSection(item.id), className: `text-[11px] font-medium transition-colors hover:text-white ${activeSection === item.id ? 'text-white' : 'text-gray-400'}`, children: item.label }, item.id))) }), _jsx("div", { className: "hidden md:block", children: _jsx(LiquidGlassButton, { variant: "secondary", onClick: () => openLink(INSTAGRAM_URL), children: "Get Started" }) }), _jsx("button", { className: "md:hidden p-2 text-white", onClick: () => setMobileMenuOpen(!mobileMenuOpen), children: mobileMenuOpen ? _jsx(X, { size: 18 }) : _jsx(Menu, { size: 18 }) })] }) }), _jsx(AnimatePresence, { children: mobileMenuOpen && (_jsx(motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.15 }, className: "md:hidden bg-[#0a0a0f]/95 backdrop-blur-md border-t border-white/[0.05] overflow-hidden", children: _jsxs("div", { className: "px-4 py-3 space-y-1.5", children: [navItems.map((item) => (_jsx("button", { onClick: () => scrollToSection(item.id), className: "block w-full text-left py-2 text-gray-300 hover:text-white transition-colors text-xs", children: item.label }, item.id))), _jsx("div", { className: "pt-2", children: _jsx(LiquidGlassButton, { variant: "secondary", onClick: () => openLink(INSTAGRAM_URL), className: "w-full", children: "Get Started" }) })] }) })) })] }), _jsxs("section", { id: "home", className: "relative pt-22 pb-4 md:pt-26 md:pb-6 px-4", children: [_jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [_jsx("div", { className: "hidden md:block absolute top-[-50px] left-1/4 w-[450px] h-[450px] bg-purple-600/5 rounded-full blur-[120px]" }), _jsx("div", { className: "hidden md:block absolute top-10 right-1/4 w-[350px] h-[350px] bg-blue-600/5 rounded-full blur-[100px]" }), _jsx("div", { className: "md:hidden absolute top-0 left-1/3 w-[200px] h-[200px] bg-purple-600/4 rounded-full blur-[80px]" })] }), _jsxs("div", { className: "relative z-10 max-w-4xl mx-auto text-center", children: [_jsx(motion.div, { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, children: _jsxs(LiquidGlassButton, { variant: "badge", children: [_jsx("span", { className: "w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" }), " Available Now"] }) }), _jsxs(motion.h1, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1, duration: 0.35 }, className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mt-5 mb-4 tracking-tight", children: ["Crafting", _jsx("br", {}), _jsx("span", { className: "bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent", children: "Instant Clicks." })] }), _jsx(motion.p, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.18, duration: 0.35 }, className: "text-sm md:text-base text-gray-400 max-w-lg mx-auto mb-7 leading-relaxed", children: "My work isn't just good-looking \u2014 it's about making visuals that pull people in and get real engagement." }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.26, duration: 0.35 }, className: "flex flex-col sm:flex-row items-center justify-center gap-3 mb-8", children: [_jsx(LiquidGlassButton, { variant: "primary", onClick: () => openLink(INSTAGRAM_URL), icon: ArrowRight, children: "Get Started" }), _jsx(LiquidGlassButton, { variant: "ghost", onClick: () => scrollToSection('thumbnails'), children: "View Portfolio" })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.34, duration: 0.35 }, className: "flex flex-col items-center gap-2.5", children: [_jsx("p", { className: "text-[11px] text-gray-500", children: "Trusted by 150+ creators" }), _jsxs("div", { className: "flex items-center -space-x-2", children: [CREATORS.slice(0, 7).map((c, i) => (_jsx("img", { src: c.avatar, alt: c.name, loading: "lazy", decoding: "async", className: "w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-[#0a0a0f] object-cover hover:scale-110 hover:z-10 hover:ring-purple-500/50 transition-all cursor-pointer" }, i))), _jsx("div", { className: "w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 ring-2 ring-[#0a0a0f] flex items-center justify-center text-[9px] font-bold", children: "+" })] })] })] })] }), _jsxs("section", { className: "py-4 md:py-5 space-y-2 md:space-y-3 relative contain-layout", children: [_jsx(InfiniteScrollRow, { images: SCROLL_ROW_1, direction: "right", speed: 35, size: "large" }), _jsx(InfiniteScrollRow, { images: SCROLL_ROW_2, direction: "left", speed: 28, size: "small" }), _jsx(InfiniteScrollRow, { images: SCROLL_ROW_3, direction: "right", speed: 42, size: "large" })] }), _jsx("section", { className: "py-6 md:py-8 px-4 relative contain-layout", children: _jsxs("div", { className: "max-w-3xl mx-auto flex items-center justify-center gap-3 sm:gap-5 md:gap-8", children: [_jsx(StatCard, { imageSrc: "/uploads/stat-eye.png", value: "90M+", label: "Views Generated" }), _jsx(StatCard, { imageSrc: "/uploads/stat-thumb.png", value: "1500+", label: "Thumbnails Made" }), _jsx(StatCard, { imageSrc: "/uploads/stat-user.png", value: "150+", label: "Happy Creators" })] }) }), _jsx("section", { className: "py-6 md:py-10 px-4 relative contain-layout", children: _jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [_jsx("div", { className: "mb-5", children: _jsx(LiquidGlassButton, { variant: "process", onClick: () => openLink(INSTAGRAM_URL), icon: Sparkles, children: "Start Your Project" }) }), _jsxs("p", { className: "text-base md:text-lg font-semibold text-white mb-5", children: ["Our Thumbnail Design Process in", ' ', _jsx("span", { className: "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent", children: "3 Simple Steps" })] }), _jsx("div", { className: "relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-black/20", children: _jsx("img", { src: "/uploads/process-dn.png", alt: "Design Process", loading: "lazy", decoding: "async", className: "w-full h-auto object-contain" }) })] }) }), _jsx("div", { className: "flex justify-center pb-6 pt-1", children: _jsx("button", { onClick: () => scrollToSection('thumbnails'), className: "p-1.5 rounded-full text-gray-500 hover:text-white transition-colors animate-bounce", children: _jsx(ChevronDown, { size: 18 }) }) }), _jsx("section", { id: "thumbnails", className: "py-16 md:py-20 px-4 relative contain-layout", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "text-center mb-8 md:mb-10", children: [_jsx("h2", { className: "text-2xl md:text-3xl lg:text-4xl font-bold mb-3", children: "My Thumbnails" }), _jsx("p", { className: "text-gray-400 text-sm md:text-base max-w-xl mx-auto", children: "High-converting thumbnails designed to stop the scroll and drive clicks." })] }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4", children: PORTFOLIO_ITEMS.map((item) => (_jsxs("div", { onClick: () => setLightboxImage(item.image), className: "group relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-white/5", children: [_jsx("img", { src: item.image, alt: item.title, loading: "lazy", decoding: "async", className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" }), _jsxs("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3", children: [_jsx("p", { className: "text-xs font-semibold text-white", children: item.title }), _jsx("p", { className: "text-[10px] text-gray-300", children: item.client })] })] }, item.id))) })] }) }), _jsx(AnimatePresence, { children: lightboxImage && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 }, onClick: () => setLightboxImage(null), className: "fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer", children: [_jsx(motion.img, { initial: { scale: 0.95, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.95, opacity: 0 }, transition: { duration: 0.15 }, src: lightboxImage, alt: "", className: "max-w-full max-h-[85vh] object-contain rounded-xl", onClick: (e) => e.stopPropagation() }), _jsx("button", { onClick: () => setLightboxImage(null), className: "absolute top-5 right-5 p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors", children: _jsx(X, { size: 18 }) })] })) }), _jsx("section", { id: "about", className: "py-16 md:py-20 px-4 relative contain-layout", children: _jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-7", children: [_jsx(Sparkles, { size: 15, className: "text-purple-400" }), " ", _jsx("span", { className: "text-sm text-purple-400 font-medium", children: "About Me" })] }), _jsxs("h2", { className: "text-2xl md:text-3xl lg:text-4xl font-bold mb-7", children: ["The Mind Behind the ", _jsx("br", {}), _jsx("span", { className: "bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent", children: "Thumbnails" })] }), _jsxs("div", { className: "space-y-4 text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl mx-auto", children: [_jsxs("p", { children: ["Hey there! I'm ", _jsx("strong", { className: "text-white", children: "R4MO" }), ", a professional thumbnail designer who's helped over 150+ creators transform their click-through rates."] }), _jsx("p", { children: "I specialize in creating eye-catching, high-converting YouTube thumbnails that don't just look good \u2014 they perform. My designs combine psychology, color theory, and proven marketing principles." }), _jsx("p", { children: "With years of experience in digital design and a deep understanding of what makes viewers click, I've developed a unique style that balances creativity with conversion optimization." })] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-12 md:mt-14", children: [
                                { value: '150+', label: 'Happy Clients' },
                                { value: '1500+', label: 'Thumbnails Made' },
                                { value: '98%', label: 'Satisfaction Rate' },
                                { value: '5+', label: 'Years Experience' },
                            ].map((stat) => (_jsxs("div", { className: "group p-4 md:p-5 rounded-2xl bg-white text-black shadow-[0_4px_20px_rgba(255,255,255,0.08)] border border-white/80 hover:shadow-[0_6px_28px_rgba(255,255,255,0.14)] transition-all duration-250", children: [_jsx("div", { className: "text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent", children: stat.value }), _jsx("div", { className: "text-[11px] md:text-sm text-gray-500 mt-1 font-medium", children: stat.label })] }, stat.label))) })] }) }), _jsx("section", { id: "testimonials", className: "py-16 md:py-20 px-4 relative contain-layout", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "text-center mb-10 md:mb-14", children: [_jsx("h2", { className: "text-2xl md:text-3xl lg:text-4xl font-bold mb-3", children: "What Clients Say" }), _jsx("p", { className: "text-gray-400 text-sm md:text-base", children: "Real feedback from real creators" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5", children: TESTIMONIALS.map((t) => (_jsxs("div", { className: "p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group", children: [_jsx(Quote, { size: 24, className: "text-purple-500/30 mb-3" }), _jsx("p", { className: "text-gray-300 mb-5 leading-relaxed text-xs md:text-sm", children: t.content }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: t.avatar, alt: t.name, loading: "lazy", decoding: "async", className: "w-9 h-9 md:w-10 md:h-10 rounded-full object-cover ring-2 ring-purple-500/30" }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-white text-xs md:text-sm", children: t.name }), _jsx("p", { className: "text-[10px] md:text-xs text-gray-400", children: t.role })] })] }), _jsx("div", { className: "flex gap-1 mt-3", children: [...Array(5)].map((_, i) => _jsx(Star, { size: 12, className: "fill-yellow-400 text-yellow-400" }, i)) })] }, t.name))) })] }) }), _jsx("section", { id: "faq", className: "py-16 md:py-20 px-4 relative contain-layout", children: _jsxs("div", { className: "max-w-3xl mx-auto", children: [_jsxs("div", { className: "text-center mb-10 md:mb-14", children: [_jsx("h2", { className: "text-2xl md:text-3xl lg:text-4xl font-bold mb-3", children: "FAQ" }), _jsx("p", { className: "text-gray-400 text-sm md:text-base", children: "Got questions? I've got answers." })] }), _jsx("div", { className: "space-y-3", children: [
                                { q: 'How long does it take to get my thumbnails?', a: 'Typically 24-48 hours for standard orders. Rush delivery is available for an additional fee.' },
                                { q: 'How many revisions do I get?', a: 'Every package includes unlimited revisions until you\'re 100% satisfied with the result.' },
                                { q: 'What formats do you deliver?', a: 'I deliver in PNG (recommended), JPG, and PSD source files so you have full flexibility.' },
                                { q: 'Do you work with small channels?', a: 'Absolutely! I work with creators of all sizes — from new channels to established YouTubers with millions of subscribers.' },
                                { q: 'What makes your thumbnails different?', a: 'I combine design psychology, color theory, and proven CRO principles. Every element is intentional.' },
                            ].map((faq, index) => _jsx(FaqItem, { question: faq.q, answer: faq.a, index: index }, index)) })] }) }), _jsx("section", { id: "socials", className: "py-16 md:py-20 px-4 relative contain-layout", children: _jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [_jsxs("h2", { className: "text-2xl md:text-3xl lg:text-4xl font-bold mb-5", children: ["Let's Create Something", ' ', _jsx("span", { className: "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent", children: "Amazing" })] }), _jsx("p", { className: "text-gray-400 text-sm md:text-base mb-8 max-w-xl mx-auto", children: "Ready to transform your click-through rate? Let's talk about your next project." }), _jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 md:mb-14", children: [_jsx(LiquidGlassButton, { variant: "primary", href: INSTAGRAM_URL, icon: Mail, children: "Get In Touch" }), _jsx(LiquidGlassButton, { variant: "ghost", href: INSTAGRAM_URL, children: "View Pricing" })] }), _jsx("div", { className: "flex items-center justify-center gap-3", children: [{ icon: Youtube, href: YOUTUBE_URL }, { icon: Twitter, href: '#' }, { icon: Instagram, href: INSTAGRAM_URL }, { icon: Mail, href: INSTAGRAM_URL }].map((s) => (_jsx(motion.a, { href: "#", onClick: (e) => { e.preventDefault(); openLink(s.href); }, whileHover: { scale: 1.06 }, whileTap: { scale: 0.96 }, className: "group relative p-3 md:p-3.5 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] hover:border-white/20 transition-all duration-200", children: _jsx(s.icon, { size: 20, className: "text-gray-400 group-hover:text-white transition-colors" }) }, s.href))) })] }) }), _jsx("footer", { className: "py-7 px-4 border-t border-white/[0.05]", children: _jsxs("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4", children: [_jsxs("div", { className: "flex items-center gap-0.5", children: [_jsx("span", { className: "text-sm font-bold text-white", children: "R4" }), _jsx("span", { className: "text-sm font-black text-white", children: "MO" })] }), _jsxs("p", { className: "text-[11px] text-gray-500", children: ["\u00A9 ", new Date().getFullYear(), " R4MO. All rights reserved."] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("a", { href: "#", className: "text-[11px] text-gray-500 hover:text-white transition-colors", children: "Privacy" }), _jsx("a", { href: "#", className: "text-[11px] text-gray-500 hover:text-white transition-colors", children: "Terms" })] })] }) })] }));
}
/* FAQ Item */
function FaqItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);
    return (_jsxs("div", { className: "rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all", children: [_jsxs("button", { onClick: () => setIsOpen(!isOpen), className: "w-full flex items-center justify-between p-4 md:p-5 text-left", children: [_jsx("span", { className: "font-medium text-white pr-4 text-xs md:text-sm", children: question }), _jsx("span", { style: { transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }, className: "flex-shrink-0", children: _jsx(ChevronDown, { size: 16, className: "text-gray-400" }) })] }), isOpen && (_jsxs("div", { style: { animation: 'fadeIn 0.15s ease-out' }, children: [_jsx("style", { children: `@keyframes fadeIn{from{opacity:0}to{opacity:1}}` }), _jsx("p", { className: "px-4 md:px-5 pb-4 md:pb-5 text-gray-400 leading-relaxed text-xs md:text-sm", children: answer })] }))] }));
}
export default App;
