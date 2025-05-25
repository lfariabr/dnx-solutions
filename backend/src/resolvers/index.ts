import { projectQueries } from './projects/queries';
import { projectMutations } from './projects/mutations';
import { articleQueries } from './articles/queries';
import { articleMutations } from './articles/mutations';
import { userQueries } from './users/queries';
import { userMutations } from './users/mutations';

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
