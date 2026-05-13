import type { NavLink } from '../types';
import { url } from './site';

export const mainNav: NavLink[] = [
  { label: 'Home', href: url('/') },
  { label: 'Servizi', href: url('/servizi/') },
  { label: 'Lavori', href: url('/lavori/') },
  { label: 'Chi Siamo', href: url('/chi-siamo/') },
  { label: 'Preventivo Gratuito', href: url('/contatti/'), isCta: true },
];

export const footerNav: NavLink[] = [
  { label: 'Home', href: url('/') },
  { label: 'Servizi', href: url('/servizi/') },
  { label: 'Lavori', href: url('/lavori/') },
  { label: 'Chi Siamo', href: url('/chi-siamo/') },
  { label: 'Contatti', href: url('/contatti/') },
  { label: 'Privacy Policy', href: url('/privacy/') },
  { label: 'Cookie Policy', href: url('/cookie/') },
];
