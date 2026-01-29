import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about-section" className="py-16 md:py-20 transition-colors duration-300 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">
                        My Story
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-6 md:mb-8">
                        About Me
                    </h3>

                    <div className="space-y-4 md:space-y-6 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-medium">
                        <p>
                            I'm a passionate Full Stack Developer with a deep interest in building scalable, accessible, and performant web applications.
                            My journey in software development is driven by a curiosity to understand how things work under the hood and a desire to create
                            meaningful digital experiences.
                        </p>
                        <p>
                            I am constantly improving my skills in full-stack development, aiming to deliver high-quality software solutions
                            that solve complex problems.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
export default About;