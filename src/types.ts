export type Language = 'en' | 'ar' | 'ku';

export interface TranslationSet {
  title: string;
  subtitle: string;
  architectTitle: string;
  architectSub: string;
  budgetLabel: string;
  timelineLabel: string;
  scaleLabel: string;
  regionsLabel: string;
  activeLanguage: string;
  searchPlaceholder: string;
  
  // Navigation Tabs
  tabOverview: string;
  tabArchitecture: string;
  tabMicroservices: string;
  tabDataFlow: string;
  tabApiDesign: string;
  tabSecurity: string;
  tabBudgetTimeline: string;
  tabDatabase: string;
  
  // Cards & Info
  btnCopyMermaid: string;
  copiedLabel: string;
  offlineCapTitle: string;
  offlineCapDesc: string;
  sovereignCloudTitle: string;
  sovereignCloudDesc: string;
  asycudaIntegrationTitle: string;
  asycudaIntegrationDesc: string;
}

export interface Microservice {
  id: string;
  name: { en: string; ar: string; ku: string };
  category: 'core' | 'integration' | 'security' | 'intelligence';
  description: { en: string; ar: string; ku: string };
  responsibilities: { en: string[]; ar: string[]; ku: string[] };
  tech: string[];
  endPoints: { path: string; method: string; desc: string }[];
}

export interface TechStackItem {
  layer: { en: string; ar: string; ku: string };
  components: {
    name: string;
    description: { en: string; ar: string; ku: string };
    role: { en: string; ar: string; ku: string };
    isSovereign: boolean;
  }[];
}

export interface BudgetCostItem {
  category: { en: string; ar: string; ku: string };
  allocation: number; // in Millions USD
  percentage: number;
  description: { en: string; ar: string; ku: string };
}

export interface TimelineMilestone {
  quarter: string;
  months: string;
  title: { en: string; ar: string; ku: string };
  tasks: { en: string[]; ar: string[]; ku: string[] };
}
