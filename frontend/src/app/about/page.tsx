'use client';

import { MainLayout } from "@/components/layouts/MainLayout";

const AboutPage = () => {
  const values = [
    "Make complex environments simple",
    "Build a positive, optimistic, and welcoming atmosphere",
    "Work with complementary innovative technologies",
    "Take care of people",
    "Extend the circle of trust and safety"
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-6">
            Our mission is to democratise cloud technology
          </h1>
          <p className="text-xl text-muted-foreground mx-auto max-w-3xl">
            As we say, it's all about people! Our team combines years of knowledge and a commitment to enable our clients to prepare, evolve, and design their businesses to embrace the future!
          </p>
        </div>

        {/* Key Focus Areas */}
        <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-6xl mx-auto">
          <div className="bg-muted/30 p-8 rounded-lg h-full hover:bg-muted/50 transition-colors">
            <h2 className="text-2xl font-bold mb-4 text-center">Knowledge Sharing</h2>
            <p className="text-muted-foreground text-center">
              We are people who love to learn, iterate, build, and design new things. More than this, we are committed to sharing this knowledge to enable the evolution and empowerment of our community.
            </p>
          </div>
          
          <div className="bg-muted/30 p-8 rounded-lg h-full hover:bg-muted/50 transition-colors">
            <h2 className="text-2xl font-bold mb-4 text-center">It's all about people</h2>
            <p className="text-muted-foreground text-center">
              In the end, we are just people helping people! That is why we have to understand the needs of our customers, employees, and partners to help them genuinely.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Values that move us daily</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-colors">
                <p className="text-muted-foreground text-center">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
