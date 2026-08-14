import raw from "./homeHero.json";

export interface HeroPopup {
  title: string;
  text: string;
}

export interface HeroSection {
  title: string;
  popup: HeroPopup;
}

export const hero: HeroSection = {
  title: raw.title,
  popup: raw.popup,
};
