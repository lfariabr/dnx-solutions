// TypeScript interfaces for TechInsights data

export interface TechInsights {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  categories: string[];
  tags: string[];
  imageUrl?: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TechInsightsData {
  techInsights: TechInsights[];
}

export interface PublishedTechInsightsData {
  publishedTechInsights: TechInsights[];
}

export interface TechInsightData {
  techInsightsById: TechInsights | null;
}

export interface TechInsightVars {
  id: string;
}

/**
 * Input type for creating a new tech insight
 */
export interface TechInsightsInput {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  categories: string[];
  imageUrl?: string;
  published?: boolean;
}

/**
 * Input type for updating an existing tech insight
 */
export interface TechInsightsUpdateInput {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  categories?: string[];
  tags?: string[];
  imageUrl?: string | null;
  published?: boolean;
}

/**
 * Response from tech insight mutations
 */
export interface TechInsightsMutationResponse {
  techInsight: TechInsights;
}
