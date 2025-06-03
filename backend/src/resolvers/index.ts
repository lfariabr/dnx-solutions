import { caseStudyQueries } from './caseStudy/queries';
import { caseStudyMutations } from './caseStudy/mutations';
import { articleQueries } from './articles/queries';
import { articleMutations } from './articles/mutations';
import { userQueries } from './users/queries';
import { userMutations } from './users/mutations';
import { rateTestQueries } from './rateTest/queries';
import { chatbotQueries } from './chatbot/queries';
import { chatbotMutations } from './chatbot/mutations';

// Combine all resolvers
export const resolvers = {
  Query: {
    ...caseStudyQueries,
    ...articleQueries,
    ...userQueries,
    ...rateTestQueries,
    ...chatbotQueries,
  },
  
  Mutation: {
    ...caseStudyMutations,
    ...articleMutations,
    ...userMutations,
    ...chatbotMutations,
  }
};
