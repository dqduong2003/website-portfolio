import { useRef, useState, useMemo, useCallback, useEffect, useLayoutEffect } from 'react';
import { motion } from 'motion/react';

/*
 * Vendored from https://framer.com/m/VelocityCarousel-3vwMG9.js@GkP8ANqvz64OVfZmUPjy
 * Framer-canvas-only bits (the `framer` package: addPropertyControls / ControlType /
 * useIsStaticRenderer) were stripped since they don't exist outside the Framer editor.
 * `framer-motion` was swapped for the local `motion` package (same API, already a
 * project dependency). Added `cardAspectRatio` (upstream hardcodes square cards) and
 * left-aligned card content to match this site's design.
 */

const DEFAULT_IMAGE = 'https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg';
const DEFAULT_CARDS = [
  { image: { src: DEFAULT_IMAGE, alt: 'Innovation' }, headline: 'Innovation', text: 'Discover cutting-edge solutions.', buttonText: 'Explore', buttonLink: '#' },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function getFrameNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : undefined;
}

export default function VelocityCarousel(props) {
  const {
    cards = DEFAULT_CARDS,
    cardAspectRatio = 1,
    minCardWidth = 300,
    maxCardWidth = 380,
    desktopWidthFactor = 0.32,
    desktopHeightFactor = 0.74,
    activeCardScale = 1,
    inactiveCardScale = 0.86,
    mobileCardScale = 0.78,
    mobileOverlap = 0.12,
    cardGap = 184,
    desktopContentPadding = 28,
    borderRadius = 40,
    borderWidth = 10,
    overlayColor = '#000000',
    overlayOpacity = 0.42,
    shadowIntensity = 0.3,
    animationSpeed = 0.5,
    headlineFont,
    textFont,
    buttonFont,
    headlineColor = '#FFFFFF',
    textColor = '#FFFFFF',
    buttonBackground = '#FFFFFF',
    buttonTextColor = '#000000',
    indicatorColor = '#111111',
    indicatorInactiveOpacity = 0.28,
    backgroundColor = '#F5F5F5',
    style,
  } = props;

  const containerRef = useRef(null);
  const styleWidth = getFrameNumber(style?.width);
  const styleHeight = getFrameNumber(style?.height);
  const [frameSize, setFrameSize] = useState({ width: styleWidth ?? 1200, height: styleHeight ?? 800 });
  const safeCards = cards?.length ? cards : DEFAULT_CARDS;
  const [activeIndex, setActiveIndex] = useState(() => Math.floor(safeCards.length / 2));
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      setFrameSize({ width: rect.width || styleWidth || 1200, height: rect.height || styleHeight || 800 });
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);
    return () => observer.disconnect();
  }, [styleWidth, styleHeight]);

  useEffect(() => {
    setActiveIndex((current) => clamp(current, 0, safeCards.length - 1));
  }, [safeCards.length]);

  const frameWidth = styleWidth ?? frameSize.width;
  const frameHeight = styleHeight ?? frameSize.height;
  const isMobile = frameWidth < 640;
  const isTablet = frameWidth >= 640 && frameWidth < 1024;

  const cardSize = useMemo(() => {
    const width = Math.max(frameWidth, 1);
    const height = Math.max(frameHeight, 1);
    if (isMobile) {
      const maxByWidth = Math.max(220, width - 40);
      const maxByHeight = Math.max(220, height * 0.64);
      const preferred = width * mobileCardScale;
      return clamp(preferred, 220, Math.min(maxByWidth, maxByHeight));
    }
    if (isTablet) {
      const preferred = Math.min(width * 0.42, height * 0.72);
      return clamp(preferred, 260, 340);
    }
    const preferred = Math.min(width * desktopWidthFactor, height * desktopHeightFactor);
    return clamp(preferred, minCardWidth, maxCardWidth);
  }, [frameWidth, frameHeight, isMobile, isTablet, mobileCardScale, minCardWidth, maxCardWidth, desktopWidthFactor, desktopHeightFactor]);

  const cardHeight = cardSize / cardAspectRatio;
  const spacing = isMobile ? cardSize * (1 - clamp(mobileOverlap, 0, 0.45)) : cardGap;
  const contentPadding = isMobile ? clamp(cardSize * 0.08, 18, 28) : desktopContentPadding;
  const responsiveHeadlineFont = { ...headlineFont, ...(isMobile ? { fontSize: clamp(cardSize * 0.085, 20, 28), lineHeight: '1.08em', letterSpacing: '-0.03em' } : {}) };
  const responsiveTextFont = { ...textFont, ...(isMobile ? { fontSize: clamp(cardSize * 0.042, 12, 15), lineHeight: '1.35em' } : {}) };
  const responsiveButtonFont = { ...buttonFont, ...(isMobile ? { fontSize: clamp(cardSize * 0.04, 12, 14), lineHeight: '1em' } : {}) };

  const goTo = useCallback((index) => setActiveIndex(clamp(index, 0, safeCards.length - 1)), [safeCards.length]);
  const previous = useCallback(() => setActiveIndex((current) => (current === 0 ? safeCards.length - 1 : current - 1)), [safeCards.length]);
  const next = useCallback(() => setActiveIndex((current) => (current === safeCards.length - 1 ? 0 : current + 1)), [safeCards.length]);

  const handleDragEnd = useCallback((_event, info) => {
    if (safeCards.length <= 1) return;
    const threshold = isMobile ? 36 : 56;
    if (info.offset.x > threshold) previous();
    if (info.offset.x < -threshold) next();
  }, [safeCards.length, isMobile, previous, next]);

  const handleKeyDown = useCallback((event, index) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    goTo(index);
  }, [goTo]);

  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); previous(); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); next(); }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [previous, next]);

  return (
    <div
      ref={containerRef}
      style={{
        ...style,
        width: style?.width ?? 1200,
        height: style?.height ?? 800,
        minWidth: 1,
        minHeight: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor,
        boxSizing: 'border-box',
      }}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.16}
        onDragEnd={handleDragEnd}
        style={{ position: 'relative', width: '100%', height: '100%', overflow: 'visible', touchAction: 'pan-y' }}
      >
        {safeCards.map((card, index) => {
          const isActive = index === activeIndex;
          const distance = index - activeIndex;
          const absDistance = Math.abs(distance);
          const x = distance * spacing;
          const scale = isActive ? activeCardScale : inactiveCardScale;
          const image = card.image?.src || DEFAULT_IMAGE;
          const imageAlt = card.image?.alt || card.headline || '';
          return (
            <motion.div
              key={index}
              role={isActive ? 'group' : 'button'}
              tabIndex={isActive ? -1 : 0}
              aria-label={isActive ? card.headline : `Show slide ${index + 1}`}
              onClick={() => !isActive && goTo(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onMouseEnter={() => !isActive && setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{ x, scale: isActive ? activeCardScale : hoveredIndex === index ? inactiveCardScale * 1.05 : scale, opacity: absDistance > 2 ? 0.55 : 1 }}
              transition={{ duration: hoveredIndex === index ? animationSpeed * 0.3 : animationSpeed, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: cardSize,
                height: cardHeight,
                marginLeft: -cardSize / 2,
                marginTop: -cardHeight / 2,
                transformOrigin: 'center',
                zIndex: isActive ? 50 : 50 - absDistance,
                cursor: isActive ? 'default' : 'pointer',
                overflow: 'hidden',
                borderRadius,
                border: `${isActive ? borderWidth : hoveredIndex === index ? Math.max(1, borderWidth * 0.85) : Math.max(1, borderWidth * 0.55)}px solid ${isActive ? '#FFFFFF' : hoveredIndex === index ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)'}`,
                boxShadow: isActive
                  ? `0 28px 80px rgba(0,0,0,${shadowIntensity * 0.36}), 0 10px 28px rgba(0,0,0,${shadowIntensity * 0.22})`
                  : hoveredIndex === index
                    ? `0 16px 40px rgba(0,0,0,${shadowIntensity * 0.25})`
                    : `0 6px 18px rgba(0,0,0,${shadowIntensity * 0.12})`,
                boxSizing: 'border-box',
                background: '#DDDDDD',
                outline: 'none',
              }}
            >
              <img
                src={image}
                srcSet={card.image?.srcSet}
                alt={imageAlt}
                draggable={false}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', userSelect: 'none' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: overlayColor,
                  opacity: isActive ? overlayOpacity : hoveredIndex === index ? overlayOpacity * 0.4 : overlayOpacity * 0.65,
                  transition: `opacity ${animationSpeed}s ease`,
                }}
              />
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: animationSpeed * 0.7, delay: animationSpeed * 0.12, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    gap: isMobile ? 14 : 16,
                    padding: contentPadding,
                    textAlign: 'left',
                    boxSizing: 'border-box',
                    pointerEvents: 'none',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: isMobile ? 8 : 12, maxWidth: '100%' }}>
                    <h2 style={{ margin: 0, color: headlineColor, maxWidth: '100%', ...responsiveHeadlineFont }}>{card.headline}</h2>
                    <p style={{ margin: 0, color: textColor, maxWidth: isMobile ? '92%' : '86%', ...responsiveTextFont }}>{card.text}</p>
                  </div>
                  <motion.a
                    href={card.buttonLink || '#'}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    whileHover={{ scale: 1.06, y: -2, boxShadow: '0 8px 20px rgba(0,0,0,0.22)' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: isMobile ? '10px 22px' : '12px 30px',
                      borderRadius: 999,
                      backgroundColor: buttonBackground,
                      color: buttonTextColor,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      pointerEvents: 'auto',
                      ...responsiveButtonFont,
                    }}
                  >
                    {card.buttonText}
                  </motion.a>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {safeCards.length > 1 && (
        <div style={{ position: 'absolute', left: '50%', bottom: isMobile ? 22 : 28, transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 8, zIndex: 100 }}>
          {safeCards.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              style={{
                width: index === activeIndex ? 18 : 7,
                height: 7,
                border: 'none',
                borderRadius: 999,
                padding: 0,
                backgroundColor: indicatorColor,
                opacity: index === activeIndex ? 1 : indicatorInactiveOpacity,
                cursor: 'pointer',
                transition: `width ${animationSpeed}s ease, opacity ${animationSpeed}s ease`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
