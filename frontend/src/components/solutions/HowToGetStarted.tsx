import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckCircle2, DollarSign } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    title: 'Schedule the Well-Architected Review session',
    description: 'Book-in a date and time to get started with your session.',
    icon: <Calendar className="h-8 w-8 text-blue-600" />,
  },
  {
    title: 'Get your remediation plan and roadmap',
    description: 'We provide the plan for short, medium, and long-term work.',
    icon: <CheckCircle2 className="h-8 w-8 text-blue-600" />,
  },
  {
    title: 'Funding is available*',
    description: 'Get a head-start with funding from AWS.',
    note: '*Funding is available to help you offset the cost of remediating those HRIs found in the Well-Architected Review.',
    icon: <DollarSign className="h-8 w-8 text-blue-600" />,
  },
];

export function HowToGetStarted() {
  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">How to get started</h2>
        <p className="text-xl text-center text-muted-foreground mb-12">
          Follow these simple steps to begin your cloud optimization journey
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <Card className="relative h-full">
                <CardHeader className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                    {step.icon}
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  {step.note && (
                    <p className="text-xs text-muted-foreground italic">{step.note}</p>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-md hover:from-blue-700 hover:to-blue-600 transition-colors shadow-lg"
          >
            Schedule Your Review Now
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            Limited time offer: Get a free initial consultation
          </p>
        </div>
      </div>
    </div>
  );
}
