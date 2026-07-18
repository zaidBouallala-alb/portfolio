import { Download, Github, Mail, ChevronDown, ArrowRight, ArrowLeft, MessageCircle, Linkedin, Layers, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import profileImage from '../assets/profile.jpg';
import { siteConfig } from '../data/site';
import { useDir } from '../hooks/useDir';

/* ─── Tech stack badges ───────────────────────────────────────────── */
const STACK = [
  { label: 'React',    color: '#61DAFB', bg: 'rgba(97,218,251,0.10)' },
  { label: 'Laravel',  color: '#FF2D20', bg: 'rgba(255,45,32,0.10)'  },
  { label: 'Node.js',  color: '#68A063', bg: 'rgba(104,160,99,0.10)' },
  { label: 'MySQL',    color: '#00758F', bg: 'rgba(0,117,143,0.10)'  },
  { label: 'MongoDB',  color: '#47A248', bg: 'rgba(71,162,72,0.10)'  },
  { label: 'TypeScript', color: '#3178C6', bg: 'rgba(49,120,198,0.10)'},
];


/* ─── Typing hook ─────────────────────────────────────────────────── */
function useTyping(words: string[], langKey: string, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Reset only when language actually changes
  useEffect(() => {
    setWordIdx(0);
    setCharIdx(0);
    setDeleting(false);
    setDisplay('');
  }, [langKey]);

  useEffect(() => {
    const current = words[wordIdx];
    if (!current) return;
    if (!deleting && charIdx < current.length) {
      const id = setTimeout(() => setCharIdx(c => c + 1), speed);
      return () => clearTimeout(id);
    }
    if (!deleting && charIdx === current.length) {
      const id = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(id);
    }
    if (deleting && charIdx > 0) {
      const id = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
      return () => clearTimeout(id);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  useEffect(() => {
    const current = words[wordIdx];
    if (current) setDisplay(current.slice(0, charIdx));
  }, [charIdx, wordIdx, words]);

  return display;
}

/* ═══════════════════════════════════════════════════════════════════ */
const Hero = () => {
  const { t, i18n } = useTranslation();
  const { isRTL } = useDir();

  const roles = useMemo(
    () => t('hero.roles', { returnObjects: true }) as string[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18n.language]
  );
  const typedRole = useTyping(roles, i18n.language);

  /* fade-in variants (stable ref — no deps) */
  const fadeUp = useMemo(() => (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }), []);

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      id="hero"
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24"
    >
      {/* ── Multi-layer background ─────────────────────────────────── */}
      {/* Deep radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.18),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.22),transparent)]" />
      {/* Left accent */}
      <div className="pointer-events-none absolute -left-40 top-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
      {/* Right accent */}
      <div className="pointer-events-none absolute -right-40 top-1/3 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />
      {/* Bottom line separator */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-primary)] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col-reverse lg:flex-row gap-14 lg:gap-8 items-center justify-between">

          {/* ════════ Text side ════════════════════════════════════ */}
          <div className={`w-full lg:w-[52%] space-y-7 text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>

            {/* ── Status pill ───────────────────────────────────────── */}
            <motion.div {...fadeUp(0)} className={`inline-flex ${isRTL ? 'justify-end w-full lg:justify-end' : ''}`}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                bg-emerald-50 dark:bg-emerald-950/60
                border border-emerald-200 dark:border-emerald-800/60
                text-emerald-700 dark:text-emerald-400 text-sm font-semibold
                shadow-sm shadow-emerald-100 dark:shadow-emerald-950/40">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {t('hero.status')}
              </span>
            </motion.div>

            {/* ── Headline ──────────────────────────────────────────── */}
            <motion.div {...fadeUp(0.1)} className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight leading-[1.2] text-[var(--text-primary)]">
                {t('hero.headline1')}{' '}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 dark:from-indigo-400 dark:via-blue-400 dark:to-cyan-300">
                    {t('hero.headlineHighlight')}
                  </span>
                  {/* underline accent */}
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 opacity-60" />
                </span>
                <br />
                {t('hero.headline2')}
              </h1>

              {/* Typing role */}
              <p className="text-xl sm:text-2xl font-semibold text-[var(--text-secondary)] h-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-500 dark:from-blue-400 dark:to-violet-400">
                  {typedRole}
                </span>
                <span className="inline-block w-0.5 h-6 bg-blue-500 mx-0.5 align-middle animate-[blink_1s_step-end_infinite]" />
              </p>
            </motion.div>

            {/* ── Sub-copy ──────────────────────────────────────────── */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-base sm:text-lg text-[var(--text-tertiary)] max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {t('hero.intro')}{' '}
              <strong className="text-[var(--text-primary)] font-semibold">{t('hero.name')}</strong>{' '}
              {t('hero.introText')}{' '}
              <span className="text-[var(--text-secondary)] font-medium">{t('hero.introHighlight')}</span>{' '}
              {t('hero.introEnd')}
            </motion.p>

            {/* ── Tech stack badges ─────────────────────────────────── */}
            <motion.div
              {...fadeUp(0.25)}
              className={`flex flex-wrap gap-2 justify-center ${isRTL ? 'lg:justify-end' : 'lg:justify-start'}`}
            >
              {STACK.map((tech, i) => (
                <motion.span
                  key={tech.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border"
                  style={{
                    color: tech.color,
                    background: tech.bg,
                    borderColor: tech.color + '33',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: tech.color }}
                  />
                  {tech.label}
                </motion.span>
              ))}
            </motion.div>

            {/* ── CTAs ──────────────────────────────────────────────── */}
            <motion.div
              {...fadeUp(0.3)}
              className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-center ${isRTL ? 'lg:justify-end' : 'lg:justify-start'}`}
            >
              {/* Primary */}
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5
                  font-bold text-base text-white rounded-xl
                  bg-gradient-to-r from-indigo-600 to-blue-600
                  hover:from-indigo-500 hover:to-blue-500
                  shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50
                  transition-all duration-200"
              >
                {t('hero.viewWork')}
                <ArrowIcon className={`w-4 h-4 transition-transform ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </motion.a>

              {/* Secondary — Contact */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5
                  font-bold text-base rounded-xl border
                  text-[var(--text-primary)] border-[var(--border-secondary)]
                  bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)]
                  dark:hover:border-gray-600
                  transition-all duration-200 shadow-sm"
              >
                <Mail className="w-4 h-4" />
                {t('hero.contactMe')}
              </motion.a>

              {/* CV — language-aware single button */}
              {(() => {
                const cvMap: Record<string, string> = {
                  en: siteConfig.cv.english,
                  fr: siteConfig.cv.french,
                  es: siteConfig.cv.spanish,
                  ar: siteConfig.cv.arabic,
                };
                const lang = i18n.language.substring(0, 2);
                const cvUrl = cvMap[lang] || siteConfig.cv.english;
                return cvUrl ? (
                  <motion.a
                    href={cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5
                      font-bold text-base rounded-xl border
                      text-[var(--text-primary)] border-[var(--border-secondary)]
                      bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)]
                      dark:hover:border-gray-600
                      transition-all duration-200 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    {t('hero.downloadCv')}
                  </motion.a>
                ) : null;
              })()}
            </motion.div>

            {/* ── Social links ──────────────────────────────────────── */}
            <motion.div
              {...fadeUp(0.38)}
              className={`flex items-center gap-1 justify-center pt-1 ${isRTL ? 'lg:justify-end' : 'lg:justify-start'}`}
            >
              {[
                { href: siteConfig.social.github,    Icon: Github,        label: 'GitHub',    hover: 'hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]' },
                { href: siteConfig.social.linkedin,   Icon: Linkedin,      label: 'LinkedIn',  hover: 'hover:text-[#0077b5] hover:bg-blue-50 dark:hover:bg-blue-950/50' },
                { href: `mailto:${siteConfig.email}`, Icon: Mail,          label: 'Email',     hover: 'hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50' },
                { href: siteConfig.social.whatsapp,   Icon: MessageCircle, label: 'WhatsApp',  hover: 'hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/50' },
              ].map(({ href, Icon, label, hover }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.88 }}
                  className={`p-2.5 rounded-xl text-[var(--text-tertiary)] transition-all duration-150 ${hover}`}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ════════ Image side ══════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[44%] flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[22rem] md:h-[22rem] lg:w-[420px] lg:h-[420px]">

              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-blue-500/10 to-purple-500/20 blur-2xl animate-pulse" />

              {/* Rotating gradient border */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-indigo-500 via-blue-400 to-purple-500 opacity-20 blur-md" />

              {/* Card wrapper */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden
                border border-[var(--border-primary)] shadow-2xl shadow-indigo-500/10 z-10
                bg-[var(--bg-secondary)]">
                <img
                  src={profileImage}
                  alt="Zaid Bouallala — Full Stack Developer"
                  fetchPriority="high"
                  decoding="async"
                  width={420}
                  height={420}
                  className="w-full h-full object-cover"
                />
                {/* Subtle overlay gradient at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* ── Floating badge — top (stack) ──────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className={`absolute -top-4 ${isRTL ? '-right-4 lg:-right-8' : '-left-4 lg:-left-8'}
                  flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl z-20
                  bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl
                  border border-[var(--border-primary)]
                  shadow-xl shadow-black/10`}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 shadow-md shadow-indigo-500/30">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <div className="leading-none">
                  <p className="text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">{t('hero.stack')}</p>
                  <p className="text-xs font-bold text-[var(--text-primary)] mt-0.5">{t('hero.stackItems')}</p>
                </div>
              </motion.div>

              {/* ── Floating badge — bottom (name) ─────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                className={`absolute -bottom-4 ${isRTL ? '-left-4 lg:-left-8' : '-right-4 lg:-right-8'}
                  flex items-center gap-3 px-4 py-3 rounded-2xl z-20
                  bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl
                  border border-[var(--border-primary)]
                  shadow-xl shadow-black/10`}
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-xl
                  bg-gradient-to-br from-indigo-600 to-blue-600 shadow-md shadow-indigo-500/30">
                  <span className="text-white text-lg font-black">Z</span>
                </div>
                <div className="leading-none">
                  <p className="text-xs font-bold text-[var(--text-primary)]">{t('hero.name')}</p>
                  <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{t('hero.fullStackDev')}</p>
                </div>
              </motion.div>

              {/* ── Floating badge — side center (location) ──────── */}
              <motion.div
                initial={{ opacity: 0, x: isRTL ? -16 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75, duration: 0.5 }}
                className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? '-left-3 lg:-left-6' : '-right-3 lg:-right-6'}
                  flex flex-col items-center gap-1 px-2.5 py-2.5 rounded-2xl z-20
                  bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl
                  border border-[var(--border-primary)]
                  shadow-xl shadow-black/10`}
              >
                <MapPin className="w-4 h-4 text-rose-500" />
                <span className="text-[9px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider leading-none">
                  {t('hero.morocco')}
                </span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)] font-semibold">
          {t('hero.scroll')}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-[var(--text-tertiary)]" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
