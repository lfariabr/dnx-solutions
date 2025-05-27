import { useQuery } from '@apollo/client';
import { GET_ARTICLES, GET_PUBLISHED_ARTICLES, GET_ARTICLE } from '../graphql/queries/article.queries';
import { 
  ArticlesData, 
  PublishedArticlesData, 
  ArticleData, 
  ArticleVars 
} from '../graphql/types/article.types';

/**
 * Hook to fetch all articles (both published and unpublished)
 * Only admin users should be able to see unpublished articles
 */
export function useArticles() {
  const { data, loading, error } = useQuery<ArticlesData>(GET_ARTICLES);
  
  return {
    articles: data?.articles || [],
    loading,
    error: error?.message
  };
}

/**
 * Hook to fetch only published articles
 * This is safe to use for public-facing pages
 */
export function usePublishedArticles() {
  const { data, loading, error } = useQuery<PublishedArticlesData>(GET_PUBLISHED_ARTICLES);
  
  return {
    articles: data?.publishedArticles || [],
    loading,
    error: error?.message
  };
}

/**
 * Hook to fetch a single article by ID
 * @param id The ID of the article to fetch
 */
export function useArticle(id: string) {
  const { data, loading, error } = useQuery<ArticleData, ArticleVars>(
    GET_ARTICLE,
    { variables: { id } }
  );
  
  return {
    article: data?.article,
    loading,
    error: error?.message,
    notFound: !loading && !error && !data?.article
  };
}
