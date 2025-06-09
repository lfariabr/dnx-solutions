import { caseStudyTypes } from './types/caseStudyTypes';
import { techInsightsTypes } from './types/techInsightsTypes';
import { userTypes } from './types/userTypes';
import { rateTestTypes } from './types/rateTestTypes';
import { chatbotTypes } from './types/chatbotTypes';

export const typeDefs = `#graphql
  ${caseStudyTypes}
  ${techInsightsTypes}
  ${userTypes}
  ${rateTestTypes}
  ${chatbotTypes}

  type Query {
    # Test query
    hello: String
    
    # CaseStudy queries
    caseStudies: [CaseStudy!]!
    caseStudy(id: ID!): CaseStudy
    featuredCaseStudies: [CaseStudy!]!
    
    # TechInsights queries
    techInsights(limit: Int, offset: Int): [TechInsights!]!
    techInsightsById(id: ID): TechInsights
    techInsightsBySlug(slug: String!): TechInsights
    publishedTechInsights(limit: Int, offset: Int): [TechInsights!]!
    techInsightsByCategory(category: String!, limit: Int, offset: Int): [TechInsights!]!
    techInsightsByTag(tag: String!, limit: Int, offset: Int): [TechInsights!]!
    
    # User queries
    users: [User!]!
    user(id: ID!): User
    me: User

    # Rate limit test query
    testRateLimit: RateLimitInfo

    # Chatbot queries
    chatHistory(limit: Int = 10, offset: Int = 0): [ChatMessage!]!
  }

  type Mutation {
    # CaseStudy mutations
    createCaseStudy(input: CaseStudyInput!): CaseStudy!
    updateCaseStudy(id: ID!, input: CaseStudyUpdateInput!): CaseStudy!
    deleteCaseStudy(id: ID!): Boolean!
    
    # TechInsights mutations
    createTechInsights(input: TechInsightsInput!): TechInsights!
    updateTechInsights(id: ID!, input: TechInsightsUpdateInput!): TechInsights!
    deleteTechInsights(id: ID!): Boolean!
    publishTechInsights(id: ID!): TechInsights!
    unpublishTechInsights(id: ID!): TechInsights!
    
    # Auth mutations
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    logout: Boolean!
    updateUserRole(id: ID!, role: Role!): User!
    deleteUser(id: ID!): Boolean!

    # Chatbot mutations
    askQuestion(question: String!): ChatResponse!
  }

  type Subscription {
    techInsightsPublished: TechInsights
    register: AuthPayload
    login: AuthPayload
    logout: Boolean

    # Chatbot subscriptions
    chatHistory(limit: Int = 10, offset: Int = 0): [ChatMessage!]!
  }
`;
