'use client';

import { MainLayout } from "@/components/layouts/MainLayout";
import { useProjects } from "@/lib/hooks/useProjects";
import { Project } from "@/lib/graphql/types/project.types";
import { AlertCircle, Loader2, Calendar } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { formatDistanceToNow, parseISO, isValid } from "date-fns";

export default function ProjectsPage() {
  const { projects, loading, error } = useProjects();

  return (
    <MainLayout>
      <div className="container py-12 max-w-6xl">
        <div className="space-y-2 mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            A showcase of my recent development work and technical projects.
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
              Error loading projects: {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Empty state */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              Projects will appear here once they are added.
            </p>
          </div>
        )}

        {/* Projects grid */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

// Format date safely with fallback
const formatDateSafe = (dateString: string) => {
  try {
    // First try to parse the ISO string
    const date = parseISO(dateString);
    
    // Check if the result is a valid date
    if (isValid(date)) {
      return `${formatDistanceToNow(date)} ago`;
    }
    
    // If it's not a valid ISO date, try direct Date constructor
    const fallbackDate = new Date(dateString);
    if (isValid(fallbackDate)) {
      return `${formatDistanceToNow(fallbackDate)} ago`;
    }
    
    // If all parsing fails, return a fallback
    return 'recently';
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'recently';
  }
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-lg border overflow-hidden bg-card text-card-foreground shadow hover:shadow-lg transition-all">
      <div className="aspect-video w-full bg-muted relative overflow-hidden">
        {/* Project image or placeholder */}
        {project.imageUrl ? (
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${project.imageUrl})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/80 flex items-center justify-center text-2xl font-bold">
            {project.title}
          </div>
        )}
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
        <p className="text-muted-foreground mb-4">
          {project.description.length > 150
            ? `${project.description.substring(0, 150)}...`
            : project.description}
        </p>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Updated {formatDateSafe(project.updatedAt)}</span>
        </div>
        
        <div className="flex gap-3 mt-4">
          {project.githubUrl && (
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:underline"
            >
              GitHub
            </a>
          )}
          
          <Link 
            href={`/projects/${project.id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View Details
          </Link>
        </div>
        
        {/* Technology tags */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
            {project.technologies.map((tech, i) => (
              <span 
                key={i}
                className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
