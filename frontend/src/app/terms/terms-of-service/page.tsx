import { Metadata } from 'next';
import Link from 'next/link';
import { ContactDialog } from '@/components/ui/contact-dialog';

export const metadata: Metadata = {
  title: 'Terms of Service | DNX Solutions',
  description: 'Terms and conditions governing the use of DNX Solutions services and website.',
};

export default function TermsOfService() {
  return (
    <main className="bg-background">
      <div className="container py-16 max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-lg text-muted-foreground">Last Updated: June 13, 2024</p>
        </div>

        <div className="flex justify-center mb-12 text-blue-500">
          <Link href="/" className="hover:underline text-sm">
            Back to Home
          </Link>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to DNX Solutions. These Terms of Service ("Terms") govern your access to and use of our website and services. 
              By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>"Service"</strong> refers to the services provided by DNX Solutions through our website and related platforms.</li>
              <li><strong>"User," "you," and "your"</strong> refer to the individual or entity using our Service.</li>
              <li><strong>"We," "us," and "our"</strong> refer to DNX Solutions.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. Use of Service</h2>
            <h3 className="text-xl font-medium mb-2">3.1 Eligibility</h3>
            <p className="mb-4">
              You must be at least 18 years old to use our Service. By using the Service, you represent that you are at least 18 years old.
            </p>
            
            <h3 className="text-xl font-medium mb-2">3.2 Account Registration</h3>
            <p className="mb-4">
              Some features of our Service may require you to register for an account. You agree to provide accurate and complete information during registration.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
            <p className="mb-4">
              All content, features, and functionality on our Service, including but not limited to text, graphics, logos, and software, 
              are the exclusive property of DNX Solutions and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. User Conduct</h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Use the Service for any illegal purpose or in violation of any laws.</li>
              <li>Attempt to gain unauthorized access to our systems or networks.</li>
              <li>Interfere with or disrupt the Service or servers.</li>
              <li>Upload or transmit any harmful code or content.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p className="mb-4">
              To the maximum extent permitted by law, DNX Solutions shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Australia, without regard to its conflict of law principles.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. We will provide notice of any changes by updating the "Last Updated" date at the top of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please: {' '}
              <ContactDialog />
            </p>
            <p>
              <br />
            </p>
          </section>
        </div>
        {/* Back to Home */}
        <div className="flex justify-center mb-12 text-blue-500">
          <Link href="/" className="hover:underline text-sm">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}