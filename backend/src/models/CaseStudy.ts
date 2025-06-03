import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ICaseStudy extends Document {
  title: string;
  subtitle?: string;
  description: string;
  content: string;
  technologies: string[];
  imageUrl: string;
  bannerUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  slug: string;
  client?: string;
  industry?: string;
  duration?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  testimonial?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  published: boolean;
  publishedAt?: Date;
  author: Types.ObjectId;
  relatedCaseStudies: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CaseStudySchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    technologies: { type: [String], required: true },
    imageUrl: { type: String, required: true },
    bannerUrl: { type: String },
    githubUrl: { type: String },
    liveUrl: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    slug: { type: String, required: true, unique: true, trim: true },
    client: { type: String },
    industry: { type: String },
    duration: { type: String },
    challenge: { type: String },
    solution: { type: String },
    results: { type: String },
    testimonial: { type: String },
    testimonialAuthor: { type: String },
    testimonialRole: { type: String },
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoKeywords: [{ type: String }],
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    relatedCaseStudies: [{ type: Schema.Types.ObjectId, ref: 'CaseStudy' }],
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Add text index for search
CaseStudySchema.index({
  title: 'text',
  description: 'text',
  content: 'text',
  technologies: 'text',
  client: 'text',
  industry: 'text'
});

export default mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema);
