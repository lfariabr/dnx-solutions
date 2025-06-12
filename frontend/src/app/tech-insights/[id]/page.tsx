'use client';

import React from "react";
import { MainLayout } from "@/components/layouts/MainLayout";
import { useTechInsight } from "@/lib/hooks/useTechInsights";
import { AlertCircle, ArrowLeft, Calendar, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { format, parseISO, isValid } from "date-fns";
import { notFound } from "next/navigation";
import { MarkdownContent } from '@/components/layouts/MarkdownContent';

interface TechInsightDetailPageProps {
  params: Promise<{ id: string }>;
}

// Format date safely with fallback
const formatDateSafe = (dateString: string) => {
  try {
    const date = parseISO(dateString);
    if (isValid(date)) {
      return format(date, 'MMMM d, yyyy');
    }
    return 'Unknown date';
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Unknown date';
  }
};

export default function TechInsightDetailPage({ params }: TechInsightDetailPageProps) {
  // Unwrap the params promise
  const { id } = React.use(params);
  const { techInsight, loading, error } = useTechInsight(id);

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-12 max-w-4xl px-4">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container py-12 max-w-4xl">
          <Alert variant="destructive" className="my-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Error loading tech insight: {error}</AlertDescription>
          </Alert>
        </div>
      </MainLayout>
    );
  }

  if (!techInsight) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="container py-12 max-w-4xl px-4">
        <Link 
          href="/tech-insights" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tech Insights
        </Link>

        <article className="prose dark:prose-invert max-w-none">
          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {techInsight.title}
            </h1>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Published {formatDateSafe(techInsight.createdAt)}</span>
            </div>

            {techInsight.categories && techInsight.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {techInsight.categories.map((category, index) => (
                  <span 
                    key={index}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
          </header>

          {techInsight.imageUrl && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={techInsight.imageUrl} 
                alt={techInsight.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}

          {/* Article content */}
          <div className="prose dark:prose-invert max-w-none px-4 space-y-1">
            <MarkdownContent content={techInsight.content} />
            </div>
        </article>
      </div>
    </MainLayout>
  );
}
