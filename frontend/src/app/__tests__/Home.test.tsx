import { render, screen, within, fireEvent } from '@testing-library/react';
import HomePage from '../page';
import '@testing-library/jest-dom';


describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { 
      name: /leading the way in cloud modernisation/i 
    })).toBeInTheDocument();
  });

  it('renders the main CTA buttons', () => {
    render(<HomePage />);
    
    // Check for Get Started button
    // Check for Get Started button
  const getStartedButton = screen.getByRole('button', { name: /get started/i });
  expect(getStartedButton).toBeInTheDocument();

  // Click the button to open the dialog
  fireEvent.click(getStartedButton);

  // Verify the dialog is open by checking for its title
  const dialogTitle = screen.getByRole('heading', { name: /get in touch/i });
  expect(dialogTitle).toBeInTheDocument();

  // Optionally, verify the form is present
  const nameInput = screen.getByLabelText(/name/i);
  expect(nameInput).toBeInTheDocument();
  });

  it('renders the features section', () => {
    render(<HomePage />);
    
    // Check for features section heading
    expect(screen.getByRole('heading', {
      name: /aws premier consulting partner/i
    })).toBeInTheDocument();
    
    // Check for feature cards by their unique descriptions
    const featureDescriptions = [
      'Seamless transition to the cloud with minimal disruption',
      '24/7 monitoring and support for your cloud infrastructure',
      'Accelerate delivery with modern DevOps practices',
      'Leverage your data with advanced analytics and AI'
    ];
    
    featureDescriptions.forEach(description => {
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });

  it('has main navigation links', () => {
    render(<HomePage />);
    
    // Get the main navigation element
    const nav = screen.getByRole('navigation');
    
    // Check navigation links within the main navigation
    const navLinks = [
      { name: 'Home', href: '/' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Tech Insights', href: '/tech-insights' },
      { name: 'Chatbot', href: '/chatbot' },
    ];
    
    navLinks.forEach(({ name, href }) => {
      // Find link within the navigation bar
      const link = within(nav).getByRole('link', { 
        name: new RegExp(`^${name}$`, 'i')
      });
      expect(link).toHaveAttribute('href', href);
    });
  });
});


describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { 
      name: /leading the way in cloud modernisation/i 
    })).toBeInTheDocument();
  });

  it('renders the main CTA buttons', () => {
    render(<HomePage />);
    
    // Check for Get Started button
    // Check for Get Started button
  const getStartedButton = screen.getByRole('button', { name: /get started/i });
  expect(getStartedButton).toBeInTheDocument();

  // Click the button to open the dialog
  fireEvent.click(getStartedButton);

  // Verify the dialog is open by checking for its title
  const dialogTitle = screen.getByRole('heading', { name: /get in touch/i });
  expect(dialogTitle).toBeInTheDocument();

  // Optionally, verify the form is present
  const nameInput = screen.getByLabelText(/name/i);
  expect(nameInput).toBeInTheDocument();
  });

  it('renders the features section', () => {
    render(<HomePage />);
    
    // Check for features section heading
    expect(screen.getByRole('heading', {
      name: /aws premier consulting partner/i
    })).toBeInTheDocument();
    
    // Check for feature cards by their unique descriptions
    const featureDescriptions = [
      'Seamless transition to the cloud with minimal disruption',
      '24/7 monitoring and support for your cloud infrastructure',
      'Accelerate delivery with modern DevOps practices',
      'Leverage your data with advanced analytics and AI'
    ];
    
    featureDescriptions.forEach(description => {
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });

  it('has main navigation links', () => {
    render(<HomePage />);
    
    // Get the main navigation element
    const nav = screen.getByRole('navigation');
    
    // Check navigation links within the main navigation
    const navLinks = [
      { name: 'Home', href: '/' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Tech Insights', href: '/tech-insights' },
      { name: 'Chatbot', href: '/chatbot' },
    ];
    
    navLinks.forEach(({ name, href }) => {
      // Find link within the navigation bar
      const link = within(nav).getByRole('link', { 
        name: new RegExp(`^${name}$`, 'i')
      });
      expect(link).toHaveAttribute('href', href);
    });
  });
});
