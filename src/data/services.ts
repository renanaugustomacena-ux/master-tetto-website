import type { Service } from '../types';

export const services: Service[] = [
  {
    num: '01',
    title: 'Sistema Anticaduta',
    description: 'Installazione provvisoria di sistemi di protezione anticaduta per ogni intervento.',
    longDescription:
      'Progettiamo e installiamo sistemi anticaduta permanenti per la sicurezza degli operatori durante i futuri interventi di manutenzione. I nostri impianti sono certificati secondo le normative UNI EN 795 e UNI 11560, e conformi al D.Lgs. 81/2008 in materia di sicurezza sul lavoro. Ogni installazione viene collaudata e certificata.',
    icon: 'shield-check',
    slug: 'sistema-anticaduta',
    benefits: [
      'Conformità normativa D.Lgs. 81/2008',
      'Certificazione UNI EN 795',
      'Collaudo e documentazione inclusi',
      'Manutenzione periodica programmabile',
    ],
  },
  {
    num: '02',
    title: 'Senza Ponteggi',
    description: 'Interventi in quota senza ponteggi — più rapidi, più economici, zero ingombro.',
    longDescription:
      'La nostra specialità: interveniamo su qualsiasi copertura utilizzando tecniche acrobatiche e scale elettriche professionali, eliminando completamente la necessità di ponteggi. Questo significa costi ridotti, tempi di intervento più rapidi e nessun disagio per il condominio o i vicini. Lavoriamo in totale sicurezza con imbragature certificate e DPI di ultima generazione.',
    icon: 'rope',
    slug: 'senza-ponteggi',
    benefits: [
      'Costi inferiori — nessun noleggio ponteggi',
      'Intervento rapido — nessuna attesa per permessi',
      'Zero disturbo ai vicini',
      'Sicurezza certificata con DPI professionali',
    ],
  },
  {
    num: '03',
    title: 'Ripasso del Tetto',
    description: 'Ispezione e manutenzione ordinaria per prevenire infiltrazioni e danni.',
    longDescription:
      'Il ripasso del tetto è l\'intervento di manutenzione preventiva più importante per la longevità della copertura. Controlliamo ogni tegola e coppo, riallineiamo gli elementi spostati, sostituiamo quelli rotti e verifichiamo lo stato delle guaine impermeabilizzanti. Un ripasso regolare previene infiltrazioni costose e prolunga la vita del tetto di decenni.',
    icon: 'search',
    slug: 'ripasso-del-tetto',
    benefits: [
      'Prevenzione infiltrazioni',
      'Sostituzione tegole rotte o spostate',
      'Verifica guaine impermeabilizzanti',
      'Prolungamento vita utile della copertura',
    ],
  },
  {
    num: '04',
    title: 'Rifacimento del Tetto',
    description: 'Ristrutturazione completa della copertura — dalla rimozione alla posa finale.',
    longDescription:
      'Quando il ripasso non basta, eseguiamo il rifacimento completo della copertura. Rimuoviamo il manto esistente, verifichiamo e ripristiniamo la struttura portante, posiamo nuova guaina impermeabilizzante e installiamo il nuovo manto di copertura in coppi, tegole o materiali a scelta. Ogni fase è documentata con foto prima/dopo.',
    icon: 'home',
    slug: 'rifacimento-del-tetto',
    benefits: [
      'Rimozione completa del vecchio manto',
      'Ripristino struttura portante',
      'Nuova impermeabilizzazione',
      'Documentazione fotografica completa',
    ],
  },
  {
    num: '05',
    title: 'Sostituzione Lucernari',
    description: 'Rimozione e installazione di lucernari per luce naturale e ventilazione.',
    longDescription:
      'Sostituiamo lucernari vecchi, opacizzati o danneggiati con modelli moderni ad alta efficienza energetica. Installiamo lucernari nuovi dove richiesto, garantendo una perfetta integrazione con il manto di copertura esistente e l\'assenza totale di infiltrazioni. Lavoriamo con le principali marche del settore.',
    icon: 'sun',
    slug: 'sostituzione-lucernari',
    benefits: [
      'Maggiore luce naturale',
      'Miglior efficienza energetica',
      'Integrazione perfetta con copertura',
      'Garanzia contro infiltrazioni',
    ],
  },
  {
    num: '06',
    title: 'Pulizia Grondaia',
    description: 'Pulizia e manutenzione delle grondaie per un corretto deflusso delle acque.',
    longDescription:
      'Grondaie intasate causano infiltrazioni, danni ai muri perimetrali e problemi strutturali. Eseguiamo la pulizia completa di grondaie e pluviali, rimuovendo foglie, detriti e depositi accumulati. Verifichiamo l\'integrità dei giunti e la corretta pendenza per garantire un deflusso ottimale delle acque piovane.',
    icon: 'droplets',
    slug: 'pulizia-grondaia',
    benefits: [
      'Prevenzione danni strutturali',
      'Rimozione completa di detriti',
      'Verifica integrità giunti',
      'Controllo pendenza e deflusso',
    ],
  },
  {
    num: '07',
    title: 'Pulizia Pannelli Fotovoltaici',
    description: 'Pulizia professionale dei pannelli solari per massima resa energetica.',
    longDescription:
      'Pannelli sporchi possono perdere fino al 30% di efficienza. Eseguiamo la pulizia professionale con acqua demineralizzata e attrezzature specifiche che non danneggiano le superfici. Il nostro accesso acrobatico ci permette di raggiungere qualsiasi pannello senza strutture ausiliarie, riducendo tempi e costi dell\'intervento.',
    icon: 'zap',
    slug: 'pulizia-pannelli-fotovoltaici',
    benefits: [
      'Recupero fino al 30% di efficienza',
      'Acqua demineralizzata — nessun residuo',
      'Nessun danno alle superfici',
      'Accesso rapido senza ponteggi',
    ],
  },
];
