import { gql } from '@apollo/client';

// Fragment for consistent case study data shape
export const CASE_STUDY_FRAGMENT = gql`
  fragment CaseStudyFields on CaseStudy {
    id
    title
    subtitle
    slug
    description
    content
    imageUrl
    bannerUrl
    technologies
    githubUrl
    liveUrl
    featured
    published
    publishedAt
    createdAt
    updatedAt
  }
`;

// Query to get all case studies (including unpublished)
// Intended for admin use
export const GET_CASE_STUDIES = gql`
  query GetCaseStudies {
    caseStudies {
      ...CaseStudyFields
    }
  }
  ${CASE_STUDY_FRAGMENT}
`;

// Query to get published case studies
// Intended for public-facing pages
export const GET_PUBLISHED_CASE_STUDIES = gql`
  query GetPublishedCaseStudies {
    publishedCaseStudies {
      ...CaseStudyFields
    }
  }
  ${CASE_STUDY_FRAGMENT}
`;

// Query to get featured case studies
export const GET_FEATURED_CASE_STUDIES = gql`
  query GetFeaturedCaseStudies($limit: Int) {
    featuredCaseStudies(limit: $limit) {
      ...CaseStudyFields
    }
  }
  ${CASE_STUDY_FRAGMENT}
`;

// Query to get a single case study by ID
export const GET_CASE_STUDY = gql`
  query GetCaseStudy($id: ID!) {
    caseStudy(id: $id) {
      ...CaseStudyFields
    }
  }
  ${CASE_STUDY_FRAGMENT}
`;
