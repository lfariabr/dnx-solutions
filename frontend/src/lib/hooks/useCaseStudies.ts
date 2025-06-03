import { useQuery } from '@apollo/client';
import { 
  GET_CASE_STUDIES, 
  GET_FEATURED_CASE_STUDIES, 
  GET_CASE_STUDY
} from '../graphql/queries/caseStudy.queries';

interface CaseStudyVars {
  id?: string;
  limit?: number;
  offset?: number;
  featured?: boolean;
  published?: boolean;
}

/**
 * Hook for fetching all case studies (including unpublished)
 * Intended for admin use
 */
export function useCaseStudies(variables?: Omit<CaseStudyVars, 'id'>) {
  const { data, loading, error } = useQuery(GET_CASE_STUDIES, { 
    variables,
    fetchPolicy: 'cache-first'
  });
  
  return {
    caseStudies: data?.caseStudies || [],
    loading,
    error: error?.message
  };
}

/**
 * Hook for fetching only published case studies
 * Intended for public-facing pages
 */
export function usePublishedCaseStudies() {
  const { data, loading, error } = useQuery(GET_CASE_STUDIES, { 
    variables: { published: true },
    fetchPolicy: 'cache-first'
  });
  
  return {
    caseStudies: data?.caseStudies || [],
    loading,
    error: error?.message
  };
}

/**
 * Hook for fetching featured case studies
 */
export function useFeaturedCaseStudies(limit?: number) {
  const { data, loading, error } = useQuery(GET_FEATURED_CASE_STUDIES, { 
    variables: { limit },
    fetchPolicy: 'cache-first'
  });
  
  return {
    featuredCaseStudies: data?.featuredCaseStudies || [],
    loading,
    error: error?.message
  };
}

/**
 * Hook for fetching a single case study by ID
 */
export function useCaseStudy(id: string) {
  const { data, loading, error } = useQuery(GET_CASE_STUDY, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    errorPolicy: 'all'
  });
  
  return {
    caseStudy: data?.caseStudy || null,
    loading: !id ? false : loading,
    error: error?.message,
    notFound: !loading && !error && !data?.caseStudy && !!id
  };
}
