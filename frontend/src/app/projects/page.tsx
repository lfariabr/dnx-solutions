import { MainLayout } from "@/components/layouts/MainLayout";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
}

// Placeholder data - will be replaced with GraphQL queries
const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Portfolio Website",
    description: "A modern portfolio website built with Next.js, GraphQL, and MongoDB.",
    imageUrl: "/images/projects/portfolio.jpg",
    tags: ["Next.js", "GraphQL", "MongoDB", "TailwindCSS"],
    githubUrl: "https://github.com/yourusername/portfolio",
    demoUrl: "https://yourportfolio.com"
  },
  {
    id: "2",
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
    imageUrl: "/images/projects/ecommerce.jpg",
    tags: ["React", "Node.js", "Stripe", "Redux"],
    githubUrl: "https://github.com/yourusername/ecommerce",
    demoUrl: "https://yourecommerce.com"
  },
  {
    id: "3",
    title: "AI-powered Task Manager",
    description: "A task management application that uses AI to prioritize and categorize tasks.",
    imageUrl: "/images/projects/taskmanager.jpg",
    tags: ["Python", "TensorFlow", "React", "FastAPI"],
    githubUrl: "https://github.com/yourusername/taskmanager"
  },
  {
    id: "4",
    title: "Blockchain Voting System",
    description: "A secure voting system built on blockchain technology to ensure transparency and security.",
    imageUrl: "/images/projects/blockchain.jpg",
    tags: ["Ethereum", "Solidity", "Web3.js", "React"],
    githubUrl: "https://github.com/yourusername/blockvote"
  }
];

export default function ProjectsPage() {
  return (
    <MainLayout>
      <div className="container py-12 max-w-6xl">
        <div className="space-y-2 mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            A showcase of my recent development work and technical projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <div 
              key={project.id}
              className="group rounded-lg border overflow-hidden bg-card text-card-foreground shadow hover:shadow-lg transition-all"
            >
              <div className="aspect-video w-full bg-muted relative overflow-hidden">
                {/* Placeholder for project image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/80 flex items-center justify-center text-2xl font-bold">
                  {project.title}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
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
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                    >
                      Live Demo
                    </a>
                  )}
                  <a 
                    href={`/projects/${project.id}`}
                    className="text-sm font-medium hover:underline ml-auto"
                  >
                    View Details →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
