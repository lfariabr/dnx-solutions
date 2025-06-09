import TechInsights from '../../models/techInsights';
import { checkRole } from '../../utils/authUtils';
import { GraphQLError } from 'graphql';

type ErrorWithCode = Error & { code?: number };
type ErrorWithName = Error & { name?: string; message: string };

export const techInsightsMutations = {
  createTechInsights: async (_: any, { input }: any, context: any) => {
    try {
      // Check if user is ADMIN
      checkRole(context, 'ADMIN');
      
      console.log('Creating tech insight with input:', JSON.stringify(input, null, 2));
      
      // Validate required fields
      if (!input.title || !input.slug || !input.content || !input.excerpt) {
        throw new GraphQLError('Missing required fields. Title, slug, content, and excerpt are required.', {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }
      
      // Check if a tech insight with the same slug already exists
      const existingTechInsight = await TechInsights.findOne({ slug: input.slug });
      if (existingTechInsight) {
        throw new GraphQLError('A tech insight with this slug already exists', {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }
      
      const techInsights = new TechInsights({
        title: input.title,
        slug: input.slug,
        content: input.content,
        excerpt: input.excerpt,
        categories: input.categories || [],
        tags: input.tags || [],
        imageUrl: input.imageUrl || null,
        published: input.published || false
      });
      
      const savedTechInsight = await techInsights.save();
      console.log('Successfully created tech insight:', savedTechInsight._id);
      return savedTechInsight;
    } catch (error: unknown) {
      console.error('Detailed error in createTechInsights:', JSON.stringify(error, null, 2));
      
      // Handle MongoDB duplicate key error (E11000)
      if (error && typeof error === 'object' && 'code' in error && (error as ErrorWithCode).code === 11000) {
        throw new GraphQLError('A tech insight with this slug already exists', {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }
      
      // Handle validation errors
      if (error && typeof error === 'object' && 'name' in error && (error as ErrorWithName).name === 'ValidationError') {
        const validationError = error as ErrorWithName & { errors?: Record<string, { message: string }> };
        const errorMessages = validationError.errors 
          ? Object.values(validationError.errors).map(err => err.message).join(', ')
          : validationError.message;
          
        throw new GraphQLError(`Validation error: ${errorMessages}`, {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }
      
      // For any other error, include the error message in the response
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new GraphQLError(`Failed to create tech insight: ${errorMessage}`, {
        extensions: { code: 'INTERNAL_SERVER_ERROR' }
      });
    }
  },
  
  updateTechInsights: async (_: any, { id, input }: any, context: any) => {
    try {
      // Check if user is ADMIN
      checkRole(context, 'ADMIN');
      
      return await TechInsights.findByIdAndUpdate(
        id,
        { $set: input },
        { new: true, runValidators: true }
      );
    } catch (error: unknown) {
      console.error('Error in updateTechInsights:', error);
      
      // Handle validation errors
      if (error && typeof error === 'object' && 'name' in error && (error as ErrorWithName).name === 'ValidationError') {
        throw new GraphQLError((error as ErrorWithName).message, {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }
      
      throw new GraphQLError('Failed to update tech insight', {
        extensions: { code: 'INTERNAL_SERVER_ERROR' }
      });
    }
  },
  
  deleteTechInsights: async (_: any, { id }: { id: string }, context: any) => {
    try {
      // Check if user is ADMIN
      checkRole(context, 'ADMIN');
      
      const result = await TechInsights.findByIdAndDelete(id);
      return !!result;
    } catch (error: unknown) {
      console.error('Error in deleteTechInsights:', error);
      throw new GraphQLError('Failed to delete tech insight', {
        extensions: { code: 'INTERNAL_SERVER_ERROR' }
      });
    }
  },
  
  publishTechInsights: async (_: any, { id }: { id: string }, context: any) => {
    try {
      // Check if user is ADMIN
      checkRole(context, 'ADMIN');
      
      return await TechInsights.findByIdAndUpdate(
        id,
        { 
          $set: { 
            published: true,
            publishedAt: new Date()
          } 
        },
        { new: true, runValidators: true }
      );
    } catch (error: unknown) {
      console.error('Error in publishTechInsights:', error);
      throw new GraphQLError('Failed to publish tech insight', {
        extensions: { code: 'INTERNAL_SERVER_ERROR' }
      });
    }
  },
  
  unpublishTechInsights: async (_: any, { id }: { id: string }, context: any) => {
    try {
      // Check if user is ADMIN
      checkRole(context, 'ADMIN');
      
      return await TechInsights.findByIdAndUpdate(
        id,
        { 
          $set: { 
            published: false,
            publishedAt: null
          } 
        },
        { new: true }
      );
    } catch (error: unknown) {
      console.error('Error in unpublishTechInsights:', error);
      throw new GraphQLError('Failed to unpublish tech insight', {
        extensions: { code: 'INTERNAL_SERVER_ERROR' }
      });
    }
  }
};