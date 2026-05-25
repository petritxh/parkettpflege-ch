export interface CaseItem {
  id: number;
  title: string;
  woodType: string;
  service: string;
  problem: string;
  description: string;
  category: string;
  imgBefore: string;
  imgAfter: string;
}

import casesData from './cases.json';
export const cases = casesData as CaseItem[];

export const CATEGORIES = ['Alle', 'Reparatur', 'Reinigung', 'Werterhalt'];
export const WOOD_TYPES = ['Alle', 'Eiche', 'Ahorn', 'Nussbaum'];
