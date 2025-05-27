'use client';

import { MainLayout } from "@/components/layouts/MainLayout";
import { useArticle } from "@/lib/hooks/useArticles";
import { AlertCircle, ArrowLeft, Calendar, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { format } from "date-fns";
import { notFound } from "next/navigation";

export default function ArticleDetailPage({ params }: { params: { id: string } }) {
  const { article, loading, error, notFound: articleNotFound } = useArticle(params.id);
  
  // If article not found, show 404
  if (articleNotFound) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="container py-12 max-w-4xl">
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
              Error loading article: {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Article content */}
        {!loading && !error && article && (
          <>
            <div className="mb-8">
              <Link href="/articles" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Articles
              </Link>
              
              <h1 className="text-4xl font-bold tracking-tight mt-4 mb-4">{article.title}</h1>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <time dateTime={article.createdAt}>
                  {format(new Date(article.createdAt), 'MMMM d, yyyy')}
                </time>
              </div>
            </div>

            {/* Article featured image */}
            {article.imageUrl && (
              <div className="relative w-full rounded-lg overflow-hidden mb-8">
                <div 
                  className="aspect-video w-full bg-cover bg-center" 
                  style={{ backgroundImage: `url(${article.imageUrl})` }}
                />
              </div>
            )}

            {/* Article content */}
            <div className="prose dark:prose-invert max-w-none">
              {/* Split content by newlines and create paragraphs */}
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
