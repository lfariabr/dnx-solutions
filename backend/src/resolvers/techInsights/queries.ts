import TechInsights from '../../models/techInsights';

export const techInsightsQueries = {
  techInsights: async (_: any, { limit = 10, offset = 0 }: { limit?: number, offset?: number }) => {
    return await TechInsights.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);
  },
  
  techInsightsById: async (_: any, { id }: { id: string }) => {
    return await TechInsights.findById(id);
  },
  
  techInsightsBySlug: async (_: any, { slug }: { slug: string }) => {
    return await TechInsights.findOne({ slug });
  },
  
  publishedTechInsights: async (_: any, { limit = 10, offset = 0 }: { limit?: number, offset?: number }) => {
    return await TechInsights.find({ published: true })
      .sort({ publishedAt: -1 })
      .skip(offset)
      .limit(limit);
  },
  
  techInsightsByCategory: async (_: any, { 
    category, 
    limit = 10, 
    offset = 0 
  }: { 
    category: string, 
    limit?: number, 
    offset?: number 
  }) => {
    return await TechInsights.find({ 
      categories: category,
      published: true 
    })
      .sort({ publishedAt: -1 })
      .skip(offset)
      .limit(limit);
  },
  
  techInsightsByTag: async (_: any, { 
    tag, 
    limit = 10, 
    offset = 0 
  }: { 
    tag: string, 
    limit?: number, 
    offset?: number 
  }) => {
    return await TechInsights.find({ 
      tags: tag,
      published: true 
    })
      .sort({ publishedAt: -1 })
      .skip(offset)
      .limit(limit);
  },
};
