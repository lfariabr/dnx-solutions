import CaseStudy, { ICaseStudy } from '../../models/CaseStudy';
import { checkRole } from '../../utils/authUtils';
import { CaseStudyInput, CaseStudyUpdateInput } from '../../validation/schemas/caseStudy.schema';
import { GraphQLError } from 'graphql';

type CreateCaseStudyArgs = {
  input: CaseStudyInput;
};

type UpdateCaseStudyArgs = {
  id: string;
  input: Partial<CaseStudyUpdateInput>;
};

type DeleteCaseStudyArgs = {
  id: string;
};

export const caseStudyMutations = {
  createCaseStudy: async (_: any, { input }: CreateCaseStudyArgs, context: any): Promise<ICaseStudy> => {
    try {
      // Check if user is admin
      checkRole(context, 'ADMIN');
      
      // Check required fields
      const requiredFields = [
        'title', 'description', 'content', 'technologies', 'imageUrl', 'slug'
      ];
      
      const missingFields = requiredFields.filter(field => !input[field as keyof CaseStudyInput]);
      if (missingFields.length > 0) {
        throw new GraphQLError(`Missing required fields: ${missingFields.join(', ')}`, {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }
      
      // Check if slug is already taken
      const existingCaseStudy = await CaseStudy.findOne({ slug: input.slug });
      if (existingCaseStudy) {
        throw new GraphQLError('A case study with this slug already exists', {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }
      
      // Prepare case study data with defaults
      const caseStudyData = {
        ...input,
        author: context.user?.id,
        published: input.published || false,
        featured: input.featured || false,
        order: input.order || 0,
        technologies: input.technologies || [],
        publishedAt: input.published && !input.publishedAt ? new Date() : input.publishedAt,
      };
      
      const caseStudy = new CaseStudy(caseStudyData);
      await caseStudy.save();
      
      return caseStudy.populate(['author', 'relatedCaseStudies']);
    } catch (error) {
      console.error('Error in createCaseStudy:', error);
      
      // If it's already a GraphQLError, rethrow it
      if (error instanceof GraphQLError) {
        throw error;
      }
      
      // For any other error, return a generic error
      throw new GraphQLError('Failed to create case study', {
        extensions: { code: 'INTERNAL_SERVER_ERROR' }
      });
    }
  },
  
  updateCaseStudy: async (
    _: any, 
    { id, input }: UpdateCaseStudyArgs,
    context: any
  ): Promise<ICaseStudy | null> => {
    // Check if user is admin
    checkRole(context, 'ADMIN');
    
    // Check if case study exists
    const existingCaseStudy = await CaseStudy.findById(id);
    if (!existingCaseStudy) {
      throw new Error('Case study not found');
    }
    
    // Check if slug is being updated and is already taken
    if ('slug' in input && input.slug && input.slug !== existingCaseStudy.slug) {
      const slugExists = await CaseStudy.findOne({ slug: input.slug, _id: { $ne: id } });
      if (slugExists) {
        throw new Error('A case study with this slug already exists');
      }
    }
    
    // Prepare update data
    const updateData: Partial<ICaseStudy> = { ...input };
    
    // Handle publishedAt based on published status
    if ('published' in input) {
      if (input.published && !existingCaseStudy.publishedAt) {
        updateData.publishedAt = new Date();
      } else if (!input.published) {
        updateData.publishedAt = undefined;
      }
    }
    
    const updatedCaseStudy = await CaseStudy.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate(['author', 'relatedCaseStudies']);
    
    return updatedCaseStudy;
  },
  
  deleteCaseStudy: async (_: any, { id }: DeleteCaseStudyArgs, context: any): Promise<boolean> => {
    // Check if user is admin
    checkRole(context, 'ADMIN');
    
    const result = await CaseStudy.findByIdAndDelete(id);
    return !!result;
  },
};