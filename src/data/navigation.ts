import type { NavLink } from '../types';

const base = import.meta.env.BASE_URL;

export const mainNav: NavLink[] = [
  { label: 'Home', href: `${base}` },
  { label: 'Servizi', href: `${base}servizi/` },
  { label: 'Lavori', href: `${base}lavori/` },
  { label: 'Chi Siamo', href: `${base}chi-siamo/` },
  { label: 'Preventivo Gratuito', href: `${base}contatti/`, isCta: true },
];

export const footerNav: NavLink[] = [
  { label: 'Home', href: `${base}` },
  { label: 'Servizi', href: `${base}servizi/` },
  { label: 'Lavori', href: `${base}lavori/` },
  { label: 'Chi Siamo', href: `${base}chi-siamo/` },
  { label: 'Contatti', href: `${base}contatti/` },
  { label: 'Privacy Policy', href: `${base}privacy/` },
  { label: 'Cookie Policy', href: `${base}cookie/` },
];
