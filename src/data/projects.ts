import type { ProjectShowcase } from '../types';

export const projects: ProjectShowcase[] = [
  {
    title: 'Rifacimento copertura in coppi',
    description:
      'Rifacimento completo del manto di copertura con coppi nuovi su villetta bifamiliare.',

    category: 'rifacimento',
    images: [
      {
        src: '/images/lavori/rifacimento-prima-dopo.jpeg',
        alt: 'Rifacimento copertura Verona — prima e dopo',
        width: 1024,
        height: 1821,
      },
    ],
    beforeAfter: {
      before: {
        src: '/images/lavori/rifacimento-prima-dopo.jpeg',
        alt: 'Prima del rifacimento — tegole danneggiate',
        width: 1024,
        height: 910,
      },
      after: {
        src: '/images/lavori/rifacimento-prima-dopo.jpeg',
        alt: 'Dopo il rifacimento — copertura nuova',
        width: 1024,
        height: 910,
      },
      caption: 'Villetta bifamiliare — Verona',
    },
    completedDate: '2025-03',
  },
  {
    title: 'Fissaggio coppi con schiuma poliuretanica',
    description:
      'Applicazione di schiuma poliuretanica tra coppo e coppo per incollaggio e sigillatura, impedendo spostamenti da vento e infiltrazioni tra gli elementi della copertura.',

    category: 'manutenzione',
    images: [
      {
        src: '/images/lavori/manutenzione-lavori.jpeg',
        alt: 'Fissaggio coppi con schiuma poliuretanica',
        width: 800,
        height: 600,
      },
    ],
    completedDate: '2025-02',
  },
  {
    title: 'Sostituzione lucernario',
    description:
      'Rimozione lucernario opacizzato e installazione nuovo modello ad alta efficienza.',

    category: 'lucernari',
    images: [
      {
        src: '/images/lavori/lucernari-prima-dopo.jpeg',
        alt: 'Sostituzione lucernario — prima e dopo',
        width: 800,
        height: 600,
      },
    ],
    beforeAfter: {
      before: {
        src: '/images/lavori/lucernari-prima-dopo.jpeg',
        alt: 'Lucernario vecchio opacizzato',
        width: 800,
        height: 600,
      },
      after: {
        src: '/images/lavori/lucernari-prima-dopo.jpeg',
        alt: 'Lucernario nuovo trasparente',
        width: 800,
        height: 600,
      },
    },
    completedDate: '2025-01',
  },
  {
    title: 'Pulizia pannelli fotovoltaici',
    description: 'Pulizia professionale impianto 6kW con acqua demineralizzata su tetto a coppi.',

    category: 'pannelli-solari',
    images: [
      {
        src: '/images/lavori/pannelli-fotovoltaici.jpeg',
        alt: 'Pannelli fotovoltaici puliti',
        width: 2048,
        height: 923,
      },
    ],
    completedDate: '2024-11',
  },
  {
    title: 'Pulizia grondaie e pluviali',
    description: 'Pulizia completa grondaie intasate da foglie e detriti su edificio residenziale.',

    category: 'grondaie',
    images: [
      {
        src: '/images/lavori/grondaie-prima-dopo.jpeg',
        alt: 'Pulizia grondaie — prima e dopo',
        width: 800,
        height: 600,
      },
    ],
    beforeAfter: {
      before: {
        src: '/images/lavori/grondaie-prima-dopo.jpeg',
        alt: 'Grondaia intasata da foglie e detriti',
        width: 800,
        height: 600,
      },
      after: {
        src: '/images/lavori/grondaie-prima-dopo.jpeg',
        alt: 'Grondaia pulita e funzionante',
        width: 800,
        height: 600,
      },
    },
    completedDate: '2024-10',
  },
];

export const categoryLabels: Record<string, string> = {
  rifacimento: 'Rifacimento',
  manutenzione: 'Manutenzione',
  lucernari: 'Lucernari',
  'pannelli-solari': 'Pannelli Solari',
  grondaie: 'Grondaie',
  lattoneria: 'Lattoneria',
};
