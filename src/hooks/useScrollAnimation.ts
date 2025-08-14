import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (
  animationConfig: gsap.TweenVars,
  scrollConfig?: ScrollTrigger.Vars
) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const tween = gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 100,
        scale: 0.9,
        ...animationConfig,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8, // Reduced from 1 for snappier animations
        ease: 'power2.out', // Changed to power2 for smoother feel
        scrollTrigger: {
          trigger: element,
          start: 'top 85%', // Changed from 80% to trigger earlier
          end: 'bottom 15%', // Changed from 20% 
          toggleActions: 'play none none none', // Changed to prevent reverse
          ...scrollConfig,
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, []);

  return elementRef;
};

export const useParallax = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      yPercent: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, [speed]);

  return elementRef;
};