import CaseStudy, { ICaseStudy } from '../../models/CaseStudy';
import { checkRole } from '../../utils/authUtils';
import { CaseStudyInput, CaseStudyUpdateInput } from '../../validation/schemas/caseStudy.schema';

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
    // Check if user is admin
    checkRole(context, 'ADMIN');
    
    // Check if slug is already taken
    const existingCaseStudy = await CaseStudy.findOne({ slug: input.slug });
    if (existingCaseStudy) {
      throw new Error('A case study with this slug already exists');
    }
    
    // Prepare case study data
    const caseStudyData = {
      ...input,
      author: context.user.id,
      publishedAt: input.published && !input.publishedAt ? new Date() : input.publishedAt,
    };
    
    const caseStudy = new CaseStudy(caseStudyData);
    await caseStudy.save();
    
    return caseStudy.populate(['author', 'relatedCaseStudies']);
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