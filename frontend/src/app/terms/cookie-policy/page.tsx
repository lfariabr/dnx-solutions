import { Metadata } from 'next';
import Link from 'next/link';
import { ContactDialog } from '@/components/ui/contact-dialog';

export const metadata: Metadata = {
  title: 'Cookie Policy | DNX Solutions',
  description: 'Information about how DNX Solutions uses cookies and similar technologies on our website.',
};

export default function CookiePolicy() {
  return (
    <main className="bg-background">
      <div className="container py-16 max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Cookie Policy</h1>
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
              This Cookie Policy explains how DNX Solutions ("we," "us," or "our") uses cookies and similar technologies to recognize you when you visit our website at https://dnx.solutions ("Website").
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies?</h2>
            <p className="mb-4">
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide a better user experience.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Cookies</h2>
            <p className="mb-4">We use cookies for the following purposes:</p>
            
            <h3 className="text-xl font-medium mb-2 mt-6">3.1 Essential Cookies</h3>
            <p className="mb-4">
              These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.
            </p>
            
            <h3 className="text-xl font-medium mb-2">3.2 Performance and Analytics Cookies</h3>
            <p className="mb-4">
              These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
            </p>
            
            <h3 className="text-xl font-medium mb-2">3.3 Functional Cookies</h3>
            <p className="mb-4">
              These enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
            </p>
            
            <h3 className="text-xl font-medium mb-2">3.4 Targeting/Advertising Cookies</h3>
            <p className="mb-4">
              These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies</h2>
            <p className="mb-4">
              We may also use various third-party cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on. These third-party cookies are not under our control.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. Managing Cookies</h2>
            <p className="mb-4">
              You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
            </p>
            <p className="mb-4">
              Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.aboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.allaboutcookies.org</a>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. Changes to This Cookie Policy</h2>
            <p className="mb-4">
              We may update this Cookie Policy from time to time to reflect changes to our use of cookies or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about our use of cookies or other technologies, please: {' '}
              <ContactDialog />
            </p>
          </section>
        </div>
        <div className="flex justify-center mb-12 text-blue-500">
          <Link href="/" className="hover:underline text-sm">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}