import { caseStudyTypes } from './types/caseStudyTypes';
import { articleTypes } from './types/articleTypes';
import { userTypes } from './types/userTypes';
import { rateTestTypes } from './types/rateTestTypes';
import { chatbotTypes } from './types/chatbotTypes';

export const typeDefs = `#graphql
  ${caseStudyTypes}
  ${articleTypes}
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
    
    # Article queries
    articles(limit: Int, offset: Int): [Article!]!
    article(id: ID): Article
    articleBySlug(slug: String!): Article
    publishedArticles(limit: Int, offset: Int): [Article!]!
    articlesByCategory(category: String!, limit: Int, offset: Int): [Article!]!
    articlesByTag(tag: String!, limit: Int, offset: Int): [Article!]!
    
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
    
    # Article mutations
    createArticle(input: ArticleInput!): Article!
    updateArticle(id: ID!, input: ArticleUpdateInput!): Article!
    deleteArticle(id: ID!): Boolean!
    publishArticle(id: ID!): Article!
    unpublishArticle(id: ID!): Article!
    
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
    articlePublished: Article
    register: AuthPayload
    login: AuthPayload
    logout: Boolean

    # Chatbot subscriptions
    chatHistory(limit: Int = 10, offset: Int = 0): [ChatMessage!]!
  }
`;
