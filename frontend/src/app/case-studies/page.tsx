'use client';

import { MainLayout } from "@/components/layouts/MainLayout";
import { usePublishedCaseStudies } from "@/lib/hooks/useCaseStudies";
import { AlertCircle, Loader2, Calendar } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { format, parseISO, isValid } from "date-fns";
import { CaseStudy } from '@/lib/graphql/types/caseStudy.types';

// Format date safely with fallback
const formatDateSafe = (dateString: string, formatType: 'full' | 'distance' = 'full') => {
  if (!dateString) return '';
  
  try {
    // First try parsing as ISO date
    const date = parseISO(dateString);
    if (isValid(date)) {
      return formatType === 'distance' 
        ? `${format(date, 'MMM d, yyyy')}` 
        : format(date, 'MMMM d, yyyy');
    }
    
    // If it's not a valid ISO date, try direct Date constructor
    const fallbackDate = new Date(dateString);
    if (isValid(fallbackDate)) {
      return formatType === 'distance' 
        ? `${format(fallbackDate, 'MMM d, yyyy')}` 
        : format(fallbackDate, 'MMMM d, yyyy');
    }
    
    // If all parsing fails, return a fallback
    return formatType === 'distance' ? 'Recently' : 'Recently published';
  } catch (error) {
    console.error('Date formatting error:', error);
    return formatType === 'distance' ? 'Recently' : 'Recently published';
  }
};

export default function CaseStudiesPage() {
  const { caseStudies, loading, error } = usePublishedCaseStudies();

  return (
    <MainLayout>
      <div className="container py-12 max-w-6xl">
        <div className="space-y-2 mb-10 px-4">
          <h1 className="text-3xl font-bold tracking-tight">Case Studies</h1>
          <p className="text-muted-foreground">
            A showcase of our recent work and technical solutions for our clients.
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
              Error loading case studies: {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Empty state */}
        {!loading && !error && caseStudies.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-lg font-semibold mb-2">No case studies found</h3>
            <p className="text-muted-foreground">
              Case studies will appear here once they are added.
            </p>
          </div>
        )}

        {/* Case studies grid */}
        {!loading && caseStudies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {caseStudies.map((caseStudy: CaseStudy) => (
              <Link 
                key={caseStudy.id} 
                href={`/case-studies/${caseStudy.id}`}
                className="group"
              >
                <article className="h-full flex flex-col overflow-hidden rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                  {caseStudy.imageUrl && (
                    <div className="relative h-48 w-full">
                      <div 
                        className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url(${caseStudy.imageUrl})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>
                  )}
                  
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {caseStudy.title}
                      </h3>
                      {caseStudy.description && (
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {caseStudy.description}
                        </p>
                      )}
                      {caseStudy.technologies && caseStudy.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2 mb-4">
                          {caseStudy.technologies.slice(0, 3).map((tech, i) => (
                            <span 
                              key={i} 
                              className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {caseStudy.technologies.length > 3 && (
                            <span className="text-xs px-2 py-1 text-muted-foreground">
                              +{caseStudy.technologies.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDateSafe(caseStudy.publishedAt || caseStudy.createdAt, 'distance')}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}