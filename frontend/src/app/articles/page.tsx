import { MainLayout } from "@/components/layouts/MainLayout";
import { formatDistanceToNow } from "date-fns";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: Date;
  readingTime: string;
  tags: string[];
}

// Placeholder data - will be replaced with GraphQL queries
const ARTICLES: Article[] = [
  {
    id: "1",
    title: "Building Scalable GraphQL APIs with Apollo Server",
    excerpt: "Learn how to build production-ready GraphQL APIs that can handle high traffic and complex data requirements.",
    coverImage: "/images/articles/graphql-api.jpg",
    date: new Date(2025, 4, 15),
    readingTime: "8 min read",
    tags: ["GraphQL", "Apollo", "Backend", "API"]
  },
  {
    id: "2",
    title: "Next.js 14: The Future of React Applications",
    excerpt: "Exploring the latest features in Next.js 14 and how they improve developer experience and application performance.",
    coverImage: "/images/articles/nextjs.jpg",
    date: new Date(2025, 3, 22),
    readingTime: "6 min read",
    tags: ["Next.js", "React", "Frontend", "Performance"]
  },
  {
    id: "3",
    title: "Implementing Secure Authentication with JWT",
    excerpt: "A comprehensive guide to implementing JWT-based authentication in your web applications with best security practices.",
    coverImage: "/images/articles/jwt-auth.jpg",
    date: new Date(2025, 2, 10),
    readingTime: "10 min read",
    tags: ["Security", "Authentication", "JWT", "Backend"]
  },
  {
    id: "4",
    title: "Docker and CI/CD: A Modern DevOps Approach",
    excerpt: "How to leverage Docker containers and CI/CD pipelines to streamline your development and deployment processes.",
    coverImage: "/images/articles/docker-cicd.jpg",
    date: new Date(2025, 1, 5),
    readingTime: "12 min read",
    tags: ["DevOps", "Docker", "CI/CD", "GitHub Actions"]
  },
  {
    id: "5",
    title: "Building Accessible UIs with shadcn/ui and Tailwind",
    excerpt: "Learn how to create beautiful, accessible user interfaces using shadcn/ui components and Tailwind CSS.",
    coverImage: "/images/articles/shadcn-ui.jpg",
    date: new Date(2024, 11, 20),
    readingTime: "7 min read",
    tags: ["Accessibility", "UI/UX", "TailwindCSS", "React"]
  }
];

export default function ArticlesPage() {
  return (
    <MainLayout>
      <div className="container py-12 max-w-4xl">
        <div className="space-y-2 mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
          <p className="text-muted-foreground">
            Thoughts, insights, and tutorials on web development and software engineering.
          </p>
        </div>

        <div className="space-y-8">
          {ARTICLES.map((article) => (
            <div 
              key={article.id}
              className="group flex flex-col md:flex-row gap-6 rounded-lg border bg-card text-card-foreground p-4 shadow hover:shadow-md transition-all"
            >
              <div className="w-full md:w-1/3 h-40 bg-muted rounded-md relative overflow-hidden">
                {/* Placeholder for article image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/80 flex items-center justify-center text-xl font-bold p-4 text-center">
                  {article.title.split(" ").slice(0, 3).join(" ")}...
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <time dateTime={article.date.toISOString()}>
                    {formatDistanceToNow(article.date, { addSuffix: true })}
                  </time>
                  <span>•</span>
                  <span>{article.readingTime}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  <a href={`/articles/${article.id}`} className="hover:underline">
                    {article.title}
                  </a>
                </h2>
                <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
