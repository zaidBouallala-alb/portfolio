import { Database, Layout, Wrench, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import { skillsData } from '../data/skills';

// Helper to get icon
const getIcon = (title: string) => {
    if (title.includes("Frontend")) return Layout;
    if (title.includes("Backend")) return Server;
    if (title.includes("Databases")) return Database;
    return Wrench;
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
};

const Skills = () => {
    return (
        <section id="skills" className="py-16 md:py-24 transition-colors duration-300 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">
                        Expertise
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-4">
                        Technical Skills
                    </h3>
                    <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto font-medium">
                        A comprehensive toolkit of modern technologies I use to build robust applications.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {skillsData.map((category) => {
                        const Icon = getIcon(category.title);
                        return (
                            <motion.div
                                key={category.title}
                                variants={itemVariants}
                                className="bg-[var(--bg-primary)] rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-[var(--border-primary)] group"
                                whileHover={{ y: -5 }}
                            >
                                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-blue-700 dark:text-blue-400">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                                    {category.title}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2.5 py-1 text-xs font-semibold text-[var(--text-tertiary)] bg-[var(--bg-tertiary)] rounded-md border border-[var(--border-secondary)]"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
