'use client';

import { TechInsightsForm } from "@/components/forms/TechInsightsForm";
import { Button } from "@/components/ui/button";
import { TechInsightsInput } from "@/lib/graphql/types/techInsightsData.types";
import { useTechInsightsMutations } from "@/lib/hooks/useTechInsightsMutations";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewTechInsightPage() {
  const router = useRouter();
  const { createTechInsight, loading } = useTechInsightsMutations();

  const handleSubmit = async (data: TechInsightsInput) => {
    const result = await createTechInsight(data);
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
        <h1 className="text-3xl font-bold tracking-tight">Create New Tech Insight</h1>
      </div>

      <div className="max-w-3xl mx-auto">
        <TechInsightsForm
          onSubmit={handleSubmit}
          loading={loading.create}
          submitLabel="Create Tech Insight"
          cancelAction={() => router.push('/admin/tech-insights')}
        />
      </div>
    </div>
  );
}
