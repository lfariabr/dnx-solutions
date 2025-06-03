'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoonIcon, SunIcon, MenuIcon, UserIcon, LogOutIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Tech Insights', href: '/tech-insights' },
  { name: 'Chatbot', href: '/chatbot' },
];

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                DNX Solutions
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-700 hover:text-blue-600'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex items-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30"

              asChild
            >
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-gray-700 hover:bg-gray-100"
            >
              <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <UserIcon className="h-4 w-4" />
                    <span className="hidden md:inline-block">
                      {user?.name?.split(' ')[0] || 'Account'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800">
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none dark:text-white">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                  <DropdownMenuItem asChild className="hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  {user?.role === 'ADMIN' && (
                    <DropdownMenuItem asChild className="hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">
                      <Link href="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                  <DropdownMenuItem 
                    className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400" 
                    onClick={logout}
                  >
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Link href="/login">
                  <Button variant="ghost" 
                  size="sm" 
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30">
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="hidden sm:block">
                  <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-2 px-4 bg-background border-b">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-foreground/80 py-1',
                    pathname === item.href
                      ? 'text-foreground'
                      : 'text-foreground/60'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <Link 
                  href="/register" 
                  className="sm:hidden text-sm font-medium py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}