import dynamic from 'next/dynamic';
import { SITE } from '@/config/site';

export const metadata = {
  title: 'Motion Lab — Stackup Agency',
  description:
    'Vitrine technologique Stackup Agency — animations WebGL, GSAP, Lenis et Three.js au niveau Awwwards.',
  alternates: { canonical: `${SITE.url}/motion-lab` },
};

const MotionLab = dynamic(() => import('./MotionLab'), { ssr: false });

export default function MotionLabPage() {
  return <MotionLab />;
}
