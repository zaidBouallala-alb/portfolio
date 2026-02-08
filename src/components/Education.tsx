
import { motion } from 'framer-motion';
import { education } from '../data/education';
import { Calendar, Building2 } from 'lucide-react';

const Education = () => {
    return (
        <section id="education" className="py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">
                        My Journey
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)]">
                        Education & Training
                    </h3>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-blue-500/0 md:-translate-x-1/2" />

                    <div className="space-y-12">
                        {education.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg transform -translate-x-1/2 mt-1.5 z-10">
                                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20" />
                                </div>

                                {/* Content Card */}
                                <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                                    }`}>
                                    <div className="group relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800 p-6 rounded-2xl hover:border-blue-500/30 transition-colors duration-300">
                                        <div className={`flex items-center gap-2 mb-2 text-sm font-medium text-blue-600 dark:text-blue-400 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                                            }`}>
                                            <Calendar className="w-4 h-4" />
                                            <span>{item.year}</span>
                                        </div>

                                        <h4 className="text-xl font-bold text-[var(--text-primary)] mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {item.title}
                                        </h4>

                                        <div className={`flex items-center gap-2 mb-4 text-[var(--text-secondary)] font-medium ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                                            }`}>
                                            <Building2 className="w-4 h-4" />
                                            <span>{item.institution}</span>
                                        </div>

                                        <p className="text-[var(--text-tertiary)] leading-relaxed text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="hidden md:flex flex-1" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
