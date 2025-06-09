import { gql } from '@apollo/client';

// Fragment for consistent tech insight data shape
export const TECH_INSIGHTS_FRAGMENT = gql`
  fragment TechInsightsFields on TechInsights {
    id
    title
    slug
    content
    excerpt
    categories
    tags
    imageUrl
    published
    publishedAt
    createdAt
    updatedAt
  }
`;

// Query to get all tech insights (admin only)
export const GET_TECH_INSIGHTS = gql`
  query GetTechInsights($limit: Int, $offset: Int) {
    techInsights(limit: $limit, offset: $offset) {
      ...TechInsightsFields
    }
  }
  ${TECH_INSIGHTS_FRAGMENT}
`;

// Query to get published tech insights
export const GET_PUBLISHED_TECH_INSIGHTS = gql`
  query GetPublishedTechInsights($limit: Int, $offset: Int) {
    publishedTechInsights(limit: $limit, offset: $offset) {
      ...TechInsightsFields
    }
  }
  ${TECH_INSIGHTS_FRAGMENT}
`;

// Query to get a single tech insight by ID
export const GET_TECH_INSIGHT = gql`
  query GetTechInsight($id: ID!) {
    techInsightsById(id: $id) {
      ...TechInsightsFields
    }
  }
  ${TECH_INSIGHTS_FRAGMENT}
`;

// Query to get just the slugs of existing tech insights
export const GET_TECH_INSIGHTS_SLUGS = gql`
  query GetTechInsightsSlugs {
    techInsights {
      id
      slug
    }
  }
`;
