import { ContactForm } from "@/components/contact/contact-form";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <ContactForm />
      </div>
    </div>
  );
}