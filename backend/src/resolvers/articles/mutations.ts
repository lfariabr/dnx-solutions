import Article from '../../models/Article';
import { checkRole } from '../../utils/authUtils';

export const articleMutations = {
  createArticle: async (_: any, { input }: any, context: any) => {
    // Check if user is admin
    checkRole(context, 'admin');
    
    const article = new Article(input);
    await article.save();
    return article;
  },
  
  updateArticle: async (_: any, { id, input }: any, context: any) => {
    // Check if user is admin
    checkRole(context, 'admin');
    
    return await Article.findByIdAndUpdate(
      id,
      { $set: input },
      { new: true, runValidators: true }
    );
  },
  
  deleteArticle: async (_: any, { id }: { id: string }, context: any) => {
    // Check if user is admin
    checkRole(context, 'admin');
    
    const result = await Article.findByIdAndDelete(id);
    return !!result;
  },
  
  publishArticle: async (_: any, { id }: { id: string }, context: any) => {
    // Check if user is admin
    checkRole(context, 'admin');
    
    return await Article.findByIdAndUpdate(
      id,
      { 
        $set: { 
          published: true,
          publishedAt: new Date()
        } 
      },
      { new: true, runValidators: true }
    );
  },
  
  unpublishArticle: async (_: any, { id }: { id: string }, context: any) => {
    // Check if user is admin
    checkRole(context, 'admin');
    
    return await Article.findByIdAndUpdate(
      id,
      { 
        $set: { 
          published: false 
        },
        $unset: { publishedAt: "" }
      },
      { new: true, runValidators: true }
    );
  },
};