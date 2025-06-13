'use client';

import { MainLayout } from "@/components/layouts/MainLayout";

const CareersPage = () => {
  const benefits = [
    {
      title: "Flexible work arrangements",
      description: "Real life and nine-to-five don't always match."
    },
    {
      title: "Casual & fun workplace vibe",
      description: "We work hard, but we're still real people. We value keeping up the good vibes."
    },
    {
      title: "Professional development (for real)",
      description: "You'll be supported to grow professionally with real, applicable knowledge and skills."
    },
    {
      title: "Wellness and sports initiatives",
      description: "We understand that a healthy person needs wellness in mind, body, and spirit."
    },
    {
      title: "Knowledge portal & certification centre",
      description: "Our repository of knowledge and learning is a key part of our sharing culture"
    }
  ];

  const openPositions = [
    {
      title: "Enterprise Sales Executive",
      location: "Sydney, Australia | Remote",
      type: "Full-time",
      description: "We're looking for a dynamic Enterprise Sales Executive to drive our growth in the enterprise market.",
      responsibilities: [
        "Develop and execute sales strategies to achieve revenue targets",
        "Build a robust pipeline of prospective enterprise customers",
        "Establish strong, trusted relationships with decision-makers",
        "Lead the negotiation of complex enterprise deals",
        "Provide market insights and regular sales updates"
      ]
    },
    {
        title: "DevOps Engineer",
        location: "Sydney, Australia | Remote",
        type: "Part-time",
        description: "We're looking for a dynamic DevOps Engineer to drive our growth in the enterprise market.",
        responsibilities: [
          "Design and implement CI/CD pipelines for our applications",
          "Monitor and optimize our infrastructure for performance and cost efficiency",
          "Troubleshoot and resolve issues in our production environment",
          "Collaborate with our development team to improve our deployment processes",
          "Stay up-to-date with the latest DevOps tools and technologies"
        ]
      }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-6">
            Joining DNX will take you on the best adventure of your career
          </h1>
          <p className="text-xl text-muted-foreground mx-auto max-w-3xl">
            We're looking for people who are powered by passion and eager to leave a mark on the tech world, without missing all the fun.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why work with us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-muted/30 p-6 rounded-lg h-full hover:bg-muted/50 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-center">{benefit.title}</h3>
                <p className="text-muted-foreground text-center">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold">{position.title}</h3>
                    <div className="flex items-center space-x-4 text-muted-foreground mt-1 justify-center md:justify-start">
                      <span>{position.location}</span>
                      <span>•</span>
                      <span>{position.type}</span>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4 md:mt-0">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>
                <p className="mb-4 text-center md:text-left">{position.description}</p>
                <h4 className="font-semibold mb-2 text-center md:text-left">Key Responsibilities:</h4>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  {position.responsibilities.map((item, i) => (
                    <li key={i} className="text-center md:text-left">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center max-w-4xl mx-auto">
          <p className="text-lg mb-6">Don't see a role that fits? We're always looking for great talent!</p>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Send Us Your Resume
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default CareersPage;
