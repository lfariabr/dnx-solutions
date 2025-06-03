'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCaseStudyMutations } from '@/lib/hooks/useCaseStudyMutations';
import { CaseStudyInput } from '@/lib/graphql/types/caseStudy.types';
import CaseStudyForm from '@/components/caseStudy/CaseStudyForm';
import { toast } from 'sonner';

export default function NewCaseStudyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createCaseStudy } = useCaseStudyMutations();
  const router = useRouter();
  
  const handleCreateCaseStudy = async (caseStudyData: CaseStudyInput) => {
    try {
      setIsSubmitting(true);
      await createCaseStudy(caseStudyData);
      router.push('/admin/caseStudy');
      // Success toast is handled in the useCaseStudyMutations hook
    } catch (error) {
      // Error toast is handled in the useCaseStudyMutations hook
      console.error('Error creating case study:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Case Study</h1>
        <p className="text-muted-foreground">
          Add a new case study to your portfolio
        </p>
      </div>
      
      <div className="max-w-2xl">
        <CaseStudyForm 
          onSubmit={handleCreateCaseStudy}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
