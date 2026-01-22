export interface WritingItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  publication?: string;
  year: string;
  url: string;
  featured?: boolean;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  url?: string;
  tags?: string[];
}

export interface SiteConfig {
  name: string;
  role: string;
  bio: string;
  email?: string;
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    substack?: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "MELTED",
  role: "FINANCIAL ENGINEER",
  bio: "I explore systems at their edges. Where security meets experimentation, where AI reshapes how we build, and where decentralization isn't just infrastructure but inevitability.",
  email: "meltedmindz1@gmail.com",
  socials: {
    github: "https://github.com/MeltedMindz",
    twitter: "https://x.com/MeltedMindz",
  },
};

export const writing: WritingItem[] = [
  {
    id: "1",
    slug: "app-factory",
    title: "App Factory: Bootstrapping With Bags App",
    description: "How I built an agent-native system that turns market signals into validated app specs and buildable mobile apps.",
    publication: "Medium",
    year: "2026",
    url: "https://medium.com/@meltedmindz1/app-factory-bootstrapping-with-bags-app-175fed9cf479",
    featured: true,
  },
];

export const projects: ProjectItem[] = [
  {
    id: "1",
    name: "Dexter",
    description: "AI Liquidity Management Agent",
    url: "https://github.com/MeltedMindz/Dexter",
    tags: ["AI", "DeFi", "Liquidity"],
  },
  {
    id: "2",
    name: "App Factory",
    description: "Agent-native system that turns market signals into validated app specs and buildable Expo/React Native apps with monetization, ASO, and launch strategy baked in.",
    url: "https://github.com/MeltedMindz/AppFactory",
    tags: ["AI Agents", "React Native", "Automation"],
  },
];

export function getWritingBySlug(slug: string): WritingItem | undefined {
  return writing.find((item) => item.slug === slug);
}
