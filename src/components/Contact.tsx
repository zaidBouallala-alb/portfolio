import { Mail, Github, Linkedin, Send, ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteConfig } from '../data/site';

const Contact = () => {
    return (
        <section id="contact" className="py-16 md:py-24 transition-colors duration-300 relative z-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 md:mb-16 space-y-2"
                >
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">
                        Get in Touch
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)]">
                        Contact Me
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto font-medium pt-2">
                        I'm currently open to new opportunities. Whether you have a question or just want to say hi, feel free to reach out!
                    </p>
                </motion.div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {/* Email Card - Primary CTA */}
                    <motion.a
                        key="email"
                        href={`mailto:${siteConfig.email}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="group relative p-6 md:p-8 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-primary)] hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-400"
                    >
                        <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10 w-16 h-16 bg-[var(--bg-primary)] rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 ring-1 ring-gray-100 dark:ring-gray-800">
                            <Mail className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                        </div>

                        <h4 className="relative z-10 text-xl font-bold text-[var(--text-primary)] mb-2">
                            Email Me
                        </h4>
                        <p className="relative z-10 text-[var(--text-secondary)] mb-6 font-medium">
                            {siteConfig.email}
                        </p>

                        <span className="relative z-10 inline-flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-blue-400 group-hover:gap-3 transition-all">
                            Send Message <ArrowRight className="w-4 h-4" />
                        </span>
                    </motion.a>

                    {/* Social Links Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <motion.a
                            key="linkedin"
                            href={siteConfig.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="group relative z-10 p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-primary)] hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-400"
                        >
                            <div className="w-12 h-12 bg-[var(--bg-primary)] rounded-xl flex items-center justify-center mb-4 text-blue-700 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                <Linkedin className="w-6 h-6" />
                            </div>
                            <h5 className="font-bold text-[var(--text-primary)]">LinkedIn</h5>
                            <span className="text-sm text-[var(--text-tertiary)] mt-1 font-medium">Connect professionally</span>
                        </motion.a>

                        <motion.a
                            key="github"
                            href={siteConfig.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="group relative z-10 p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-primary)] hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-400"
                        >
                            <div className="w-12 h-12 bg-[var(--bg-primary)] rounded-xl flex items-center justify-center mb-4 text-[var(--text-primary)] group-hover:scale-110 transition-transform">
                                <Github className="w-6 h-6" />
                            </div>
                            <h5 className="font-bold text-[var(--text-primary)]">GitHub</h5>
                            <span className="text-sm text-[var(--text-tertiary)] mt-1 font-medium">Check my code</span>
                        </motion.a>

                        <motion.a
                            key="telegram"
                            href={siteConfig.social.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="group relative z-10 sm:col-span-2 p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-primary)] hover:border-sky-200 dark:hover:border-sky-900/50 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-400"
                        >
                            <div className="w-10 h-10 bg-[var(--bg-primary)] rounded-xl flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform">
                                <Send className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <h5 className="font-bold text-[var(--text-primary)]">Telegram</h5>
                                <span className="text-sm text-[var(--text-tertiary)] font-medium">Quick chat</span>
                            </div>
                        </motion.a>

                        <motion.a
                            key="whatsapp"
                            href={siteConfig.social.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="group relative z-10 sm:col-span-2 p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-primary)] hover:border-green-200 dark:hover:border-green-900/50 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 dark:focus-visible:ring-green-400"
                        >
                            <div className="w-10 h-10 bg-[var(--bg-primary)] rounded-xl flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                                <MessageCircle className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <h5 className="font-bold text-[var(--text-primary)]">WhatsApp</h5>
                                <span className="text-sm text-[var(--text-tertiary)] font-medium">Chat directly</span>
                            </div>
                        </motion.a>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Looking forward to hearing from you!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;