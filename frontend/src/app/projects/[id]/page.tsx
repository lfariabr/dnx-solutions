'use client';

import { MainLayout } from "@/components/layouts/MainLayout";
import { useProject } from "@/lib/hooks/useProjects";
import { AlertCircle, ArrowLeft, Calendar, Github, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { notFound } from "next/navigation";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { project, loading, error, notFound: projectNotFound } = useProject(params.id);
  
  // If project not found, show 404
  if (projectNotFound) {
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
              Error loading project: {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Project details */}
        {!loading && !error && project && (
          <>
            <div className="mb-6">
              <Link href="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
              
              <h1 className="text-4xl font-bold tracking-tight mt-2">{project.title}</h1>
              
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Updated {formatDistanceToNow(new Date(project.updatedAt))} ago</span>
              </div>
            </div>

            {/* Project image */}
            {project.imageUrl && (
              <div className="relative w-full rounded-lg overflow-hidden mb-8">
                <div 
                  className="aspect-video w-full bg-cover bg-center" 
                  style={{ backgroundImage: `url(${project.imageUrl})` }}
                />
              </div>
            )}

            {/* Description */}
            <div className="prose dark:prose-invert max-w-none mb-8">
              <p className="text-lg">{project.description}</p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </Button>
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
