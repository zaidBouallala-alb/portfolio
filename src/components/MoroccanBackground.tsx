import React, { useEffect, useRef } from 'react';
import './MoroccanBackground.css';

/**
 * Moroccan-Inspired Interactive Background
 * Features mouse-reactive geometric patterns with:
 * - Proximity-based attraction/repulsion
 * - Click-triggered ripple explosions  
 * - Glowing cursor halo
 * - Ambient floating patterns
 * - Connection lines between nearby shapes
 * - Scroll-based pattern evolution
 */

export interface MoroccanBackgroundProps {
    /** Enable/disable the entire background animation (default: true) */
    enabled?: boolean;
    /** Base opacity of the canvas (0-1, default: 0.5) */
    opacity?: number;
    /** Enable mouse hover effects and cursor glow (default: true) */
    mouseEffects?: boolean;
    /** Enable scroll-based color and pattern evolution (default: true) */
    scrollEffects?: boolean;
    /** Enable click ripple explosions (default: true) */
    clickEffects?: boolean;
    /** Show connection lines between nearby shapes (default: true) */
    showConnections?: boolean;
    /** Maximum number of shapes on screen (default: 60) */
    maxShapes?: number;
    /** Mouse attraction radius in pixels (default: 200) */
    attractionRadius?: number;
    /** Mouse repulsion radius in pixels (default: 80) */
    repulsionRadius?: number;
    /** Shape spawn rate on mouse move (0-1, default: 0.25) */
    trailSpawnRate?: number;
}

// Moroccan color palette - Traditional colors inspired by zellige tiles,
// Majorelle gardens, Marrakech medinas, and Andalusian architecture
const MOROCCAN_PALETTE = {
    dark: {
        // Deep but vibrant blues for visibility against dark bg
        blues: ['#2563EB', '#3B82F6', '#1D4ED8', '#60A5FA'],
        // Luminous emeralds
        greens: ['#059669', '#10B981', '#34D399', '#047857'],
        // Rich warm spices
        golds: ['#D97706', '#F59E0B', '#FBBF24', '#B45309'],
        // Intense terracotta
        terracotta: ['#EA580C', '#F97316', '#C2410C', '#DC2626'],
        // Vivid teals
        teals: ['#0D9488', '#14B8A6', '#2DD4BF', '#0F766E'],
        // Royal purples
        purples: ['#7C3AED', '#8B5CF6', '#A78BFA', '#6D28D9'],
        // Accents that pop
        accent: ['#BFDBFE', '#FEF3C7', '#A7F3D0', '#E9D5FF']
    },
    light: {
        // Clear sky blues that don't get lost on white
        blues: ['#2563EB', '#3B82F6', '#60A5FA', '#1D4ED8'],
        // Fresh contrasting greens
        greens: ['#059669', '#10B981', '#34D399', '#047857'],
        // Deep golds (avoiding pale yellows)
        golds: ['#D97706', '#F59E0B', '#B45309', '#FBBF24'],
        // Warm terracotta
        terracotta: ['#EA580C', '#F97316', '#C2410C', '#DC2626'],
        // Sharp teals
        teals: ['#0D9488', '#14B8A6', '#0F766E', '#115E59'],
        // Deep lavenders
        purples: ['#7C3AED', '#8B5CF6', '#6D28D9', '#5B21B6'],
        // Accents
        accent: ['#1E40AF', '#B45309', '#0F766E', '#6D28D9']
    }
};

interface GeometricShape {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    size: number;
    baseSize: number;
    rotation: number;
    rotationSpeed: number;
    color: string;
    age: number;
    maxAge: number;
    velocity: { x: number; y: number };
    pattern: 'star' | 'hexagon' | 'diamond' | 'zellige' | 'arabesque';
    isAmbient: boolean;
    pulsePhase: number;
}

interface Ripple {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    opacity: number;
    color: string;
}

