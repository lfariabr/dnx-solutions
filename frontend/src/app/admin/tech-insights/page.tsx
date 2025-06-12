'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTechInsights } from "@/lib/hooks/useTechInsights";
import { useTechInsightsMutations } from "@/lib/hooks/useTechInsightsMutations";
import { AlertCircle, Edit, Eye, Loader2, Plus, Trash, UploadCloud, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatDistanceToNow, parseISO, isValid } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { TechInsights } from "@/lib/graphql/types/techInsightsData.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Format date safely with fallback
const formatDateSafe = (dateString: string) => {
  try {
    const date = parseISO(dateString);
    if (isValid(date)) {
      return `${formatDistanceToNow(date)} ago`;
    }
    return 'recently';
  } catch (error) {
    return 'recently';
  }
};

export default function TechInsightsAdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { techInsights, loading, error } = useTechInsights();
  const { publishTechInsight, unpublishTechInsight, deleteTechInsight, loading: mutationLoading } = useTechInsightsMutations();
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Handle article deletion
  const handleDeleteTechInsight = async (id: string) => {
    if (confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      setActionLoading(id);
      try {
        await deleteTechInsight(id);
        toast({
          title: "Article deleted",
          description: "The article has been successfully deleted."
        });
      } catch (error) {
        console.error('Error deleting article:', error);
      } finally {
        setActionLoading(null);
      }
    }
  };

  // Handle publish/unpublish
  const handlePublishToggle = async (article: TechInsights) => {
    setActionLoading(article.id);
    try {
      if (article.published) {
        await unpublishTechInsight(article.id);
        toast({
          title: "Article unpublished",
          description: "The article has been unpublished and is no longer visible to the public."
        });
      } else {
        await publishTechInsight(article.id);
        toast({
          title: "Article published",
          description: "The article has been published and is now visible to the public."
        });
      }
    } catch (error) {
      console.error('Error toggling article publish state:', error);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tech Insights</h1>
          <p className="text-muted-foreground">
            Manage your tech insights here.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/tech-insights/new" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            New Tech Insight
          </Link>
        </Button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Error state */}
      {error && (
        <Alert variant="destructive" className="my-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading articles: {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Empty state */}
      {!loading && !error && techInsights.length === 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>No tech insights yet</CardTitle>
            <CardDescription>
              Get started by creating your first tech insight.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/tech-insights/new" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                Create Tech Insight
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Articles table */}
      {!loading && !error && techInsights.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {techInsights.map((techInsights: TechInsights) => (
                  <TableRow key={techInsights.id}>
                    <TableCell className="font-medium">{techInsights.title}</TableCell>
                    <TableCell>
                      {techInsights.published ? 
                        <Badge variant="success" className="bg-green-600">Published</Badge>
                      : (
                        <Badge variant="outline">Draft</Badge>
                      )}
                    </TableCell>
                    <TableCell>{formatDateSafe(techInsights.updatedAt)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {techInsights.categories?.map((category, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                        {(!techInsights.categories || techInsights.categories.length === 0) && (
                          <span className="text-muted-foreground text-xs">No tags</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePublishToggle(techInsights)}
                          disabled={actionLoading === techInsights.id}
                          title={techInsights.published ? "Unpublish" : "Publish"}
                        >
                          {actionLoading === techInsights.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : techInsights.published ? (
                            <XCircle className="h-4 w-4" />
                          ) : (
                            <UploadCloud className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          title="View"
                        >
                          <Link href={`/tech-insights/${techInsights.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          title="Edit"
                        >
                          <Link href={`/admin/tech-insights/${techInsights.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteTechInsight(techInsights.id)}
                          disabled={actionLoading === techInsights.id}
                          title="Delete"
                        >
                          {actionLoading === techInsights.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
