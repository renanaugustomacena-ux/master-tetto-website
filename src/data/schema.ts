import { site } from './site';

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['RoofingContractor', 'LocalBusiness'],
    name: site.name,
    legalName: site.legalName,
    vatID: `IT${site.piva}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.province,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    telephone: site.phone,
    email: site.email,
    url: 'https://mastertetto.it',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: [
      'Verona',
      'Provincia di Verona',
      'Lago di Garda',
      'Valpolicella',
      'Lessinia',
      'Bassa Veronese',
    ],
    serviceType: [
      'Manutenzione tetti',
      'Rifacimento coperture',
      'Linee vita anticaduta',
      'Pulizia pannelli solari',
    ],
    sameAs: site.socialLinks
      .filter((l) => l.url !== '#')
      .map((l) => l.url),
  };
}

export function buildWebPageSchema(title: string, description: string, url?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    ...(url && { url }),
    isPartOf: {
      '@type': 'WebSite',
      name: site.name,
      url: 'https://mastertetto.it',
    },
  };
}
