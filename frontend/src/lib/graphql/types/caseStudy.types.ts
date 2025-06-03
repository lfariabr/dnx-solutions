export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface CaseStudyInput {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  content: string;
  imageUrl: string;
  bannerUrl?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  published?: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CaseStudy extends Omit<CaseStudyInput, 'id' | 'createdAt' | 'updatedAt'>, Document {
  id: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  publishedAt?: string;
}

export interface CaseStudiesData {
  caseStudies: CaseStudy[];
}

export interface PublishedCaseStudiesData {
  publishedCaseStudies: CaseStudy[];
}

export interface FeaturedCaseStudiesData {
  featuredCaseStudies: CaseStudy[];
}

export interface CaseStudyData {
  caseStudy: CaseStudy | null;
}
