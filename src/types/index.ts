export interface SiteConfig {
  name: string;
  legalName: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  piva: string;
  cf: string;
  address: PostalAddress;
  geo: GeoCoordinates;
  tagline: string;
  description: string;
  foundingYear: number;
  socialLinks: SocialLink[];
}

export interface PostalAddress {
  street: string;
  postalCode: string;
  city: string;
  province: string;
  country: string;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'tiktok' | 'youtube';
  url: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
  isCta?: boolean;
}

export interface Service {
  num: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  slug: string;
  benefits: string[];
}

export interface ProjectShowcase {
  title: string;
  description: string;
  location?: string;
  category: ServiceCategory;
  images: ProjectImage[];
  beforeAfter?: BeforeAfterPair;
  completedDate: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface BeforeAfterPair {
  before: ProjectImage;
  after: ProjectImage;
  caption?: string;
}

export type ServiceCategory =
  | 'rifacimento'
  | 'manutenzione'
  | 'lucernari'
  | 'pannelli-solari'
  | 'grondaie'
  | 'linea-vita'
  | 'lattoneria';

export interface Testimonial {
  author: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  source: 'google' | 'facebook';
  date: string;
}

export interface TrustStat {
  value: number;
  suffix: string;
  label: string;
}
