import { useState } from 'react';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    // Extract unique categories (mocked logic or derived)
    const categories = ["All", "React", "Backend", "Full Stack"];

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.tech.some(t => t.includes(activeCategory) || (activeCategory === "Backend" && (t.includes("PHP") || t.includes("Laravel")))));

    return (
        <section id="projects" className="py-16 md:py-24 transition-colors duration-300 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center md:text-left w-full md:w-auto"
                    >
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2 block">
                            Portfolio
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
                            Selected Works
                        </h2>
                    </motion.div>

                    {/* Filter Buttons - horizontal scroll with snap */}
                    <div className="w-full md:w-auto overflow-x-auto pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                        <div className="flex gap-2 min-w-max md:justify-end bg-gray-100 dark:bg-gray-800/50 p-1.5 rounded-xl border border-gray-200 dark:border-gray-800 snap-x">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`snap-start px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 active:scale-95 cursor-pointer ${activeCategory === cat
                                        ? "bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-300 shadow-sm hover:shadow-md"
                                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {/* 'View All' Link */}
                <div className="flex justify-center">
                    <a
                        href="https://github.com/zaidBouallala-alb?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95 cursor-pointer"
                    >
                        View All Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;

