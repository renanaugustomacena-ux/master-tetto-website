import type { ProjectShowcase } from '../types';

export const projects: ProjectShowcase[] = [
  {
    title: 'Rifacimento copertura in coppi',
    description: 'Rifacimento completo del manto di copertura con coppi nuovi su villetta bifamiliare.',
    location: 'Verona',
    category: 'rifacimento',
    images: [
      { src: '/images/lavori/placeholder-01.webp', alt: 'Rifacimento copertura Verona — dopo', width: 800, height: 600 },
    ],
    beforeAfter: {
      before: { src: '/images/lavori/placeholder-01-prima.webp', alt: 'Prima del rifacimento — tegole danneggiate', width: 800, height: 600 },
      after: { src: '/images/lavori/placeholder-01-dopo.webp', alt: 'Dopo il rifacimento — copertura nuova', width: 800, height: 600 },
      caption: 'Villetta bifamiliare — Verona',
    },
    completedDate: '2025-03',
  },
  {
    title: 'Ripasso tetto condominio',
    description: 'Ripasso completo con sostituzione coppi rotti e riallineamento manto su condominio 6 unità.',
    location: 'San Giovanni Lupatoto',
    category: 'manutenzione',
    images: [
      { src: '/images/lavori/placeholder-02.webp', alt: 'Ripasso tetto condominio — dopo', width: 800, height: 600 },
    ],
    completedDate: '2025-02',
  },
  {
    title: 'Sostituzione lucernario',
    description: 'Rimozione lucernario opacizzato e installazione nuovo modello ad alta efficienza.',
    location: 'Villafranca di Verona',
    category: 'lucernari',
    images: [
      { src: '/images/lavori/placeholder-03.webp', alt: 'Lucernario nuovo installato', width: 800, height: 600 },
    ],
    beforeAfter: {
      before: { src: '/images/lavori/placeholder-03-prima.webp', alt: 'Lucernario vecchio opacizzato', width: 800, height: 600 },
      after: { src: '/images/lavori/placeholder-03-dopo.webp', alt: 'Lucernario nuovo trasparente', width: 800, height: 600 },
      caption: 'Villafranca di Verona',
    },
    completedDate: '2025-01',
  },
  {
    title: 'Pulizia pannelli fotovoltaici',
    description: 'Pulizia professionale impianto 6kW con acqua demineralizzata su tetto a coppi.',
    location: 'Bussolengo',
    category: 'pannelli-solari',
    images: [
      { src: '/images/lavori/placeholder-04.webp', alt: 'Pannelli fotovoltaici puliti', width: 800, height: 600 },
    ],
    completedDate: '2024-11',
  },
  {
    title: 'Pulizia grondaie e pluviali',
    description: 'Pulizia completa grondaie intasate da foglie e detriti su edificio residenziale.',
    location: 'Pescantina',
    category: 'grondaie',
    images: [
      { src: '/images/lavori/placeholder-05.webp', alt: 'Grondaia pulita e funzionante', width: 800, height: 600 },
    ],
    completedDate: '2024-10',
  },
  {
    title: 'Installazione linea vita',
    description: 'Installazione sistema anticaduta certificato UNI EN 795 su copertura industriale.',
    location: 'Verona',
    category: 'linea-vita',
    images: [
      { src: '/images/lavori/placeholder-06.webp', alt: 'Linea vita installata su tetto', width: 800, height: 600 },
    ],
    completedDate: '2024-09',
  },
  {
    title: 'Rifacimento copertura villa',
    description: 'Rifacimento completo con nuova impermeabilizzazione e isolamento termico.',
    location: 'Lago di Garda',
    category: 'rifacimento',
    images: [
      { src: '/images/lavori/placeholder-07.webp', alt: 'Villa con copertura nuova — Lago di Garda', width: 800, height: 600 },
    ],
    beforeAfter: {
      before: { src: '/images/lavori/placeholder-07-prima.webp', alt: 'Copertura danneggiata villa', width: 800, height: 600 },
      after: { src: '/images/lavori/placeholder-07-dopo.webp', alt: 'Copertura nuova villa', width: 800, height: 600 },
      caption: 'Villa — Lago di Garda',
    },
    completedDate: '2024-08',
  },
  {
    title: 'Isolamento sottotetto',
    description: 'Posa pannelli in lana minerale per isolamento termico sottotetto non abitabile.',
    location: 'Negrar',
    category: 'isolamento',
    images: [
      { src: '/images/lavori/placeholder-08.webp', alt: 'Isolamento sottotetto con lana minerale', width: 800, height: 600 },
    ],
    completedDate: '2024-07',
  },
];

export const categoryLabels: Record<string, string> = {
  rifacimento: 'Rifacimento',
  manutenzione: 'Manutenzione',
  lucernari: 'Lucernari',
  'pannelli-solari': 'Pannelli Solari',
  grondaie: 'Grondaie',
  isolamento: 'Isolamento',
  'linea-vita': 'Linea Vita',
  lattoneria: 'Lattoneria',
};
