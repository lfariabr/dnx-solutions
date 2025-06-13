import React from 'react'
import { Metadata } from 'next';
import { WARHero } from '@/components/solutions/WARHero';
import { FivePillars } from '@/components/solutions/FivePillars';
import { WhoIsItFor } from '@/components/solutions/WhoIsItFor';
import { HowToGetStarted } from '@/components/solutions/HowToGetStarted';
import { MainLayout } from '@/components/layouts/MainLayout';
import { ContactDialog } from '@/components/ui/contact-dialog';

export const metadata: Metadata = {
  title: 'AWS Well-Architected Review | DNX Solutions',
  description: 'Your Cloud Journey experience begins here. Uncover how your cloud architecture adheres to the AWS Well-Architected standard.',
  keywords: ['AWS Well-Architected', 'Cloud Architecture', 'AWS Review', 'Cloud Assessment', 'AWS Cloud'],
};

export default function WellArchitectureReviewPage() {
  return (
    <MainLayout>
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <WARHero />
      
      {/* About Section */}
      <section id="about" className="py-16 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              About Well-Architected Review
            </h2>
            <div className="prose dark:prose-invert max-w-none text-lg">
              <p className="mb-6">
                Well-Architected Review is a current-state assessment of your workflow and application as benchmarked by AWS Well-Architected best practices. It helps you understand how well your workloads align with cloud best practices and provides guidance to make them more secure, high-performing, resilient, and efficient.
              </p>
              <p>
                Our certified AWS Well-Architected Partners will work with your team to identify high-risk issues (HRIs) and provide actionable recommendations to improve your cloud architecture.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Five Pillars Section */}
      <FivePillars />
      
      {/* Who is it for? Section */}
      <WhoIsItFor />
      
      {/* How to Get Started Section */}
      <HowToGetStarted />
      
      {/* CTA Section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to optimize your cloud architecture?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule your free Well-Architected Review consultation today and take the first step toward cloud excellence.
          </p>
          <ContactDialog />
        </div>
      </section>
    </main>
    </MainLayout>
  );
}
