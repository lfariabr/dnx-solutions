import { z } from 'zod';

// Helper for URL validation with custom error message
const urlSchema = (message: string) => 
  z.string().url({ message }).or(z.literal(''));

// Helper for date transformation
const dateSchema = z.union([z.string().datetime(), z.date()])
  .transform(val => new Date(val))
  .refine(date => !isNaN(date.getTime()), {
    message: 'Invalid date format',
  });

// Base schema for common fields
const caseStudyBaseSchema = {
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  subtitle: z.string()
    .max(200, 'Subtitle cannot exceed 200 characters')
    .optional(),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description cannot exceed 500 characters'),
  content: z.string()
    .min(100, 'Content must be at least 100 characters'),
  technologies: z.array(z.string())
    .min(1, 'At least one technology is required'),
  imageUrl: z.string().url('Image URL must be a valid URL'),
  bannerUrl: z.string().url('Banner URL must be a valid URL').optional(),
  githubUrl: urlSchema('GitHub URL must be a valid URL').optional(),
  liveUrl: urlSchema('Live URL must be a valid URL').optional(),
  featured: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(100, 'Slug cannot exceed 100 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  client: z.string().max(100).optional(),
  industry: z.string().max(100).optional(),
  duration: z.string().max(50).optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  results: z.string().optional(),
  testimonial: z.string().optional(),
  testimonialAuthor: z.string().max(100).optional(),
  testimonialRole: z.string().max(100).optional(),
  seoTitle: z.string().max(100).optional(),
  seoDescription: z.string().max(200).optional(),
  seoKeywords: z.array(z.string()).optional(),
  published: z.boolean().default(false),
  publishedAt: z.date().optional(),
  relatedCaseStudies: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid case study ID')).optional(),
};

// CaseStudy input validation
export const caseStudyInputSchema = z.object({
  ...caseStudyBaseSchema,
  publishedAt: dateSchema.optional(),
});

// CaseStudy update validation
export const caseStudyUpdateSchema = z.object({
  ...Object.entries(caseStudyBaseSchema).reduce((acc, [key, schema]) => ({
    ...acc,
    [key]: schema.optional(),
  }), {}),
  publishedAt: dateSchema.optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});

// Export types
export type CaseStudyInput = z.infer<typeof caseStudyInputSchema>;
export type CaseStudyUpdateInput = z.infer<typeof caseStudyUpdateSchema>;