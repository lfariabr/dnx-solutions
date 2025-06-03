'use client';

import { useState } from 'react';
import { useCaseStudies } from '@/lib/hooks/useCaseStudies';
import { useCaseStudyMutations } from '@/lib/hooks/useCaseStudyMutations';
import { CaseStudy } from '@/lib/graphql/types/caseStudy.types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2, PlusCircle, Loader2, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminCaseStudiesPage() {
  const { caseStudies, loading: caseStudiesLoading, error } = useCaseStudies();
  const { 
    deleteCaseStudy, 
    isDeleting 
  } = useCaseStudyMutations();
  
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  // Handle case study deletion with confirmation
  const handleDeleteCaseStudy = async (caseStudy: CaseStudy) => {
    if (confirm(`Are you sure you want to delete "${caseStudy.title}"? This action cannot be undone.`)) {
      try {
        setDeletingId(caseStudy.id);
        await deleteCaseStudy(caseStudy.id);
        toast.success(`Case Study "${caseStudy.title}" deleted successfully`);
      } catch (error) {
        console.error('Error deleting case study:', error);
        toast.error('Failed to delete case study');
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (caseStudiesLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-muted-foreground">Loading case studies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <p className="text-destructive">Error loading case studies: {error}</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => router.refresh()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Case Studies</h1>
          <p className="text-muted-foreground">
            Manage your portfolio case studies
          </p>
        </div>
        <Link href="/admin/caseStudy/new">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            New Case Study
          </Button>
        </Link>
      </div>

      {caseStudies.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-[300px] text-center">
            <h3 className="text-lg font-semibold">No case studies yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first case study to showcase in your portfolio
            </p>
            <Link href="/admin/caseStudy/new">
              <Button>Create Case Study</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((caseStudy: CaseStudy) => (
            <Card key={caseStudy.id} className="overflow-hidden flex flex-col">
              <div className="aspect-video relative">
                {caseStudy.imageUrl && (
                  <Image
                    src={caseStudy.imageUrl}
                    alt={caseStudy.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{caseStudy.title}</CardTitle>
                <CardDescription className="line-clamp-2">{caseStudy.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex gap-3">
                  {caseStudy.githubUrl && (
                    <a 
                      href={caseStudy.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-muted-foreground hover:text-foreground flex items-center text-sm gap-1"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                  <a
                    href={`/case-studies/${caseStudy.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground flex items-center text-sm gap-1"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Live
                  </a>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Link href={`/admin/caseStudy/${caseStudy.id}/edit`}>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                </Link>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="gap-1"
                  onClick={() => handleDeleteCaseStudy(caseStudy)}
                  disabled={deletingId === caseStudy.id || isDeleting}
                >
                  {deletingId === caseStudy.id || isDeleting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
