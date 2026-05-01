import { Download, Github, Mail, ChevronDown, ArrowRight, ExternalLink, MessageCircle, Linkedin, Layers, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import profileImage from '../assets/profile.jpg';
import { siteConfig } from '../data/site';

/* ─── Typing animation words ──────────────────────────────────────── */
const ROLES = [
  'Full Stack Developer',
  'React Specialist',
  'Laravel Developer',
  'Web App Builder',
  'UI/UX Enthusiast',
];

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
function useTyping(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), speed);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  useEffect(() => {
    setDisplay(words[wordIdx].slice(0, charIdx));
  }, [charIdx, wordIdx, words]);

  return display;
}

/* ═══════════════════════════════════════════════════════════════════ */
const Hero = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const typedRole = useTyping(ROLES);

  /* fade-in variants */
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      id="hero"
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
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-14 lg:gap-8">

          {/* ════════ LEFT — Text ════════════════════════════════════ */}
          <div className="w-full lg:w-[52%] text-center lg:text-left space-y-7">

            {/* ── Status pill ───────────────────────────────────────── */}
            <motion.div {...fadeUp(0)} className="inline-flex">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                bg-emerald-50 dark:bg-emerald-950/60
                border border-emerald-200 dark:border-emerald-800/60
                text-emerald-700 dark:text-emerald-400 text-sm font-semibold
                shadow-sm shadow-emerald-100 dark:shadow-emerald-950/40">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Open to opportunities · Remote &amp; On-site
              </span>
            </motion.div>

            {/* ── Headline ──────────────────────────────────────────── */}
            <motion.div {...fadeUp(0.1)} className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight leading-[1.1] text-[var(--text-primary)]">
                I turn ideas into{' '}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 dark:from-indigo-400 dark:via-blue-400 dark:to-cyan-300">
                    scalable
                  </span>
                  {/* underline accent */}
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 opacity-60" />
                </span>
                <br />
                web products.
              </h1>

              {/* Typing role */}
              <p className="text-xl sm:text-2xl font-semibold text-[var(--text-secondary)] h-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-500 dark:from-blue-400 dark:to-violet-400">
                  {typedRole}
                </span>
                <span className="inline-block w-0.5 h-6 bg-blue-500 ml-0.5 align-middle animate-[blink_1s_step-end_infinite]" />
              </p>
            </motion.div>

            {/* ── Sub-copy ──────────────────────────────────────────── */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-base sm:text-lg text-[var(--text-tertiary)] max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Hi, I'm <strong className="text-[var(--text-primary)] font-semibold">Zaid Bouallala</strong> —
              a full stack developer from Morocco who ships products that{' '}
              <span className="text-[var(--text-secondary)] font-medium">perform fast, scale cleanly, and look great.</span>{' '}
              From pixel-perfect UIs to robust APIs.
            </motion.p>

            {/* ── Tech stack badges ─────────────────────────────────── */}
            <motion.div
              {...fadeUp(0.25)}
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
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
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-center lg:justify-start"
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
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                Contact Me
              </motion.a>

              {/* Mobile: two CV buttons */}
              <div className="flex md:hidden gap-2 w-full">
                <a
                  href={siteConfig.cv.english}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3
                    text-sm font-semibold rounded-xl border
                    text-[var(--text-primary)] border-[var(--border-primary)]
                    bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)]
                    transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  EN CV
                </a>
                <a
                  href={siteConfig.cv.french}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3
                    text-sm font-semibold rounded-xl border
                    text-[var(--text-primary)] border-[var(--border-primary)]
                    bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)]
                    transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  FR CV
                </a>
              </div>

              {/* Desktop CV dropdown */}
              <div className="hidden md:block relative z-50">
                <motion.div
                  onHoverStart={() => setDropdownOpen(true)}
                  onHoverEnd={() => setDropdownOpen(false)}
                  className="relative"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-6 py-3.5
                      font-bold text-base rounded-xl border
                      text-[var(--text-primary)] border-[var(--border-secondary)]
                      bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)]
                      transition-all duration-200 shadow-sm cursor-default"
                  >
                    <Download className="w-4 h-4" />
                    Download CV
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </motion.button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 mt-2 w-full min-w-[160px]
                          bg-[var(--bg-primary)] border border-[var(--border-primary)]
                          rounded-xl shadow-2xl overflow-hidden ring-1 ring-black/5"
                      >
                        <a
                          href={siteConfig.cv.english}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium
                            text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]
                            hover:text-[var(--text-primary)] transition-colors"
                        >
                          <span className="text-base">🇬🇧</span> English CV
                          <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                        </a>
                        <div className="h-px bg-[var(--border-primary)] mx-2" />
                        <a
                          href={siteConfig.cv.french}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium
                            text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]
                            hover:text-[var(--text-primary)] transition-colors"
                        >
                          <span className="text-base">🇫🇷</span> French CV
                          <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>

            {/* ── Social links ──────────────────────────────────────── */}
            <motion.div
              {...fadeUp(0.38)}
              className="flex items-center gap-1 justify-center lg:justify-start pt-1"
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

          {/* ════════ RIGHT — Image ══════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
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

              {/* ── Floating badge — top-left ──────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="absolute -top-4 -left-4 lg:-left-8
                  flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl z-20
                  bg-[var(--bg-primary)]/90 backdrop-blur-xl
                  border border-[var(--border-primary)]
                  shadow-xl shadow-black/10"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 shadow-md shadow-indigo-500/30">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <div className="leading-none">
                  <p className="text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">Stack</p>
                  <p className="text-xs font-bold text-[var(--text-primary)] mt-0.5">React · Laravel · Node</p>
                </div>
              </motion.div>

              {/* ── Floating badge — bottom-right ─────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 lg:-right-8
                  flex items-center gap-3 px-4 py-3 rounded-2xl z-20
                  bg-[var(--bg-primary)]/90 backdrop-blur-xl
                  border border-[var(--border-primary)]
                  shadow-xl shadow-black/10"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-xl
                  bg-gradient-to-br from-indigo-600 to-blue-600 shadow-md shadow-indigo-500/30">
                  <span className="text-white text-lg font-black">Z</span>
                </div>
                <div className="leading-none">
                  <p className="text-xs font-bold text-[var(--text-primary)]">Zaid Bouallala</p>
                  <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Full Stack Developer</p>
                </div>
              </motion.div>

              {/* ── Floating badge — right-center ────────────────── */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75, duration: 0.5 }}
                className="absolute top-1/2 -translate-y-1/2 -right-3 lg:-right-6
                  flex flex-col items-center gap-1 px-2.5 py-2.5 rounded-2xl z-20
                  bg-[var(--bg-primary)]/90 backdrop-blur-xl
                  border border-[var(--border-primary)]
                  shadow-xl shadow-black/10"
              >
                <MapPin className="w-4 h-4 text-rose-500" />
                <span className="text-[9px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider leading-none">
                  Morocco
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
          Scroll
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
