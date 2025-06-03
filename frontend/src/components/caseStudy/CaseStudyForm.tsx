'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CaseStudy, CaseStudyInput } from '@/lib/graphql/types/caseStudy.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, X } from 'lucide-react';

// Schema for case study form validation
const caseStudySchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }).max(100),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters' }),
  imageUrl: z.string().url({ message: 'Please enter a valid URL for the image' }),
  githubUrl: z.string().url({ message: 'Please enter a valid GitHub URL' }).optional().or(z.literal('')),
  technologies: z.array(z.string()).min(1, { message: 'Add at least one technology' })
});

type CaseStudyFormValues = z.infer<typeof caseStudySchema>;

interface CaseStudyFormProps {
  caseStudy?: CaseStudy;
  onSubmit: (data: CaseStudyInput) => Promise<void>;
  isSubmitting: boolean;
}

export default function CaseStudyForm({ caseStudy, onSubmit, isSubmitting }: CaseStudyFormProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [newTech, setNewTech] = useState('');
  
  // Initialize the form with default values or existing project data
  const form = useForm<CaseStudyFormValues>({
    resolver: zodResolver(caseStudySchema),
    defaultValues: {
      title: caseStudy?.title || '',
      description: caseStudy?.description || '',
      content: caseStudy?.content || '',
      imageUrl: caseStudy?.imageUrl || '',
      githubUrl: caseStudy?.githubUrl || '',
      technologies: caseStudy?.technologies || []
    }
  });

  // Handle hydration mismatch by ensuring component is mounted before rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Add a new technology to the list
  const handleAddTechnology = () => {
    if (!newTech.trim()) return;
    
    const currentTechs = form.getValues().technologies || [];
    // Only add if not already in the list
    if (!currentTechs.includes(newTech)) {
      form.setValue('technologies', [...currentTechs, newTech]);
    }
    setNewTech('');
  };

  // Remove a technology from the list
  const handleRemoveTechnology = (tech: string) => {
    const currentTechs = form.getValues().technologies;
    form.setValue(
      'technologies', 
      currentTechs.filter(t => t !== tech)
    );
  };
  
  // Form submission handler
  const handleSubmit = async (data: CaseStudyFormValues) => {
    // Clean up the data before submitting
    const caseStudyData: CaseStudyInput = {
      title: data.title,
      description: data.description,
      content: data.content,
      imageUrl: data.imageUrl,
      technologies: data.technologies,
      // Only include githubUrl if it's not empty
      ...(data.githubUrl ? { githubUrl: data.githubUrl } : {})
    };
    
    await onSubmit(caseStudyData);
  };
  
  if (!isMounted) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{caseStudy ? 'Edit Case Study' : 'Create Case Study'}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Case Study Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter case study title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your case study" 
                      rows={5} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter the full content of the case study (supports markdown)" 
                      rows={8} 
                      {...field} 
                      className="font-mono text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/username/repo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies</FormLabel>
                  <FormDescription>
                    Add the technologies used in this case study
                  </FormDescription>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Input 
                      placeholder="e.g. React, TypeScript, Node.js" 
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTechnology();
                        }
                      }}
                    />
                    <Button 
                      type="button"
                      onClick={handleAddTechnology}
                    >
                      Add
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {field.value.map((tech, index) => (
                      <div 
                        key={index} 
                        className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-1 text-sm"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => handleRemoveTechnology(tech)}
                          className="text-secondary-foreground/70 hover:text-secondary-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => window.history.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {caseStudy ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                caseStudy ? 'Update Case Study' : 'Create Case Study'
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
