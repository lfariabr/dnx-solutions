// TypeScript interfaces for Project data

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectsData {
  projects: Project[];
}

export interface FeaturedProjectsData {
  featuredProjects: Project[];
}

export interface ProjectData {
  project: Project;
}

export interface ProjectVars {
  id: string;
}
