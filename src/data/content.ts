import siteData from "@/content/site.json";

export const site = siteData.site;
export const hero = siteData.hero;
export const marquee = siteData.marquee;
export const services = siteData.services;
export const about = siteData.about;
export const stats = siteData.stats;
export const projects = siteData.projects;
export const experience = siteData.experience;
export const education = siteData.education;
export const certificates = siteData.certificates;
export const contactChannels = siteData.contactChannels;

export interface Project {
  slug: string;
  title: string;
  year: number;
  role: string;
  stack: string[];
  metrics: Array<{ label: string; value: string }>;
  summary: string;
  featured: boolean;
  order: number;
  sections: {
    summary: string;
    challenge: string;
    architecture: string;
    results: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  body: string;
}