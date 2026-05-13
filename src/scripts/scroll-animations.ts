import { gsap, ScrollTrigger } from './gsap-init';
import { splitAll } from './text-split';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initElementReveals() {
  const elements = document.querySelectorAll<HTMLElement>('[data-animate]');

  elements.forEach((el) => {
    const type = el.dataset.animate;
    const delay = parseFloat(getComputedStyle(el).getPropertyValue('--delay') || '0');

    const initial: gsap.TweenVars = { opacity: 0 };

    switch (type) {
      case 'fade-up':
        initial.y = 60;
        break;
      case 'scale-in':
        initial.scale = 0.9;
        break;
      case 'slide-left':
        initial.x = -60;
        break;
      case 'slide-right':
        initial.x = 60;
        break;
    }

    gsap.set(el, initial);

    gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration: 1,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });
}

function initSplitTextReveals() {
  const splits = splitAll();

  splits.forEach((result, el) => {
    gsap.set(result.chars, { y: 60, rotateX: -90, opacity: 0 });

    gsap.to(result.chars, {
      y: 0,
      rotateX: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.02,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });
}

function initCounters() {
  const counters = document.querySelectorAll<HTMLElement>('[data-count]');

  counters.forEach((el) => {
    const target = parseInt(el.dataset.count || '0', 10);
    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate() {
        el.textContent = Math.round(obj.val).toString();
      },
    });
  });
}

function initHeroSequence() {
  const hero = document.querySelector('.hero__content');
  if (!hero) return;

  const targets = [
    hero.querySelector('.hero__eyebrow'),
    hero.querySelector('.hero__title'),
    hero.querySelector('.hero__sub'),
    hero.querySelector('.hero__cta'),
    hero.closest('.hero')?.querySelector('.hero__scroll'),
  ].filter(Boolean) as HTMLElement[];

  gsap.set(targets, { opacity: 0, y: 40 });

  const tl = gsap.timeline({ delay: 0.3 });

  const eyebrow = hero.querySelector('.hero__eyebrow');
  const title = hero.querySelector('.hero__title');
  const sub = hero.querySelector('.hero__sub');
  const cta = hero.querySelector('.hero__cta');
  const scroll = hero.closest('.hero')?.querySelector('.hero__scroll');

  if (eyebrow) tl.to(eyebrow, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
  if (title) tl.to(title, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5');
  if (sub) tl.to(sub, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6');
  if (cta) {
    const buttons = cta.querySelectorAll('.btn');
    gsap.set(buttons, { opacity: 0, y: 20 });
    tl.to(cta, { y: 0, opacity: 1, duration: 0.01 }, '-=0.4');
    tl.to(buttons, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.01');
  }
  if (scroll) tl.to(scroll, { y: 0, opacity: 1, duration: 0.6 }, '-=0.2');
}

export function initScrollAnimations() {
  if (prefersReducedMotion) return;

  initHeroSequence();
  initElementReveals();
  initSplitTextReveals();
  initCounters();

  ScrollTrigger.refresh();
}
