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
      <div className="container py-16 max-w-4xl mx-auto px-4">
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
          <div className="space-y-8">
            <div>
              <Link 
                href="/case-studies" 
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Case Studies
              </Link>
              
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">{caseStudy.title}</h1>
                
                {caseStudy.subtitle && (
                  <p className="text-xl text-muted-foreground">{caseStudy.subtitle}</p>
                )}
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Published {formatDateSafe(caseStudy.publishedAt || caseStudy.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Case study image */}
            {caseStudy.imageUrl && (
              <div className="rounded-lg overflow-hidden shadow-md">
                <div 
                  className="aspect-video w-full bg-cover bg-center" 
                  style={{ backgroundImage: `url(${caseStudy.imageUrl})` }}
                />
              </div>
            )}

            {/* Technologies */}
            {caseStudy.technologies && caseStudy.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {caseStudy.technologies.map((tech: string, index: number) => (
                  <span 
                    key={index}
                    className="bg-muted text-foreground px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Main content */}
            <div className="prose dark:prose-invert max-w-none pt-4">
              <MarkdownContent content={caseStudy.content} />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
