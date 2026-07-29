'use client';

import { useEffect, useRef } from 'react';
import './motion-lab.css';

export default function MotionLab() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    let cleanup: (() => void) | undefined;

    import('@/motion-lab/main').then(({ boot }) => {
      boot(container).then((destroy) => {
        cleanup = destroy;
      });
    });

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="app"
      style={{ position: 'relative', minHeight: '100vh' }}
    />
  );
}
