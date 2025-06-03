import React from 'react';
import { screen, within } from '@testing-library/react';
import HomePage from '../page';
import { renderWithProviders } from '@/utils/test-utils';

// Mock the featured case studies/articles hooks
jest.mock('@/lib/hooks/useCaseStudies', () => ({
  useCaseStudies: () => ({
    caseStudies: [
      { id: '1', title: 'Case Study 1', description: 'Case study description', slug: 'case-study-1' },
      { id: '2', title: 'Case Study 2', description: 'Case study description', slug: 'case-study-2' },
    ],
    loading: false,
    error: null,
  }),
}));

jest.mock('@/lib/hooks/useArticles', () => ({
  useFeaturedArticles: () => ({
    articles: [
      { id: '1', title: 'Featured Article 1', summary: 'Article summary', slug: 'article-1' },
      { id: '2', title: 'Featured Article 2', summary: 'Article summary', slug: 'article-2' },
    ],
    loading: false,
    error: null,
  }),
}));

describe('Home Page', () => {
  it('renders the hero section', () => {
    renderWithProviders(<HomePage />);
    
    // Check for hero heading
    const heroHeading = screen.getByRole('heading', { name: /welcome to dnx solutions/i });
    expect(heroHeading).toBeInTheDocument();
  });

  it('renders case studies section', () => {
    renderWithProviders(<HomePage />);
    
    // Check for case studies section
    const caseStudiesHeading = screen.getAllByRole('heading', { name: /case studies/i })[0];
    expect(caseStudiesHeading).toBeInTheDocument();
    
    // Check for case study items
    expect(screen.getByText('Case Study 1')).toBeInTheDocument();
    expect(screen.getByText('Case Study 2')).toBeInTheDocument();
  });

  it('renders articles section', () => {
    renderWithProviders(<HomePage />);
    
    // Check for articles section
    const articlesHeading = screen.getAllByRole('heading', { name: /articles/i })[0];
    expect(articlesHeading).toBeInTheDocument();
  });

  it('has working navigation', () => {
    renderWithProviders(<HomePage />);
    
    // Find the navigation element first, then find links within it
    const navigation = screen.getByRole('navigation');
    
    // Find links within the navigation
    const caseStudiesLink = within(navigation).getByText(/case studies/i);
    const articlesLink = within(navigation).getByText(/articles/i);
    const chatbotLink = within(navigation).getByText(/chatbot/i);
    
    // Check that links have correct hrefs
    expect(caseStudiesLink).toHaveAttribute('href', '/case-studies');
    expect(articlesLink).toHaveAttribute('href', '/articles');
    expect(chatbotLink).toHaveAttribute('href', '/chatbot');
  });
});
