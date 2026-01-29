import type { Project } from '../data/projects';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="group flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-700/50 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 h-full"
        >
            {/* Image Section */}
            <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800">
                <a
                    href={project.liveUrl || project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 cursor-pointer"
                    aria-label={`View ${project.title}`}
                    tabIndex={-1} // Prevent double tab stops (card logic) - actually better to let it be focusable for keyboard users who want to just click the image
                >
                    {project.image ? (
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-gray-800/50">
                            No Preview
                        </div>
                    )}
                </a>

                {/* Desktop Overlay - stronger contrast */}
                <div className="hidden md:flex absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 items-center justify-center gap-4 backdrop-blur-[2px] pointer-events-none group-hover:pointer-events-auto">
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 bg-white text-gray-900 rounded-full hover:scale-110 transition-transform shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 cursor-pointer"
                        aria-label={`View ${project.title} code on GitHub`}
                    >
                        <Github size={22} />
                    </a>
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3.5 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform shadow-xl hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 cursor-pointer"
                            aria-label={`View live demo of ${project.title}`}
                        >
                            <ExternalLink size={22} />
                        </a>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col p-6 sm:p-7">
                <div className="mb-4">
                    <div className="flex justify-between items-start gap-4 mb-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 leading-tight">
                            <a
                                href={project.liveUrl || project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:underline decoration-2 decoration-blue-500 underline-offset-4 cursor-pointer"
                            >
                                {project.title}
                            </a>
                        </h3>

                        {/* Mobile Actions - Clearer buttons */}
                        <div className="flex md:hidden gap-3 shrink-0">
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
                                aria-label="GitHub"
                            >
                                <Github size={20} />
                            </a>
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
                                    aria-label="Live Demo"
                                >
                                    <ExternalLink size={20} />
                                </a>
                            )}
                        </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed line-clamp-3 font-medium">
                        {project.description}
                    </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-5 border-t border-gray-100 dark:border-gray-800">
                    {project.tech.map((t) => (
                        <span
                            key={t}
                            className="px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 rounded-full border border-gray-200 dark:border-gray-700/50"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
