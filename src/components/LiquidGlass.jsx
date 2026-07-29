import React, { useState, useEffect } from 'react';

// SVG Glass Distortion Filter - inline, reusable
export function GlassFilter() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        <filter
          id="liquid-glass-filter"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04 0.04"
            numOctaves="1"
            seed="2"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="1.5" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="1.5" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

// ─── Liquid Glass Button ────────────────────────────────────────────────────
export function LiquidButton({ children, onClick, icon, active = false, style = {}, size = 'md' }) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const sizeStyles = {
    sm: { padding: '0.45rem 0.9rem', fontSize: '0.75rem', borderRadius: '12px', minHeight: '36px' },
    md: { padding: '0.65rem 1.2rem', fontSize: '0.85rem', borderRadius: '14px', minHeight: '44px' },
    lg: { padding: '0.8rem 1.6rem', fontSize: '0.95rem', borderRadius: '16px', minHeight: '52px' },
    icon: { padding: '0.6rem', fontSize: '0.85rem', borderRadius: '14px', width: '44px', height: '44px' },
  };

  const s = sizeStyles[size] || sizeStyles.md;

  const glowColor = active ? 'rgba(0,242,254,0.5)' : isHovered ? 'rgba(0,242,254,0.25)' : 'rgba(0,242,254,0.1)';
  const borderColor = active ? 'rgba(0,242,254,0.6)' : isHovered ? 'rgba(0,242,254,0.35)' : 'rgba(255,255,255,0.14)';
  const bgColor = active
    ? 'rgba(0,242,254,0.12)'
    : isPressed
    ? 'rgba(0,242,254,0.08)'
    : isHovered
    ? 'rgba(255,255,255,0.08)'
    : 'rgba(255,255,255,0.04)';

  const transform = isPressed
    ? 'scale(0.96) translateY(1px)'
    : isHovered && !isTouchDevice
    ? 'scale(1.03) translateY(-1px)'
    : 'scale(1)';

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.45rem',
        background: bgColor,
        border: `1px solid ${borderColor}`,
        color: active ? '#00f2fe' : 'rgba(255,255,255,0.85)',
        fontFamily: '"Inter", system-ui, sans-serif',
        fontWeight: 600,
        cursor: 'pointer',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: `
          0 0 0 1px ${borderColor},
          inset 0 1px 0 rgba(255,255,255,0.12),
          inset 0 -1px 0 rgba(0,0,0,0.15),
          0 4px 16px ${glowColor},
          0 0 ${active ? '16px' : '6px'} ${glowColor}
        `,
        transform,
        transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
        outline: 'none',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        ...s,
        ...style,
      }}
    >
      {/* Inner glass shimmer overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '50%',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0) 100%)',
        borderRadius: `${s.borderRadius} ${s.borderRadius} 0 0`,
        pointerEvents: 'none',
      }} />

      {/* Liquid distortion layer */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        backdropFilter: 'url("#liquid-glass-filter")',
        WebkitBackdropFilter: 'url("#liquid-glass-filter")',
        borderRadius: s.borderRadius,
        pointerEvents: 'none',
        zIndex: -1,
      }} />

      {/* Active glow bar at bottom */}
      {active && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '20%',
          width: '60%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00f2fe, transparent)',
          borderRadius: '1px',
        }} />
      )}

      {icon && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>}
      {children && <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>}
    </button>
  );
}

// ─── Liquid Glass Panel ─────────────────────────────────────────────────────
export function LiquidPanel({ children, style = {}, className = '' }) {
  return (
    <div
      className={className}
      style={{
        background: 'rgba(12, 18, 35, 0.55)',
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px',
        boxShadow: `
          0 8px 32px rgba(0,0,0,0.4),
          inset 0 1px 0 rgba(255,255,255,0.1),
          inset 0 -1px 0 rgba(0,0,0,0.2)
        `,
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Top shimmer line */}
      <div style={{
        position: 'absolute',
        top: 0, left: '10%',
        width: '80%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        pointerEvents: 'none',
      }} />
      {children}
    </div>
  );
}

// ─── Liquid Glass Card ──────────────────────────────────────────────────────
export function LiquidCard({ children, style = {}, glowColor = null }) {
  const glow = glowColor || 'rgba(0,242,254,0.06)';
  return (
    <div style={{
      background: 'rgba(255,255,255,0.035)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '14px',
      padding: '0.85rem',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 12px ${glow}`,
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}>
      {children}
    </div>
  );
}
