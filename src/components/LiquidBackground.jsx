import React, { useRef, useEffect } from 'react';

export default function LiquidBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log("Autoplay handled:", err);
      });
    }
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      background: '#040711',
    }}>
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          transform: 'translate(-50%, -50%) scale(1.05)',
          objectFit: 'cover',
          filter: 'brightness(0.7) contrast(1.1) saturate(1.2)',
        }}
      >
        <source
          src="https://cdn.dribbble.com/userupload/14418478/file/original-8e70ee66ef7ffa00dd7411287a745df8.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark tint overlay for glassmorphism text readability */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        background: 'radial-gradient(circle at 50% 50%, rgba(6, 10, 24, 0.45) 0%, rgba(4, 7, 17, 0.75) 100%)',
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
      }} />
    </div>
  );
}
