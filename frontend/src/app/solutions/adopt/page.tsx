'use client';

import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layouts/MainLayout";
import Link from "next/link";
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Settings, 
  GitBranch,
  Cloud,
  BarChart2,
  Clock,
  Code2,
  ServerCog
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { ContactDialog } from "@/components/ui/contact-dialog";

const solutions = [
  {
    title: "Well-Architected Review",
    description: "Assess and improve your cloud architecture based on AWS best practices.",
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
    href: "/solutions/adopt/well-architected-review",
    features: ["AWS best practices", "Architecture assessment", "Risk identification"],
    cta: "Start Review"
  },
  {
    title: "Cloud Migration",
    description: "Seamlessly migrate your applications and data to the cloud.",
    icon: <Cloud className="w-8 h-8 text-blue-600" />,
    href: "/solutions/adopt/cloud-migration",
    features: ["Workload assessment", "Migration planning", "Minimal downtime"],
    cta: "Migrate Now"
  },
  {
    title: "Cost Optimization",
    description: "Reduce your cloud spend while maintaining performance.",
    icon: <BarChart2 className="w-8 h-8 text-blue-600" />,
    href: "/solutions/adopt/cost-optimization",
    features: ["Cost analysis", "Resource optimization", "Savings plans"],
    cta: "Optimize Costs"
  },
  {
    title: "DevOps Transformation",
    description: "Accelerate your software delivery with DevOps practices.",
    icon: <GitBranch className="w-8 h-8 text-blue-600" />,
    href: "/solutions/adopt/devops-transformation",
    features: ["CI/CD pipelines", "Infrastructure as Code", "Automation"],
    cta: "Transform Now"
  },
  {
    title: "Cloud-Native Development",
    description: "Build scalable and resilient cloud-native applications.",
    icon: <Code2 className="w-8 h-8 text-blue-600" />,
    href: "/solutions/adopt/cloud-native",
    features: ["Microservices", "Containers", "Serverless"],
    cta: "Build Cloud-Native"
  },
  {
    title: "Managed Cloud Services",
    description: "Let us manage your cloud infrastructure so you can focus on your business.",
    icon: <ServerCog className="w-8 h-8 text-blue-600" />,
    href: "/solutions/adopt/managed-services",
    features: ["24/7 Monitoring", "Proactive maintenance", "Expert support"],
    cta: "Learn More"
  }
];

const SolutionsAdoptPage = () => {
  return (
    <MainLayout>
      <main className="bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-black">
          <div className="container py-16 mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Adopt Cloud Solutions
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Accelerate your cloud journey with our comprehensive adoption services. 
                From initial assessment to full implementation, we've got you covered.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="#solutions">
                    Explore Solutions <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <ContactDialog>
                    Talk to an Expert
                  </ContactDialog>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section id="solutions" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Our Adoption Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose from our range of cloud adoption services designed to meet your business needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <Card key={index} className="h-full flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-start space-x-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      {solution.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{solution.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {solution.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      {solution.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full" variant="outline">
                      <Link href={solution.href}>
                        {solution.cta} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Adopt Cloud?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our cloud experts are ready to help you navigate your cloud adoption journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact-us">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                <Link href="/solutions">
                  View All Solutions
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default SolutionsAdoptPage;
