'use client';

import React from "react";
import { TechInsightsForm } from "@/components/forms/TechInsightsForm";
import { Button } from "@/components/ui/button";
import { TechInsightsUpdateInput } from "@/lib/graphql/types/techInsightsData.types";
import { useTechInsightsMutations } from "@/lib/hooks/useTechInsightsMutations";
import { useTechInsight } from "@/lib/hooks/useTechInsights";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { notFound } from "next/navigation";

interface EditTechInsightsPageProps {
  params: Promise<{ id: string }>;
}

export default function EditTechInsightsPage({ params }: EditTechInsightsPageProps) {
  // Properly unwrap params with React.use() for Next.js 15
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  const router = useRouter();
  const { techInsight, loading: techInsightLoading, error } = useTechInsight(id);
  const { updateTechInsight, loading } = useTechInsightsMutations();

  // If techInsight not found, show 404
  if (techInsight === null) {
    notFound();
  }

  const handleSubmit = async (data: TechInsightsUpdateInput) => {
    const result = await updateTechInsight(id, data);
    if (result) {
      router.push('/admin/tech-insights');
    }
  };

  return (
    <div className="container py-10">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="sm" asChild className="mr-4">
          <Link href="/admin/tech-insights" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Tech Insights
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Tech Insight</h1>
      </div>

      {/* Loading state */}
      {techInsightLoading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Error state */}
      {error && (
        <Alert variant="destructive" className="my-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading tech insight: {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Edit form */}
      {!techInsightLoading && !error && techInsight && (
        <div className="max-w-3xl mx-auto">
          <TechInsightsForm
            techInsights={techInsight}
            onSubmit={handleSubmit}
            loading={loading.update}
            submitLabel="Update Tech Insight"
            cancelAction={() => router.push('/admin/tech-insights')}
          />
        </div>
      )}
    </div>
  );
}
