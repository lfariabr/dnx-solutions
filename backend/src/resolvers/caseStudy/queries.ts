import { ICaseStudy } from '../../models/CaseStudy';
import CaseStudy from '../../models/CaseStudy';
import { Types } from 'mongoose';

interface CaseStudyQueryArgs {
  limit?: number;
  offset?: number;
  featured?: boolean;
  published?: boolean;
}

export const caseStudyQueries = {
  caseStudies: async (_: any, { limit, offset, featured, published }: CaseStudyQueryArgs = {}) => {
    try {
      const query: any = {};
      
      if (typeof featured === 'boolean') {
        query.featured = featured;
      }
      
      if (typeof published === 'boolean') {
        query.published = published;
      }
      
      const queryBuilder = CaseStudy.find(query)
        .populate('author', 'name email')
        .populate('relatedCaseStudies', 'title slug imageUrl description')
        .sort({ order: 1, publishedAt: -1, createdAt: -1 });
      
      if (limit) {
        queryBuilder.limit(limit);
      }
      
      if (offset) {
        queryBuilder.skip(offset);
      }
      
      return await queryBuilder.exec();
    } catch (error) {
      console.error('Error fetching case studies:', error);
      throw new Error('Failed to fetch case studies');
    }
  },
  
  caseStudy: async (_: any, { id, slug }: { id?: string; slug?: string }): Promise<ICaseStudy | null> => {
    try {
      if (!id && !slug) {
        throw new Error('Either id or slug must be provided');
      }
      
      const query = id ? { _id: id } : { slug };
      
      const caseStudy = await CaseStudy.findOne(query)
        .populate('author', 'name email')
        .populate('relatedCaseStudies', 'title slug imageUrl description')
        .exec();
      
      if (!caseStudy) {
        throw new Error('Case study not found');
      }
      
      return caseStudy;
    } catch (error) {
      console.error('Error fetching case study:', error);
      throw new Error('Failed to fetch case study');
    }
  },
  
  featuredCaseStudies: async (_: any, { limit = 3 }: { limit?: number } = {}) => {
    try {
      return await CaseStudy.find({ 
        featured: true,
        published: true 
      })
      .limit(limit)
      .populate('author', 'name email')
      .populate('relatedCaseStudies', 'title slug imageUrl description')
      .sort({ order: 1, publishedAt: -1 })
      .exec();
    } catch (error) {
      console.error('Error fetching featured case studies:', error);
      throw new Error('Failed to fetch featured case studies');
    }
  }
};
