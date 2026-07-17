import { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { siteConfig } from '../data/site';

const LANGUAGES = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
];

const Nav = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const desktopLangRef = useRef<HTMLDivElement>(null);
    const mobileLangRef = useRef<HTMLDivElement>(null);
    const currentLang = i18n.language.substring(0, 2);

    const changeLanguage = (code: string) => {
        i18n.changeLanguage(code);
        setLangOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close language dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            const clickedOutsideDesktop = !desktopLangRef.current || !desktopLangRef.current.contains(target);
            const clickedOutsideMobile = !mobileLangRef.current || !mobileLangRef.current.contains(target);
            if (clickedOutsideDesktop && clickedOutsideMobile) {
                setLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = siteConfig.navLinks;

    const currentLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
            ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800'
            : 'bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm supports-[backdrop-filter]:bg-white/20'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <a
                            href="#"
                            aria-label="Home"
                            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-400 dark:to-purple-400 hover:scale-105 transition-transform duration-300 cursor-pointer"
                        >
                            &lt;Zaid /&gt;
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex space-x-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 cursor-pointer"
                                >
                                    {t(link.name)}
                                </a>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-800">
                            <a
                                href={siteConfig.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg hover:-translate-y-0.5 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
                                aria-label="GitHub Profile"
                            >
                                <Github size={20} />
                            </a>
                            {/* Language Dropdown */}
                            <div ref={desktopLangRef} className="relative">
                                <button
                                    onClick={() => setLangOpen(!langOpen)}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer uppercase tracking-wider"
                                    aria-label="Change Language"
                                    aria-expanded={langOpen}
                                >
                                    <Globe size={16} />
                                    {currentLang.toUpperCase()}
                                    <ChevronDown size={12} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {langOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute top-full right-0 mt-2 w-40
                                                bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800
                                                rounded-xl shadow-2xl overflow-hidden ring-1 ring-black/5 z-50"
                                        >
                                            {LANGUAGES.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => changeLanguage(lang.code)}
                                                    className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer
                                                        ${currentLang === lang.code
                                                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white'
                                                        }`}
                                                >
                                                    <span className="text-base">{lang.flag}</span>
                                                    {lang.label}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden gap-3">
                        {/* Mobile Language Dropdown */}
                        <div ref={mobileLangRef} className="relative">
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
                                aria-label="Change Language"
                                aria-expanded={langOpen}
                            >
                                <Globe size={14} />
                                {currentLang.toUpperCase()}
                            </button>
                            <AnimatePresence>
                                {langOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute top-full right-0 mt-2 w-40
                                            bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800
                                            rounded-xl shadow-2xl overflow-hidden ring-1 ring-black/5 z-50"
                                    >
                                        {LANGUAGES.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => changeLanguage(lang.code)}
                                                className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer
                                                    ${currentLang === lang.code
                                                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white'
                                                    }`}
                                            >
                                                <span className="text-base">{lang.flag}</span>
                                                {lang.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors cursor-pointer"
                            aria-expanded={isOpen}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 shadow-xl transition-all duration-300">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="block px-4 py-4 rounded-xl text-lg font-medium text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all border border-transparent hover:border-gray-100 dark:hover:border-gray-800"
                                onClick={() => setIsOpen(false)}
                            >
                                {t(link.name)}
                            </a>
                        ))}
                        <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-center gap-8">
                            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all">
                                <Github size={28} />
                            </a>
                            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-all">
                                <Linkedin size={28} />
                            </a>
                            <a href={`mailto:${siteConfig.email}`} aria-label="Email Me" className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-all">
                                <Mail size={28} />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Nav;

