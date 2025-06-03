import { CaseStudyInput } from "../../validation/schemas/caseStudy.schema";

export const caseStudyTypes = `#graphql
  type CaseStudy {
    id: ID!
    title: String!
    subtitle: String
    description: String!
    content: String!
    technologies: [String!]!
    imageUrl: String!
    bannerUrl: String
    githubUrl: String
    liveUrl: String
    featured: Boolean!
    order: Int!
    slug: String!
    client: String
    industry: String
    duration: String
    challenge: String
    solution: String
    results: String
    testimonial: String
    testimonialAuthor: String
    testimonialRole: String
    seoTitle: String
    seoDescription: String
    seoKeywords: [String!]
    published: Boolean!
    publishedAt: String
    author: User
    relatedCaseStudies: [CaseStudy!]
    createdAt: String!
    updatedAt: String!
  }

  input CaseStudyInput {
    title: String!
    subtitle: String
    description: String!
    content: String!
    technologies: [String!]!
    imageUrl: String!
    bannerUrl: String
    githubUrl: String
    liveUrl: String
    featured: Boolean
    order: Int
    slug: String!
    client: String
    industry: String
    duration: String
    challenge: String
    solution: String
    results: String
    testimonial: String
    testimonialAuthor: String
    testimonialRole: String
    seoTitle: String
    seoDescription: String
    seoKeywords: [String!]
    published: Boolean
    publishedAt: String
    author: ID
    relatedCaseStudies: [ID!]
  }

  input CaseStudyUpdateInput {
    title: String
    subtitle: String
    description: String
    content: String
    technologies: [String!]
    imageUrl: String
    bannerUrl: String
    githubUrl: String
    liveUrl: String
    featured: Boolean
    order: Int
    slug: String
    client: String
    industry: String
    duration: String
    challenge: String
    solution: String
    results: String
    testimonial: String
    testimonialAuthor: String
    testimonialRole: String
    seoTitle: String
    seoDescription: String
    seoKeywords: [String!]
    published: Boolean
    publishedAt: String
    author: ID
    relatedCaseStudies: [ID!]
  }

  type Query {
    caseStudies(limit: Int, offset: Int, featured: Boolean, published: Boolean): [CaseStudy!]!
    caseStudy(id: ID, slug: String): CaseStudy
    featuredCaseStudies(limit: Int): [CaseStudy!]!
  }

  type Mutation {
    createCaseStudy(input: CaseStudyInput!): CaseStudy!
    updateCaseStudy(id: ID!, input: CaseStudyUpdateInput!): CaseStudy!
    deleteCaseStudy(id: ID!): Boolean!
  }
`;

export interface CaseStudyUpdateInput extends CaseStudyInput {
  // Same fields as CaseStudyInput, but as a separate type for the GraphQL schema
}