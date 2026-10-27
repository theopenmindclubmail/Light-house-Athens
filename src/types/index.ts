export type Language = 'GR' | 'EN' | 'DE' | 'IT' | 'ES' | 'FR';

export type Theme = 'light' | 'dark';

export interface PhotoItem {
  id: string;
  category: 'all' | 'living' | 'kitchen' | 'bedroom' | 'workspace' | 'rooftop' | 'bathroom' | 'details';
  titleKey: string;
  descKey: string;
  src: string;
  aspectRatio?: string;
  featured?: boolean;
}

export interface AmenityItem {
  iconName: string;
  titleKey: string;
  descKey: string;
  highlight?: boolean;
}

export interface AmenityCategory {
  categoryKey: string;
  items: AmenityItem[];
}

export interface LocalPlace {
  id: string;
  name: string;
  category: 'coffee' | 'food' | 'wine' | 'culture' | 'transit';
  walkTime: string;
  descriptionKey: string;
  address: string;
  link?: string;
}

export interface InquiryData {
  checkIn: string;
  checkOut: string;
  guests: number;
  purpose: 'vacation' | 'remote_work' | 'extended_stay';
  customNotes: string;
}
