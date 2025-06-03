'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCaseStudyMutations } from '@/lib/hooks/useCaseStudyMutations';
import { CaseStudyUpdateInput } from '@/lib/graphql/types/caseStudy.types';
import CaseStudyForm from '@/components/caseStudy/CaseStudyForm';
import { useCaseStudy } from '@/lib/hooks/useCaseStudies';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EditCaseStudyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditCaseStudyPage({ params }: EditCaseStudyPageProps) {
  // Properly unwrap params with React.use() for Next.js 15
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateCaseStudy } = useCaseStudyMutations();
  const { caseStudy, loading, error } = useCaseStudy(id);
  const router = useRouter();
  
  const handleUpdateCaseStudy = async (caseStudyData: CaseStudyUpdateInput) => {
    try {
      setIsSubmitting(true);
      await updateCaseStudy(id, caseStudyData);
      router.push('/admin/caseStudy');
      // Success toast is handled in the useCaseStudyMutations hook
    } catch (error) {
      // Error toast is handled in the useCaseStudyMutations hook
      console.error('Error updating case study:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-muted-foreground">Loading case study...</p>
      </div>
    );
  }

  // Error state
  if (error || !caseStudy) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <p className="text-destructive">
          {error ? `Error loading case study: ${error}` : 'Case study not found'}
        </p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => router.push('/admin/caseStudy')}
        >
          Return to Case Studies
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Case Study</h1>
        <p className="text-muted-foreground">
          Update case study "{caseStudy.title}"
        </p>
      </div>
      
      <div className="max-w-2xl">
        <CaseStudyForm 
          caseStudy={caseStudy}
          onSubmit={handleUpdateCaseStudy}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
