import type { SiteConfig } from '../types';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export function url(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

export const site: SiteConfig = {
  name: 'MasterTetto',
  legalName: 'MasterTetto SNC',
  email: 'mastertetto2821@gmail.com',
  phone: '+393928158352',
  phoneDisplay: '+39 392 815 8352',
  whatsapp: 'https://wa.me/393928158352?text=Buongiorno%2C%20vorrei%20richiedere%20un%20preventivo%20per%20',
  piva: '05023150237',
  cf: '05023150237',
  address: {
    street: 'Via S. Cristina, 14',
    postalCode: '37000', // DA CONFERMARE
    city: 'Verona', // DA CONFERMARE — potrebbe essere una frazione
    province: 'VR',
    country: 'IT',
  },
  geo: {
    latitude: 45.4384,
    longitude: 10.9916,
  },
  tagline: 'Manutenzione Acrobatica del Tetto',
  description:
    'Specialisti nella manutenzione e rifacimento del tetto senza ponteggi a Verona. Lavori acrobatici su fune in tutta sicurezza. Preventivo gratuito.',
  foundingYear: 2020, // DA CONFERMARE
  socialLinks: [
    // DA CONFERMARE — placeholder URLs
    { platform: 'facebook', url: '#', label: 'Facebook' },
    { platform: 'instagram', url: '#', label: 'Instagram' },
    { platform: 'tiktok', url: '#', label: 'TikTok' },
  ],
};
