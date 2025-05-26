import { projectQueries } from './projects/queries';
import { projectMutations } from './projects/mutations';
import { articleQueries } from './articles/queries';
import { articleMutations } from './articles/mutations';
import { userQueries } from './users/queries';
import { userMutations } from './users/mutations';
import { rateTestQueries } from './rateTest/queries';

// Combine all resolvers
export const resolvers = {
  Query: {
    // Hello world query (keep for testing)
    hello: () => 'Hello, World!',
    
    // Project queries
    ...projectQueries,
    
    // Article queries
    ...articleQueries,
    
    // User queries
    ...userQueries,

    // Rate limit test queries
    ...rateTestQueries,
  },
  
  Mutation: {
    // Project mutations
    ...projectMutations,
    
    // Article mutations
    ...articleMutations,
    
    // Auth mutations
    ...userMutations,
  }
};
