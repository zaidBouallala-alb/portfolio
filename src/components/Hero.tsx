import { Download, Github, Linkedin, Mail, Layout, ChevronDown, Code2, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import profileImage from '../assets/profile.jpg';
import { siteConfig } from '../data/site';

const Hero = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Added state for dropdown



    return (
        <section id="about" className="min-h-screen flex items-center justify-center pt-20 pb-16 md:pt-24 md:pb-32 relative overflow-hidden">
            {/* Background elements - unchanged */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(29,78,216,0.1),transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">

                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 md:space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                            </span>
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                Available for new projects
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="space-y-4"
                        >
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.15]">
                                Hi, I'm <br className="hidden lg:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                                    Zaid Bouallala
                                </span>
                            </h1>
                            <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-tertiary)] max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                                Full Stack Developer crafting exceptional digital experiences with modern technologies.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-center lg:justify-start"
                        >
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center px-8 py-3.5 text-base md:text-lg font-bold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                            >
                                <Layout className="w-5 h-5 mr-2" />
                                View Projects
                            </motion.a>

                            {/* Mobile CV Options (Download Direct or View) */}
                            <div className="flex md:hidden gap-3 w-full">
                                <a
                                    href={siteConfig.cv.english}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center px-4 py-3.5 text-base font-semibold text-[var(--text-primary)] bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl hover:bg-[var(--bg-secondary)] active:scale-95 transition-all"
                                >
                                    <Download className="w-5 h-5 mr-2" />
                                    EN CV
                                </a>
                                <a
                                    href={siteConfig.cv.french}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center px-4 py-3.5 text-base font-semibold text-[var(--text-primary)] bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl hover:bg-[var(--bg-secondary)] active:scale-95 transition-all"
                                >
                                    <Download className="w-5 h-5 mr-2" />
                                    FR CV
                                </a>
                            </div>

                            {/* Desktop CV Dropdown */}
                            <div className="hidden md:block relative z-50">
                                <motion.div
                                    onHoverStart={() => setIsDropdownOpen(true)}
                                    onHoverEnd={() => setIsDropdownOpen(false)}
                                    className="relative"
                                >
                                    <motion.a
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                        className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-bold text-[var(--text-primary)] bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl hover:bg-[var(--bg-secondary)] hover:border-gray-300 dark:hover:border-gray-600 transition-all shadow-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 cursor-default"
                                    >
                                        <Download className="w-5 h-5 mr-2" />
                                        Download CV
                                        <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                    </motion.a>

                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 w-full mt-2 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl shadow-xl overflow-hidden ring-1 ring-black/5"
                                            >
                                                <div className="py-1">
                                                    {/* Dropdown items unchanged logic, just colors */}
                                                    <a
                                                        href={siteConfig.cv.english}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                                                    >
                                                        <span className="text-lg">🇬🇧</span> English CV
                                                    </a>
                                                    <div className="h-px bg-[var(--border-primary)] mx-2" />
                                                    <a
                                                        href={siteConfig.cv.french}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                                                    >
                                                        <span className="text-lg">🇫🇷</span> French CV
                                                    </a>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex items-center justify-center lg:justify-start gap-4 pt-4"
                        >
                            {/* Social Links optimized */}
                            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="p-3 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-full transition-all hover:-translate-y-1 active:scale-90 focus:outline-none focus:ring-2 focus:ring-gray-400">
                                <Github size={24} />
                            </a>
                            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="p-3 text-[var(--text-tertiary)] hover:text-[#0077b5] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all hover:-translate-y-1 active:scale-90 focus:outline-none focus:ring-2 focus:ring-blue-400">
                                <Linkedin size={24} />
                            </a>
                            <a href={`mailto:${siteConfig.email}`} aria-label="Send Email" className="p-3 text-[var(--text-tertiary)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all hover:-translate-y-1 active:scale-90 focus:outline-none focus:ring-2 focus:ring-red-400">
                                <Mail size={24} />
                            </a>
                            <a href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="p-3 text-[var(--text-tertiary)] hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full transition-all hover:-translate-y-1 active:scale-90 focus:outline-none focus:ring-2 focus:ring-green-400">
                                <MessageCircle size={24} />
                            </a>
                        </motion.div>
                    </div>

                    {/* Image Section - Scaled for better proportion on mobile */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full lg:w-1/2 flex justify-center lg:justify-end mb-8 lg:mb-0"
                    >
                        {/* Image container content - mostly visual adjustments via containment */}
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]">
                            {/* Blobs remain the same */}
                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />

                            <div className="relative w-full h-full object-cover rounded-[2rem] p-4">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] rotate-6 opacity-20 blur-lg"></div>
                                <img
                                    src={profileImage}
                                    alt="Zaid Bouallala"
                                    fetchPriority="high"
                                    className="relative w-full h-full object-cover rounded-[2rem] shadow-2xl shadow-blue-500/10 border border-[var(--border-primary)] z-10"
                                />

                                {/* Glassmorphism Badge */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="absolute -bottom-6 -right-6 bg-[var(--bg-primary)]/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-[var(--border-primary)] z-20 flex items-center gap-4"
                                >
                                    <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
                                        <Code2 className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-0.5">Full Stack</span>
                                        <span className="text-sm sm:text-base font-bold text-[var(--text-primary)]">Developer</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
