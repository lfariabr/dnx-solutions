import { caseStudyQueries } from './caseStudy/queries';
import { caseStudyMutations } from './caseStudy/mutations';
import { techInsightsQueries } from './techInsights/queries';
import { techInsightsMutations } from './techInsights/mutations';
import { userQueries } from './users/queries';
import { userMutations } from './users/mutations';
import { rateTestQueries } from './rateTest/queries';
import { chatbotQueries } from './chatbot/queries';
import { chatbotMutations } from './chatbot/mutations';

// Combine all resolvers
export const resolvers = {
  Query: {
    ...caseStudyQueries,
    ...techInsightsQueries,
    ...userQueries,
    ...rateTestQueries,
    ...chatbotQueries,
  },
  
  Mutation: {
    ...caseStudyMutations,
    ...techInsightsMutations,
    ...userMutations,
    ...chatbotMutations,
  }
};
