'use client';

import { MainLayout } from "@/components/layouts/MainLayout";
import { usePublishedTechInsights } from "@/lib/hooks/useTechInsights";
import { TechInsights } from "@/lib/graphql/types/techInsightsData.types";
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

export default function TechInsightsPage() {
  const { techInsights, loading, error } = usePublishedTechInsights();

  return (
    <MainLayout>
      <div className="container py-12 max-w-6xl">
        <div className="space-y-2 mb-10 px-4">
          <h1 className="text-3xl font-bold tracking-tight">Tech Insights</h1>
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
        {!loading && !error && techInsights.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-lg font-semibold mb-2">No tech insights found</h3>
            <p className="text-muted-foreground">
              Tech insights will appear here once they are published.
            </p>
          </div>
        )}

        {/* Tech insights list */}
        {!loading && !error && techInsights.length > 0 && (
          <div className="space-y-10 px-4">
            {techInsights.map((techInsight) => (
              <TechInsightsCard key={techInsight.id} techInsight={techInsight} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

function TechInsightsCard({ techInsight }: { techInsight: TechInsights }) {
  // Create a preview of the content
  const contentPreview = techInsight.excerpt || (techInsight.content.length > 200
    ? `${techInsight.content.substring(0, 200)}...`
    : techInsight.content);

  return (
    <Link href={`/tech-insights/${techInsight.id}`} className="block group border-b pb-8 last:border-b-0">
      <div className="flex flex-col md:flex-row gap-6 relative">
        {/* Tech insight image */}
        {techInsight.imageUrl && (
          <div className="w-full md:w-1/3 aspect-video bg-muted overflow-hidden rounded-lg">
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ backgroundImage: `url(${techInsight.imageUrl})` }}
            />
          </div>
        )}
        
        {/* Tech insight content */}
        <div className="w-full md:w-2/3 space-y-4">
          <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">
            {techInsight.title}
          </h2>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDateSafe(techInsight.createdAt)}</span>
          </div>
          
          <p className="text-muted-foreground">{contentPreview}</p>
          
          {/* Display tags if available */}
          {techInsight.tags && techInsight.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {techInsight.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <span className="inline-block text-sm font-medium text-primary hover:underline">
            Read more
          </span>
        </div>

        {/* Overlay for better click handling */}
        <span className="absolute inset-0 z-10" aria-hidden="true" />
      </div>
    </Link>
  );
}
