import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Building2, RefreshCw } from 'lucide-react';
import { JSX } from 'react';

type AudienceItem = {
  title: string;
  description: string;
  icon: JSX.Element;
};

const audience: AudienceItem[] = [
  {
    title: 'Startups',
    description: 'To validate proposed architecture before building, scaling, or growing.',
    icon: <Rocket className="h-6 w-6 text-blue-600" />,
  },
  {
    title: 'Horizon Enterprise',
    description: 'To safely meet financial risk and compliance requirements as the business grows from being a startup.',
    icon: <Building2 className="h-6 w-6 text-blue-600" />,
  },
  {
    title: 'Transforming Enterprise',
    description: 'To deliver products with the agility of a startup while respecting enterprise risk and compliance requirements.',
    icon: <RefreshCw className="h-6 w-6 text-blue-600" />,
  },
];

export function WhoIsItFor() {
  return (
    <div className="py-16 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Who is Well-Architected Review for?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audience.map((item, index) => (
            <Card key={index} className="h-full border-t-4 border-blue-600 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  {item.icon}
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
