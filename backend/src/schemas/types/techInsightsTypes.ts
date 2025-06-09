export const techInsightsTypes = `#graphql
  type TechInsights {
    id: ID!
    title: String!
    slug: String!
    content: String!
    excerpt: String!
    categories: [String!]!
    tags: [String!]!
    imageUrl: String
    published: Boolean!
    publishedAt: String
    createdAt: String!
    updatedAt: String!
  }

  input TechInsightsInput {
    title: String!
    slug: String!
    content: String!
    excerpt: String!
    categories: [String!]
    tags: [String!]
    imageUrl: String
    published: Boolean
  }

  input TechInsightsUpdateInput {
    title: String
    slug: String
    content: String
    excerpt: String
    categories: [String!]
    tags: [String!]
    imageUrl: String
    published: Boolean
  }
`;
