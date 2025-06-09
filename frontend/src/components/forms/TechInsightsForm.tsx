'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { TechInsights, TechInsightsInput } from "@/lib/graphql/types/techInsightsData.types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

// Form validation schema
const techInsightsFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  slug: z.string().min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { 
      message: "Slug must contain only lowercase letters, numbers, and hyphens" 
    }),
  content: z.string().min(10, { message: "Content must be at least 10 characters" }),
  imageUrl: z.string().url({ message: "Must be a valid URL" }),
  excerpt: z.string()
    .min(1, { message: "Excerpt is required" })
    .max(150, { message: "Excerpt must be 150 characters or less" }),
  categories: z.array(z.string()).min(1, { message: "At least one category is required" }),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
});

type TechInsightsFormValues = z.infer<typeof techInsightsFormSchema>;

interface TechInsightsFormProps {
  techInsights?: TechInsights;
  onSubmit: (data: TechInsightsInput) => Promise<void>;
  loading: boolean;
  submitLabel: string;
  cancelAction?: () => void;
}

export function TechInsightsForm({ 
  techInsights, 
  onSubmit, 
  loading, 
  submitLabel,
  cancelAction 
}: TechInsightsFormProps) {
  const router = useRouter();
  const [tagInput, setTagInput] = useState<string>("");
  const [autoSlug, setAutoSlug] = useState(!techInsights?.slug);
  
  // Form default values
  const defaultValues: Partial<TechInsightsFormValues> = {
    title: techInsights?.title || "",
    slug: techInsights?.slug || "",
    content: techInsights?.content || "",
    imageUrl: techInsights?.imageUrl || "",
    excerpt: techInsights?.excerpt || "",
    categories: techInsights?.categories || [],
    tags: techInsights?.tags || [],
    published: techInsights?.published || false,
  };
  
  // Initialize form
  const form = useForm<TechInsightsFormValues>({
    resolver: zodResolver(techInsightsFormSchema),
    defaultValues,
  });
  
  // Generate slug from title if auto-slug is enabled
  useEffect(() => {
    if (autoSlug) {
      const title = form.watch('title');
      if (title) {
        const generatedSlug = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '') // Remove special characters
          .replace(/\s+/g, '-')     // Replace spaces with hyphens
          .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
          .trim();
        form.setValue('slug', generatedSlug);
      }
    }
  }, [form.watch('title'), autoSlug, form]);
  
  // Handle tag input
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = tagInput.trim();
    if ((e.key === "Enter" || e.key === ",") && value) {
      e.preventDefault();
      const currentTags = form.getValues("tags") || [];
      if (!currentTags.includes(value)) {
        form.setValue("tags", [...currentTags, value]);
        setTagInput("");
      }
    }
  };
  
  // Remove tag
  const removeTag = (tag: string) => {
    const currentTags = form.getValues("tags") || [];
    form.setValue(
      "tags",
      currentTags.filter((t) => t !== tag)
    );
  };

  // Handle form submission
  const handleSubmit = async (formData: TechInsightsFormValues) => {
    // Ensure tags is always an array, defaulting to empty array if undefined
    const data = {
      ...formData,
      tags: formData.tags || [],
    };
    await onSubmit(data);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Title field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Tech Insight title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Published field */}
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 pt-3">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Published</FormLabel>
                    <FormDescription>
                      Set to true to publish this tech insight
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            {/* Slug field */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Slug</FormLabel>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={autoSlug} 
                        onCheckedChange={setAutoSlug} 
                        id="auto-slug"
                      />
                      <label 
                        htmlFor="auto-slug" 
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        Auto-generate
                      </label>
                    </div>
                  </div>
                  <FormControl>
                    <Input 
                      placeholder="tech-insight-slug" 
                      {...field} 
                      disabled={autoSlug}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be used in the URL: /tech-insights/your-slug
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Image URL field */}
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a URL to an image for this tech insight
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Excerpt field */}
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief summary of the article (max 150 characters)"
                      className="resize-none"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be displayed in tech insight listings
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Categories input */}
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {field.value?.map((category, index) => (
                          <Badge key={index} variant="secondary" className="py-1 px-3">
                            {category}
                            <X
                              className="ml-1 h-3 w-3 cursor-pointer"
                              onClick={() => {
                                const currentCategories = form.getValues("categories") || [];
                                form.setValue(
                                  "categories",
                                  currentCategories.filter((c) => c !== category)
                                );
                              }}
                            />
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a category and press Enter"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            const value = tagInput.trim();
                            if ((e.key === "Enter" || e.key === ",") && value) {
                              e.preventDefault();
                              const currentCategories = form.getValues("categories") || [];
                              if (!currentCategories.includes(value)) {
                                form.setValue("categories", [...currentCategories, value]);
                                setTagInput("");
                              }
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const value = tagInput.trim();
                            if (value) {
                              const currentCategories = form.getValues("categories") || [];
                              if (!currentCategories.includes(value)) {
                                form.setValue("categories", [...currentCategories, value]);
                                setTagInput("");
                              }
                            }
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Categories help organize your tech insights (e.g., "Frontend", "Backend", "DevOps")
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Tags input */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        placeholder="Add tags (press Enter or comma to add)"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagInputKeyDown}
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {field.value?.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="py-1 px-3">
                            {tag}
                            <X
                              className="ml-1 h-3 w-3 cursor-pointer"
                              onClick={() => removeTag(tag)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Tags help categorize your tech insight
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Content field */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your tech insight content here..."
                      className="min-h-[300px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Form actions */}
            <div className="flex justify-end gap-4">
              {cancelAction && (
                <Button type="button" variant="outline" onClick={cancelAction}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : submitLabel}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
