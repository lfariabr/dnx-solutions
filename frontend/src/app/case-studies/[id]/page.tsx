'use client';

import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { useCaseStudy } from '@/lib/hooks/useCaseStudies';
import { AlertCircle, ArrowLeft, Calendar, ExternalLink, Github, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { format, parseISO, isValid } from 'date-fns';
import { notFound } from 'next/navigation';
import { MarkdownContent } from '@/components/layouts/MarkdownContent';

interface CaseStudyDetailPageProps {
  params: Promise<{ id: string }>;
}

// Format date safely with fallback
const formatDateSafe = (dateString: string) => {
  try {
    const date = parseISO(dateString);
    if (isValid(date)) {
      return format(date, 'MMMM dd, yyyy');
    }
    return 'Recently';
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Recently';
  }
};

export default function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  // Properly unwrap params with React.use() for Next.js 15
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  const { caseStudy, loading, error, notFound: caseStudyNotFound } = useCaseStudy(id);
  
  // If case study not found, show 404
  if (caseStudyNotFound) {
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
              Error loading case study: {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Case study details */}
        {!loading && !error && caseStudy && (
          <>
            <div className="mb-6 px-4">
              <Link href="/case-studies" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Case Studies
              </Link>
              
              <h1 className="text-4xl font-bold tracking-tight mt-2">{caseStudy.title}</h1>
              
              {caseStudy.subtitle && (
                <p className="text-xl text-muted-foreground mt-2">{caseStudy.subtitle}</p>
              )}
              
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Published {formatDateSafe(caseStudy.publishedAt || caseStudy.createdAt)}</span>
              </div>
            </div>

            {/* Case study image */}
            {caseStudy.imageUrl && (
              <div className="relative w-full rounded-lg overflow-hidden mb-8 px-4">
                <div 
                  className="aspect-video w-full bg-cover bg-center" 
                  style={{ backgroundImage: `url(${caseStudy.imageUrl})` }}
                />
              </div>
            )}

            {/* Technologies */}
            {caseStudy.technologies && caseStudy.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6 px-4">
                {caseStudy.technologies.map((tech: string, index: number) => (
                  <span 
                    key={index}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Main content */}
            <div className="prose dark:prose-invert max-w-none px-4 space-y-1">
              <MarkdownContent content={caseStudy.content} />
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
