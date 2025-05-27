'use client';

import { MainLayout } from "@/components/layouts/MainLayout";
import { usePublishedArticles } from "@/lib/hooks/useArticles";
import { Article } from "@/lib/graphql/types/article.types";
import { AlertCircle, Calendar, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { format } from "date-fns";

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
          <div className="grid grid-cols-1 gap-8">
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
  // Format the date
  const formattedDate = format(new Date(article.createdAt), 'MMMM d, yyyy');
  
  // Create a preview of the content
  const contentPreview = article.content.length > 200
    ? `${article.content.substring(0, 200)}...`
    : article.content;

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
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
            <Link href={`/articles/${article.id}`}>
              {article.title}
            </Link>
          </h2>
          
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
          
          <p className="text-muted-foreground mb-4">
            {contentPreview}
          </p>
          
          <Link 
            href={`/articles/${article.id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
}
