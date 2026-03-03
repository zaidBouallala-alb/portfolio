import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-16 md:py-20 transition-colors duration-300 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2 block">
                        My Story
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-6 md:mb-8">
                        About Me – Full Stack Developer in Morocco
                    </h2>

                    <div className="space-y-4 md:space-y-6 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-medium">
                        <p>
                            I'm Zaid Bouallala, a Full Stack Developer based in Morocco, specializing in React, Laravel, and MySQL.
                            I design and build modern, scalable web applications that deliver fast performance, clean user interfaces,
                            and reliable backend architecture.
                        </p>
                        <p>
                            As a Full Stack Web Developer based in Morocco, I help businesses, startups, and individuals build
                            professional websites and custom web applications tailored to their specific goals.
                            My expertise includes JavaScript, TypeScript, PHP, RESTful APIs,
                            and database design using MySQL.
                        </p>
                        <p>
                            I focus on writing clean, maintainable code and developing SEO-friendly,
                            high-performance web applications that provide seamless user experiences across all devices.
                            Whether it's a portfolio website, business platform, or full-stack web solution,
                            I aim to deliver scalable and impactful digital products.
                        </p>


                    </div>
                </motion.div>
            </div>
        </section>
    );
};
export default About;