export const MoroccanBackground: React.FC<MoroccanBackgroundProps> = ({
    enabled = true,
    opacity = 0.5,
    mouseEffects = true,
    scrollEffects = true,
    clickEffects = true,
    showConnections = true,
    maxShapes = 60,
    attractionRadius: propAttractionRadius = 200,
    repulsionRadius: propRepulsionRadius = 80,
    trailSpawnRate = 0.25,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shapesRef = useRef<GeometricShape[]>([]);
    const ripplesRef = useRef<Ripple[]>([]);
    const mouseRef = useRef<{ x: number; y: number; isActive: boolean }>({ x: -1000, y: -1000, isActive: false });
    const animationRef = useRef<number>(0);
    const timeRef = useRef<number>(0);
    const scrollRef = useRef<{ y: number; velocity: number; progress: number }>({ y: 0, velocity: 0, progress: 0 });
    const lastScrollY = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (window.innerWidth < 768) return;
        if (!enabled) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initAmbientShapes();
        };

        const isDarkMode = () => document.documentElement.classList.contains('dark');

        // Get scroll progress (0-1) based on document height
        const getScrollProgress = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            return maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;
        };

        // Evolving color based on scroll depth - cycles through all Moroccan color families
        const getScrollColor = () => {
            const progress = scrollRef.current.progress;
            const isDark = isDarkMode();
            const darkP = MOROCCAN_PALETTE.dark;
            const lightP = MOROCCAN_PALETTE.light;

            // Progress through color families: blues -> teals -> greens -> golds -> terracotta -> purples
            if (progress < 0.17) {
                const colors = isDark ? darkP.blues : lightP.blues;
                return colors[Math.floor(Math.random() * colors.length)];
            } else if (progress < 0.33) {
                const colors = isDark ? darkP.teals : lightP.teals;
                return colors[Math.floor(Math.random() * colors.length)];
            } else if (progress < 0.5) {
                const colors = isDark ? darkP.greens : lightP.greens;
                return colors[Math.floor(Math.random() * colors.length)];
            } else if (progress < 0.67) {
                const colors = isDark ? darkP.golds : lightP.golds;
                return colors[Math.floor(Math.random() * colors.length)];
            } else if (progress < 0.83) {
                const colors = isDark ? darkP.terracotta : lightP.terracotta;
                return colors[Math.floor(Math.random() * colors.length)];
            } else {
                const colors = isDark ? darkP.purples : lightP.purples;
                return colors[Math.floor(Math.random() * colors.length)];
            }
        };

        const getRandomColor = () => {
            // 50% chance to use scroll-based color, 50% random from full palette
            if (Math.random() < 0.5) {
                return getScrollColor();
            }
            const isDark = isDarkMode();
            const p = isDark ? MOROCCAN_PALETTE.dark : MOROCCAN_PALETTE.light;
            const warmColors = isDark ? MOROCCAN_PALETTE.dark.golds : MOROCCAN_PALETTE.light.golds;
            const allColors = [
                ...p.blues,
                ...p.teals,
                ...p.greens,
                ...warmColors,
                ...p.terracotta,
                ...p.purples
            ];
            return allColors[Math.floor(Math.random() * allColors.length)];
        };

        // Pattern complexity increases with scroll
        const getPatterns = (): GeometricShape['pattern'][] => {
            const progress = scrollRef.current.progress;
            // Start simple, add complexity as user scrolls
            if (progress < 0.25) {
                return ['diamond', 'hexagon'];
            } else if (progress < 0.5) {
                return ['diamond', 'hexagon', 'star'];
            } else if (progress < 0.75) {
                return ['star', 'hexagon', 'zellige'];
            }
            return ['star', 'hexagon', 'diamond', 'zellige', 'arabesque'];
        };

        // Initialize ambient floating shapes
        const initAmbientShapes = () => {
            shapesRef.current = [];
            const numAmbient = Math.floor((canvas.width * canvas.height) / 80000);

            for (let i = 0; i < numAmbient; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const patterns = getPatterns();

                shapesRef.current.push({
                    x, y, baseX: x, baseY: y,
                    size: 15 + Math.random() * 25,
                    baseSize: 15 + Math.random() * 25,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.02,
                    color: getRandomColor(),
                    age: 0,
                    maxAge: Infinity,
                    velocity: { x: (Math.random() - 0.5) * 0.3, y: (Math.random() - 0.5) * 0.3 },
                    pattern: patterns[Math.floor(Math.random() * patterns.length)],
                    isAmbient: true,
                    pulsePhase: Math.random() * Math.PI * 2
                });
            }
        };

        resizeCanvas();

        // Mouse tracking with smooth interpolation
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY, isActive: true };

            // Spawn trail shapes on movement
            if (mouseEffects && Math.random() > (1 - trailSpawnRate)) {
                const patterns = getPatterns();
                shapesRef.current.push({
                    x: e.clientX + (Math.random() - 0.5) * 30,
                    y: e.clientY + (Math.random() - 0.5) * 30,
                    baseX: e.clientX,
                    baseY: e.clientY,
                    size: 15 + Math.random() * 35,
                    baseSize: 15 + Math.random() * 35,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.04,
                    color: getRandomColor(),
                    age: 0,
                    maxAge: 100 + Math.random() * 60,
                    velocity: { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 },
                    pattern: patterns[Math.floor(Math.random() * patterns.length)],
                    isAmbient: false,
                    pulsePhase: 0
                });
            }
        };

        // Click creates ripple explosion
        const handleClick = (e: MouseEvent) => {
            if (!clickEffects) return;
            const numShapes = 8 + Math.floor(Math.random() * 5);
            const patterns = getPatterns();

            // Create expanding ripple
            ripplesRef.current.push({
                x: e.clientX,
                y: e.clientY,
                radius: 0,
                maxRadius: 200 + Math.random() * 100,
                opacity: 0.6,
                color: getRandomColor()
            });

            // Spawn burst of shapes
            for (let i = 0; i < numShapes; i++) {
                const angle = (Math.PI * 2 * i) / numShapes + Math.random() * 0.3;
                const speed = 3 + Math.random() * 4;

                shapesRef.current.push({
                    x: e.clientX,
                    y: e.clientY,
                    baseX: e.clientX,
                    baseY: e.clientY,
                    size: 25 + Math.random() * 40,
                    baseSize: 25 + Math.random() * 40,
                    rotation: angle,
                    rotationSpeed: (Math.random() - 0.5) * 0.08,
                    color: getRandomColor(),
                    age: 0,
                    maxAge: 80 + Math.random() * 40,
                    velocity: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
                    pattern: patterns[Math.floor(Math.random() * patterns.length)],
                    isAmbient: false,
                    pulsePhase: 0
                });
            }
        };

        const handleMouseLeave = () => {
            mouseRef.current.isActive = false;
        };

        // Scroll handler for pattern evolution
        const handleScroll = () => {
            if (!scrollEffects) return;
            const currentY = window.scrollY;
            const velocity = currentY - lastScrollY.current;
            lastScrollY.current = currentY;

            scrollRef.current = {
                y: currentY,
                velocity: velocity,
                progress: getScrollProgress()
            };

            // Spawn shapes on significant scroll
            if (Math.abs(velocity) > 15) {
                const numShapes = Math.min(3, Math.floor(Math.abs(velocity) / 20));
                const patterns = getPatterns();

                for (let i = 0; i < numShapes; i++) {
                    const x = Math.random() * canvas.width;
                    const y = velocity > 0 ? canvas.height + 20 : -20;
                    const speed = Math.abs(velocity) * 0.1;

                    shapesRef.current.push({
                        x, y,
                        baseX: x,
                        baseY: y,
                        size: 20 + Math.random() * 30,
                        baseSize: 20 + Math.random() * 30,
                        rotation: Math.random() * Math.PI * 2,
                        rotationSpeed: (Math.random() - 0.5) * 0.06,
                        color: getScrollColor(),
                        age: 0,
                        maxAge: 120 + Math.random() * 60,
                        velocity: {
                            x: (Math.random() - 0.5) * 2,
                            y: velocity > 0 ? -speed : speed
                        },
                        pattern: patterns[Math.floor(Math.random() * patterns.length)],
                        isAmbient: false,
                        pulsePhase: 0
                    });
                }
            }
        };

        if (mouseEffects) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseleave', handleMouseLeave);
        }
        if (clickEffects) {
            window.addEventListener('click', handleClick);
        }
        if (scrollEffects) {
            window.addEventListener('scroll', handleScroll, { passive: true });
        }
        window.addEventListener('resize', resizeCanvas);

        const themeObserver = new MutationObserver(() => {
            shapesRef.current.forEach(shape => {
                if (shape.isAmbient) shape.color = getRandomColor();
            });
        });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        // Drawing functions
        const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
            const points = 8;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.beginPath();
            for (let i = 0; i < points * 2; i++) {
                const radius = i % 2 === 0 ? size : size * 0.5;
                const angle = (Math.PI / points) * i;
                const px = Math.cos(angle) * radius;
                const py = Math.sin(angle) * radius;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        };

        const drawHexagon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                const px = Math.cos(angle) * size;
                const py = Math.sin(angle) * size;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        };

        const drawDiamond = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(size * 0.6, 0);
            ctx.lineTo(0, size);
            ctx.lineTo(-size * 0.6, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        };

        const drawZellige = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            const currentFill = ctx.fillStyle;
            for (let i = 0; i < 3; i++) {
                const s = size * (1 - i * 0.25);
                ctx.strokeStyle = currentFill as string;
                ctx.lineWidth = 2;
                ctx.globalAlpha *= (1 - i * 0.25);
                ctx.strokeRect(-s / 2, -s / 2, s, s);
            }
            ctx.restore();
        };

        const drawArabesque = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.beginPath();
            // Flower-like arabesque pattern
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                const cx = Math.cos(angle) * size * 0.5;
                const cy = Math.sin(angle) * size * 0.5;
                ctx.moveTo(0, 0);
                ctx.quadraticCurveTo(cx + size * 0.3, cy, cx, cy);
                ctx.quadraticCurveTo(cx - size * 0.3, cy, 0, 0);
            }
            ctx.fill();
            // Inner detail
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        };

        const drawShape = (ctx: CanvasRenderingContext2D, shape: GeometricShape, opacity: number) => {
            ctx.globalAlpha = opacity;
            ctx.fillStyle = shape.color;

            switch (shape.pattern) {
                case 'star': drawStar(ctx, shape.x, shape.y, shape.size, shape.rotation); break;
                case 'hexagon': drawHexagon(ctx, shape.x, shape.y, shape.size, shape.rotation); break;
                case 'diamond': drawDiamond(ctx, shape.x, shape.y, shape.size, shape.rotation); break;
                case 'zellige': drawZellige(ctx, shape.x, shape.y, shape.size, shape.rotation); break;
                case 'arabesque': drawArabesque(ctx, shape.x, shape.y, shape.size, shape.rotation); break;
            }
            ctx.globalAlpha = 1;
        };

        // Draw cursor glow halo
        const drawCursorGlow = (ctx: CanvasRenderingContext2D) => {
            if (!mouseRef.current.isActive) return;

            const { x, y } = mouseRef.current;
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 150);
            const glowColor = isDarkMode() ? 'rgba(251, 191, 36,' : 'rgba(59, 130, 246,';

            gradient.addColorStop(0, `${glowColor} 0.15)`);
            gradient.addColorStop(0.5, `${glowColor} 0.05)`);
            gradient.addColorStop(1, `${glowColor} 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(x - 150, y - 150, 300, 300);
        };

        // Draw connection lines between nearby shapes - color evolves with scroll
        const drawConnections = (ctx: CanvasRenderingContext2D) => {
            const progress = scrollRef.current.progress;
            const connectionDistance = 120 + progress * 60; // Connections grow with scroll
            const shapes = shapesRef.current;

            // Connection color evolves: blue -> green -> gold with scroll
            let connectionColor: string;
            if (isDarkMode()) {
                if (progress < 0.33) connectionColor = 'rgba(59, 130, 246, 0.12)';
                else if (progress < 0.66) connectionColor = 'rgba(16, 185, 129, 0.12)';
                else connectionColor = 'rgba(251, 191, 36, 0.12)';
            } else {
                if (progress < 0.33) connectionColor = 'rgba(30, 58, 138, 0.08)';
                else if (progress < 0.66) connectionColor = 'rgba(4, 120, 87, 0.08)';
                else connectionColor = 'rgba(217, 119, 6, 0.08)';
            }

            ctx.strokeStyle = connectionColor;
            ctx.lineWidth = 1 + progress; // Lines get thicker with scroll

            for (let i = 0; i < shapes.length; i++) {
                for (let j = i + 1; j < shapes.length; j++) {
                    const dx = shapes[i].x - shapes[j].x;
                    const dy = shapes[i].y - shapes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.globalAlpha = (1 - dist / connectionDistance) * (0.3 + progress * 0.2);
                        ctx.beginPath();
                        ctx.moveTo(shapes[i].x, shapes[i].y);
                        ctx.lineTo(shapes[j].x, shapes[j].y);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1;
        };

        // Animation loop
        const animate = () => {
            if (!ctx || !canvas) return;
            timeRef.current++;

            const progress = scrollRef.current.progress;
            const scrollVelocity = scrollRef.current.velocity;

            // Evolving gradient background based on scroll progress
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

            if (isDarkMode()) {
                // Dark mode: deep blue -> teal -> warm amber as you scroll
                if (progress < 0.33) {
                    gradient.addColorStop(0, '#0F172A');
                    gradient.addColorStop(1, '#1E293B');
                } else if (progress < 0.66) {
                    gradient.addColorStop(0, '#0F172A');
                    gradient.addColorStop(0.5, '#134E4A');
                    gradient.addColorStop(1, '#1E293B');
                } else {
                    gradient.addColorStop(0, '#1E293B');
                    gradient.addColorStop(0.5, '#451A03');
                    gradient.addColorStop(1, '#0F172A');
                }
            } else {
                // Light mode: cool slate -> sage green -> warm cream
                if (progress < 0.33) {
                    gradient.addColorStop(0, '#F8FAFC');
                    gradient.addColorStop(1, '#E2E8F0');
                } else if (progress < 0.66) {
                    gradient.addColorStop(0, '#F0FDF4');
                    gradient.addColorStop(0.5, '#ECFDF5');
                    gradient.addColorStop(1, '#F8FAFC');
                } else {
                    gradient.addColorStop(0, '#FFFBEB');
                    gradient.addColorStop(0.5, '#FEF3C7');
                    gradient.addColorStop(1, '#F8FAFC');
                }
            }

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw cursor glow
            drawCursorGlow(ctx);

            // Update and draw ripples (in-place modification)
            for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
                const ripple = ripplesRef.current[i];
                ripple.radius += 8;
                ripple.opacity -= 0.015;

                if (ripple.opacity <= 0) {
                    ripplesRef.current.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                ctx.strokeStyle = ripple.color;
                ctx.lineWidth = 3;
                ctx.globalAlpha = ripple.opacity;
                ctx.stroke();
                ctx.globalAlpha = 1;
            }

            // Draw connections
            if (showConnections) {
                drawConnections(ctx);
            }

            // Update and draw shapes
            const mouseX = mouseRef.current.x;
            const mouseY = mouseRef.current.y;
            const attractionRadius = propAttractionRadius;
            const repulsionRadius = propRepulsionRadius;
            const isMouseActive = mouseRef.current.isActive;

            // In-place update for shapes to avoid iterator creation overhead
            for (let i = shapesRef.current.length - 1; i >= 0; i--) {
                const shape = shapesRef.current[i];

                // Age non-ambient shapes
                if (!shape.isAmbient) {
                    shape.age++;
                    if (shape.age >= shape.maxAge) {
                        shapesRef.current.splice(i, 1);
                        continue;
                    }
                }

                // Mouse proximity effects
                if (mouseEffects && isMouseActive) {
                    const dx = mouseX - shape.x;
                    const dy = mouseY - shape.y;
                    // Cheap distance check first
                    if (Math.abs(dx) < attractionRadius && Math.abs(dy) < attractionRadius) {
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < attractionRadius && dist > 0) {
                            const force = (attractionRadius - dist) / attractionRadius;

                            if (dist < repulsionRadius) {
                                // Repulsion
                                const repelForce = (repulsionRadius - dist) / repulsionRadius * 2;
                                shape.velocity.x -= (dx / dist) * repelForce;
                                shape.velocity.y -= (dy / dist) * repelForce;
                                shape.size = shape.baseSize * (1 + force * 0.5);
                                shape.rotationSpeed = (Math.random() - 0.5) * 0.1;
                            } else {
                                // Attraction
                                shape.velocity.x += (dx / dist) * force * 0.3;
                                shape.velocity.y += (dy / dist) * force * 0.3;
                            }
                            shape.size = shape.baseSize * (1 + force * 0.3);
                        } else {
                            shape.size += (shape.baseSize - shape.size) * 0.05;
                        }
                    } else {
                        shape.size += (shape.baseSize - shape.size) * 0.05;
                    }
                }

                // Apply velocity
                shape.x += shape.velocity.x;
                shape.y += shape.velocity.y;
                shape.velocity.x *= 0.98;
                shape.velocity.y *= 0.98;
                shape.rotation += shape.rotationSpeed;

                // Ambient shapes behavior
                if (shape.isAmbient) {
                    shape.pulsePhase += 0.02 + progress * 0.03;
                    const pulse = Math.sin(shape.pulsePhase) * (0.1 + progress * 0.15);
                    shape.size = shape.baseSize * (1 + pulse);

                    shape.velocity.y -= scrollVelocity * 0.01;

                    // Wrap around
                    if (shape.x < -50) shape.x = canvas.width + 50;
                    if (shape.x > canvas.width + 50) shape.x = -50;
                    if (shape.y < -50) shape.y = canvas.height + 50;
                    if (shape.y > canvas.height + 50) shape.y = -50;

                    // Drift
                    const driftStrength = Math.abs(scrollVelocity) > 5 ? 0.0001 : 0.0003;
                    shape.velocity.x += (shape.baseX - shape.x) * driftStrength;
                    shape.velocity.y += (shape.baseY - shape.y) * driftStrength;

                    shape.rotationSpeed = shape.rotationSpeed * 0.99 + (progress * 0.01) * (Math.random() > 0.5 ? 1 : -1);
                }

                // Draw
                let opacity = shape.isAmbient ? 0.4 : Math.max(0, 1 - shape.age / shape.maxAge) * 0.7;

                if (mouseEffects && isMouseActive) {
                    const dx = mouseX - shape.x;
                    const dy = mouseY - shape.y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < attractionRadius * attractionRadius) {
                        opacity = Math.min(1, opacity + (1 - Math.sqrt(distSq) / attractionRadius) * 0.3);
                    }
                }

                drawShape(ctx, shape, opacity);
            }

            // Limit shapes by removing oldest non-ambient from the beginning of the non-ambient segment
            // (Simpler heuristic: just limit total length by shifting from middle if needed, but the above splicing handles age)
            // Keeping strict max limit for safety:
            if (shapesRef.current.length > maxShapes + 20) { // Buffer of 20
                // Be careful not to remove ambient shapes.
                // This simple check prevents memory leaks if something goes wrong
                const overage = shapesRef.current.length - maxShapes;
                // Find indices of non-ambient shapes
                let removedCount = 0;
                for (let i = 0; i < shapesRef.current.length && removedCount < overage; i++) {
                    if (!shapesRef.current[i].isAmbient) {
                        shapesRef.current.splice(i, 1);
                        i--;
                        removedCount++;
                    }
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', resizeCanvas);
            themeObserver.disconnect();
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [enabled, mouseEffects, clickEffects, scrollEffects, showConnections, maxShapes, propAttractionRadius, propRepulsionRadius, trailSpawnRate]);

    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.style.setProperty('--canvas-opacity', opacity.toString());
        }
    }, [opacity]);



    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-auto z-0 hidden md:block moroccan-background-canvas`}

        />
    );
};