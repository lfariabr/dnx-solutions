'use client';

import { MainLayout } from "@/components/layouts/MainLayout";
import { usePublishedArticles } from "@/lib/hooks/useArticles";
import { Article } from "@/lib/graphql/types/article.types";
import { AlertCircle, Calendar, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { format, formatDistanceToNow, parseISO, isValid } from "date-fns";

// Format date safely with fallback
const formatDateSafe = (dateString: string, formatType: 'distance' | 'full' = 'full') => {
  try {
    // First try to parse the ISO string
    const date = parseISO(dateString);
    
    // Check if the result is a valid date
    if (isValid(date)) {
      return formatType === 'distance' 
        ? `${formatDistanceToNow(date)} ago` 
        : format(date, 'MMMM d, yyyy');
    }
    
    // If it's not a valid ISO date, try direct Date constructor
    const fallbackDate = new Date(dateString);
    if (isValid(fallbackDate)) {
      return formatType === 'distance' 
        ? `${formatDistanceToNow(fallbackDate)} ago` 
        : format(fallbackDate, 'MMMM d, yyyy');
    }
    
    // If all parsing fails, return a fallback
    return formatType === 'distance' ? 'recently' : 'Recently published';
  } catch (error) {
    console.error('Date formatting error:', error);
    return formatType === 'distance' ? 'recently' : 'Recently published';
  }
};

export default function ArticlesPage() {
  const { articles, loading, error } = usePublishedArticles();

  return (
    <MainLayout>
      <div className="container py-12 max-w-6xl">
        <div className="space-y-2 mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
          <p className="text-muted-foreground">
            Latest thoughts, tutorials, and insights
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error state */}
        {error && (
          <Alert variant="destructive" className="my-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error loading articles: {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Empty state */}
        {!loading && !error && articles.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground">
              Articles will appear here once they are published.
            </p>
          </div>
        )}

        {/* Articles list */}
        {!loading && !error && articles.length > 0 && (
          <div className="space-y-10">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

function ArticleCard({ article }: { article: Article }) {
  // Create a preview of the content
  const contentPreview = article.excerpt || (article.content.length > 200
    ? `${article.content.substring(0, 200)}...`
    : article.content);

  return (
    <div className="group border-b pb-8 last:border-b-0">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Article image */}
        {article.imageUrl && (
          <div className="w-full md:w-1/3 aspect-video bg-muted overflow-hidden rounded-lg">
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ backgroundImage: `url(${article.imageUrl})` }}
            />
          </div>
        )}
        
        {/* Article content */}
        <div className="w-full md:w-2/3 space-y-4">
          <Link href={`/articles/${article.id}`} className="block">
            <h2 className="text-2xl font-semibold hover:text-primary transition-colors">
              {article.title}
            </h2>
          </Link>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDateSafe(article.createdAt)}</span>
          </div>
          
          <p className="text-muted-foreground">{contentPreview}</p>
          
          {/* Display tags if available */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <Link 
            href={`/articles/${article.id}`}
            className="inline-block text-sm font-medium text-primary hover:underline"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}
