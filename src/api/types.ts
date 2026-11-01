export interface Media {
  id: number;
  url: string;
  alternativeText?: string | null;
}

export type ColorKey = 'gold' | 'teal' | 'rose' | 'green' | 'purple' | 'cobalt';
export type JewelryCategory = 'earrings' | 'rings' | 'necklaces' | 'hairpins' | 'body' | 'others';
export type DiademeCategory = 'bridal' | 'crowns' | 'hair-vines' | 'combs';

export interface CatalogItem<C extends string = string> {
  id: number; documentId: string; title: string; photo?: Media | null;
  year?: number; caption?: string; category: C; sortOrder: number;
}

export interface CuratedWork {
  id: number; documentId: string; title: string; photo?: Media | null;
  year?: number; materialLine?: string; caption?: string; sortOrder: number;
  pieceNumber?: string; source?: string; dimensions?: string; priceText?: string; description?: string;
  featured?: boolean | null;
}

export type JewelryPiece = CatalogItem<JewelryCategory>;
export type DiademePiece = CatalogItem<DiademeCategory>;
export type EcoGlassWork = CuratedWork;
export type DecorWork = CuratedWork;

export type WorkshopCategory = 'glass' | 'jewelry' | 'mosaic' | 'diademe' | 'group';
export type WorkshopStatus = 'open' | 'waitlist' | 'enquire';
export type ExhibitionStatus = 'upcoming' | 'past';

export interface WorkshopSession {
  id: number; documentId: string; title: string; image?: Media | null;
  kind?: string; category: WorkshopCategory;
  dateText?: string; timeText?: string; duration?: string;
  level?: string; maxPeople?: string;
  status: WorkshopStatus; spotsText?: string; description?: string; sortOrder: number;
  featured?: boolean | null;
}

export interface Exhibition {
  id: number; documentId: string; title: string; slug: string;
  banner?: Media | null; dateText?: string; location?: string; description?: string;
  status: ExhibitionStatus; venue?: string; city?: string; year?: string;
  detailIntro?: string; photos?: Media[] | null; sortOrder: number;
  featured?: boolean | null;
}
