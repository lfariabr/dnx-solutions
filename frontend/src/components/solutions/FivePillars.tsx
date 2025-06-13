import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Zap, Gauge, DollarSign, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const pillars = [
  {
    title: 'Security',
    description: 'Ensure confidentiality of data, protect systems, and detect cloud security events.',
    icon: <Shield className="h-8 w-8 text-blue-600" />,
    link: 'https://dnx.solutions/xsecure-cloud-solution/',
  },
  {
    title: 'Operational Excellence',
    description: 'Focus on running and monitoring systems to deliver optimised business value.',
    icon: <Zap className="h-8 w-8 text-blue-600" />,
  },
  {
    title: 'Performance Efficiency',
    description: 'Use resources efficiently by selecting the right resource types and sizes.',
    icon: <Gauge className="h-8 w-8 text-blue-600" />,
  },
  {
    title: 'Cost Optimisation',
    description: 'Avoid unnecessary costs – understand and control where money is being spent.',
    icon: <DollarSign className="h-8 w-8 text-blue-600" />,
  },
  {
    title: 'Reliability',
    description: 'Ensure a workload performs its intended function correctly and when expected.',
    icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
  },
];

export function FivePillars() {
  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          The five pillars of AWS Well-Architected Framework
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {pillars.map((pillar, index) => (
            <Card key={index} className="h-full flex flex-col transition-transform hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{pillar.title}</CardTitle>
                {pillar.icon}
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">
                  {pillar.description}
                  {pillar.link && (
                    <Link 
                      href={pillar.link} 
                      className="text-blue-600 hover:underline ml-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn more
                    </Link>
                  )}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}
