export type ItemType = 'project' | 'talk';

export interface Project {
  id: string;
  type: ItemType; // Distinguishes between 'project' (external) and 'talk' (internal blog)
  refId: string;
  title: string;
  description: string;
  content: string; // Markdown/HTML content
  tags: string[];
  imageUrl: string;
  externalLink?: string; // URL to GitHub or external site (Used for projects)
  date: string;
  stats?: {
    label: string;
    value: string;
  };
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
}

export enum ViewMode {
  TERMINAL = 'TERMINAL',
  ARCHIVE = 'ARCHIVE',
  ADMIN = 'ADMIN'
}