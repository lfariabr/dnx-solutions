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
    return 'Recently';
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Recently';
  }
};

export default function TechInsightDetailPage({ params }: TechInsightDetailPageProps) {
  // Unwrap the params promise
  const { id } = React.use(params);
  const { techInsight, loading, error } = useTechInsight(id);

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-16 max-w-3xl mx-auto px-4">
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
        <div className="container py-16 max-w-3xl mx-auto px-4">
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
      <div className="container py-16 max-w-3xl mx-auto px-4">
        <div className="space-y-8">
          <div>
            <Link 
              href="/tech-insights" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tech Insights
            </Link>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">{techInsight.title}</h1>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Published {formatDateSafe(techInsight.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Tech insight image */}
          {techInsight.imageUrl && (
            <div className="rounded-lg overflow-hidden shadow-md">
              <div 
                className="aspect-video w-full bg-cover bg-center" 
                style={{ backgroundImage: `url(${techInsight.imageUrl})` }}
              />
            </div>
          )}

          {/* Tags */}
          {techInsight.categories && techInsight.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {techInsight.categories.map((category: string, index: number) => (
                <span 
                  key={index}
                  className="bg-muted text-foreground px-3 py-1 rounded-full text-sm font-medium"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          {/* Main content */}
          <div className="prose dark:prose-invert max-w-none pt-4">
            <MarkdownContent content={techInsight.content} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
