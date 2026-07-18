import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDir } from '../hooks/useDir';

const About = () => {
    const { t } = useTranslation();
    const { isRTL } = useDir();

    return (
        <section id="about" dir={isRTL ? 'rtl' : 'ltr'} className="py-16 md:py-20 transition-colors duration-300 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2 block">
                        {t('about.label')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-6 md:mb-8">
                        {t('about.title')}
                    </h2>

                    <div className="space-y-4 md:space-y-6 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-medium text-right" style={{ textAlign: isRTL ? 'right' : 'center' }}>
                        <p>{t('about.p1')}</p>
                        <p>{t('about.p2')}</p>
                        <p>{t('about.p3')}</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
export default About;