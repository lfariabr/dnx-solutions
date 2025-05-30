'use client';

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                DNX Solutions
              </span>
            </div>
            <p className="text-sm text-gray-400">
              AWS Premier Partner
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.linkedin.com/company/dnx-solutions" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/dnxsolutions" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/channel/UC3wqAkWDItvSxslxcyPQkKg" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/solutions/adopt" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Adopt
                </Link>
              </li>
              <li>
                <Link href="/solutions/evolve" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Evolve
                </Link>
              </li>
              <li>
                <Link href="/solutions/operate" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Operate
                </Link>
              </li>
              <li>
                <Link href="/devops" className="text-sm text-gray-400 hover:text-white transition-colors">
                  DevOps Transformation
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
            <address className="not-italic space-y-3">
              <div>
                <p className="text-sm text-gray-400">Australia</p>
                <p className="text-sm text-gray-400">Sydney, NSW</p>
              </div>
              <div>
                <a href="mailto:info@dnx.solutions" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  info@dnx.solutions
                </a>
              </div>
              <div>
                <a href="tel:+61000000000" className="text-sm text-gray-400 hover:text-white transition-colors">
                  +61 000 000 000
                </a>
              </div>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500">
              &copy; {currentYear} DNX Solutions. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-xs text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-gray-500 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-xs text-gray-500 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}