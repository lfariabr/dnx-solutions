import { useQuery } from '@apollo/client';
import { 
  GET_TECH_INSIGHTS, 
  GET_PUBLISHED_TECH_INSIGHTS,
  GET_TECH_INSIGHT 
} from '../graphql/queries/techInsights.queries';
import { 
  TechInsightsData, 
  PublishedTechInsightsData,
  TechInsightData,
  TechInsightVars
} from '../graphql/types/techInsightsData.types';

/**
 * Hook for fetching all tech insights (including unpublished)
 * Intended for admin use
 */
export const useTechInsights = (limit?: number, offset?: number) => {
  const { data, loading, error } = useQuery<TechInsightsData>(GET_TECH_INSIGHTS, {
    variables: { limit, offset }
  });
  
  return {
    techInsights: data?.techInsights || [],
    loading,
    error: error?.message
  };
};

/**
 * Hook for fetching only published tech insights
 * Intended for public-facing pages
 */
export const usePublishedTechInsights = (limit?: number, offset?: number) => {
  const { data, loading, error } = useQuery<PublishedTechInsightsData>(
    GET_PUBLISHED_TECH_INSIGHTS,
    { variables: { limit, offset } }
  );
  
  return {
    techInsights: data?.publishedTechInsights || [],
    loading,
    error: error?.message
  };
};

/**
 * Hook for fetching a single tech insight by ID
 */
export const useTechInsight = (id: string) => {
  const { data, loading, error } = useQuery<TechInsightData, TechInsightVars>(GET_TECH_INSIGHT, {
    variables: { id },
    skip: !id
  });

  return {
    techInsight: data?.techInsightsById || null,
    loading,
    error: error?.message,
    notFound: !loading && !error && !data?.techInsightsById
  };
};
