import { GraphQLError } from 'graphql';
import { shield, rule, allow } from 'graphql-shield';
import { checkAuth, checkRole } from '../utils/authUtils';
import { validateInput } from './middleware';
import { registerSchema, loginSchema } from './schemas/user.schema';
import { caseStudyInputSchema, caseStudyUpdateSchema } from './schemas/caseStudy.schema';
import { techInsightsInputSchema, techInsightsUpdateSchema } from './schemas/techInsights.schema';
import { chatbotInputSchema } from './schemas/chatbot.schema';

// Authentication rules
const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent: any, _args: any, context: any) => {
    try {
      checkAuth(context);
      return true;
    } catch (error) {
      return false;
    }
  }
);

const isAdmin = rule({ cache: 'contextual' })(
  async (_parent: any, _args: any, context: any) => {
    try {
      checkRole(context, 'ADMIN');
      return true;
    } catch (error) {
      return false;
    }
  }
);

// Validation rules
const validateRegister = rule({ cache: 'no_cache' })(
  validateInput(registerSchema)
);

const validateLogin = rule({ cache: 'no_cache' })(
  validateInput(loginSchema)
);

const validateCaseStudyInput = rule({ cache: 'no_cache' })(
  validateInput(caseStudyInputSchema)
);

const validateCaseStudyUpdate = rule({ cache: 'no_cache' })(
  validateInput(caseStudyUpdateSchema, 'input')
);

const validateTechInsightsInput = rule({ cache: 'no_cache' })(
  validateInput(techInsightsInputSchema)
);

const validateTechInsightsUpdate = rule({ cache: 'no_cache' })(
  validateInput(techInsightsUpdateSchema, 'input')
);

const validateChatbotInput = rule({ cache: 'no_cache' })(
  validateInput(chatbotInputSchema, 'question')
);

// Helper function to combine rules
function and(...rules: any[]) {
  return rule({ cache: 'no_cache' })(async (parent: any, args: any, context: any, info: any) => {
    for (const r of rules) {
      const result = await r.resolve(parent, args, context, info);
      if (!result) return false;
    }
    return true;
  });
}

// Export shield middleware
export const permissions = shield(
  {
    Query: {
      // Public queries
      hello: allow,
      caseStudies: allow,
      caseStudy: allow,
      featuredCaseStudies: allow,
      techInsights: allow,
      techInsightsById: allow,
      techInsightsBySlug: allow,
      publishedTechInsights: allow,
      techInsightsByCategory: allow,
      techInsightsByTag: allow,
      
      // Protected queries
      me: isAuthenticated,
      chatHistory: isAuthenticated,
      testRateLimit: isAuthenticated,
    },
    Mutation: {
      // Public mutations
      register: validateRegister,
      login: validateLogin,
      
      // Admin-only mutations
      createCaseStudy: and(isAdmin, validateCaseStudyInput),
      updateCaseStudy: and(isAdmin, validateCaseStudyUpdate),
      deleteCaseStudy: isAdmin,
      createTechInsights: and(isAdmin, validateTechInsightsInput),
      updateTechInsights: and(isAdmin, validateTechInsightsUpdate),
      deleteTechInsights: isAdmin,
      publishTechInsights: isAdmin,
      unpublishTechInsights: isAdmin,
      
      // User mutations
      askQuestion: and(isAuthenticated, validateChatbotInput),
      logout: isAuthenticated,
    },
  },
  {
    fallbackError: (error: any) => {
      console.error('SHIELD ERROR DETAILS:', error);
      
      // Handle Zod validation errors
      if (error?.extensions?.code === 'BAD_USER_INPUT' || error?.originalError?.name === 'ZodError') {
        // If we have a validation error, return it directly
        if (error.message) {
          return error;
        }
        // Otherwise, format the Zod error
        const zodError = error.originalError || error;
        const errorMessage = zodError.issues?.[0]?.message || 'Validation error';
        const extensions = {
          code: 'BAD_USER_INPUT',
          validationErrors: zodError.errors || []
        };
        
        // Create a new error with the proper structure
        const graphQLError = new GraphQLError(
          errorMessage,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          extensions
        );
        
        return graphQLError;
      }
      
      // Handle regular errors
      if (error instanceof Error) {
        return error;
      }
      
      // Handle string errors
      if (typeof error === 'string') {
        return new Error(error);
      }
      
      // Default error
      return new Error('Not authorized to perform this action');
    }
  }
);