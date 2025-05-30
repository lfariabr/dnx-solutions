import Link from "next/link";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cloud, Server, Cpu, BarChart2, CheckCircle } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Cloud className="h-8 w-8 text-blue-600" />,
      title: "Cloud Migration",
      description: "Seamless transition to the cloud with minimal disruption"
    },
    {
      icon: <Server className="h-8 w-8 text-blue-600" />,
      title: "Managed Services",
      description: "24/7 monitoring and support for your cloud infrastructure"
    },
    {
      icon: <Cpu className="h-8 w-8 text-blue-600" />,
      title: "DevOps Transformation",
      description: "Accelerate delivery with modern DevOps practices"
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-blue-600" />,
      title: "Data Solutions",
      description: "Leverage your data with advanced analytics and AI"
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 to-blue-700 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        <div className="container relative px-6 py-24 mx-auto text-center">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Leading the way in <span className="text-blue-300">Cloud Modernisation</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-xl text-blue-100">
            Accelerate your cloud computing journey whether you're adopting, evolving, or operating cloud solutions.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              <Link href="/contact">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              <Link href="/solutions">
                Explore Solutions
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              AWS Premier Consulting Partner
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              We help businesses of all sizes transform their operations with cloud technology
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="p-6 transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-md">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 dark:bg-blue-900/30">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-center text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container px-6 mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Ready to transform your business with cloud technology?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Our team of certified AWS experts is here to help you every step of the way.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 mt-8 sm:flex-row">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/contact">
                  Contact Us Today
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-white dark:border-white dark:hover:bg-white/10">
                <Link href="/case-studies">
                  View Case Studies
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}