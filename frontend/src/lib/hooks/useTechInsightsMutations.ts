import { useMutation } from '@apollo/client';
import { toast } from 'sonner';
import { CREATE_TECH_INSIGHT, DELETE_TECH_INSIGHT, PUBLISH_TECH_INSIGHT, UNPUBLISH_TECH_INSIGHT, UPDATE_TECH_INSIGHT } from '../graphql/mutations/techInsights.mutations';
import { GET_TECH_INSIGHTS, GET_PUBLISHED_TECH_INSIGHTS } from '../graphql/queries/techInsights.queries';
import { TechInsights, TechInsightsInput, TechInsightsUpdateInput } from '../graphql/types/techInsightsData.types';

/**
 * Custom hook for article mutation operations
 * Provides functions for creating, updating, publishing/unpublishing and deleting articles
 */
export const useTechInsightsMutations = () => {
  // Create Article Mutation
  const [createTechInsightMutation, { loading: createLoading }] = useMutation(CREATE_TECH_INSIGHT, {
    refetchQueries: [{ query: GET_TECH_INSIGHTS }],
    onCompleted: () => {
      toast.success('Tech Insight created successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to create tech insight: ${error.message}`);
    }
  });

  // Update Article Mutation
  const [updateTechInsightMutation, { loading: updateLoading }] = useMutation(UPDATE_TECH_INSIGHT, {
    refetchQueries: [{ query: GET_TECH_INSIGHTS }, { query: GET_PUBLISHED_TECH_INSIGHTS }],
    onCompleted: () => {
      toast.success('Tech Insight updated successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to update tech insight: ${error.message}`);
    }
  });

  // Publish Article Mutation
  const [publishTechInsightMutation, { loading: publishLoading }] = useMutation(PUBLISH_TECH_INSIGHT, {
    refetchQueries: [{ query: GET_TECH_INSIGHTS }, { query: GET_PUBLISHED_TECH_INSIGHTS }],
    onCompleted: () => {
      toast.success('Tech Insight published successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to publish tech insight: ${error.message}`);
    }
  });

  // Unpublish Article Mutation
  const [unpublishTechInsightMutation, { loading: unpublishLoading }] = useMutation(UNPUBLISH_TECH_INSIGHT, {
    refetchQueries: [{ query: GET_TECH_INSIGHTS }, { query: GET_PUBLISHED_TECH_INSIGHTS }],
    onCompleted: () => {
      toast.success('Tech Insight unpublished successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to unpublish tech insight: ${error.message}`);
    }
  });

  // Delete Article Mutation
  const [deleteTechInsightMutation, { loading: deleteLoading }] = useMutation(DELETE_TECH_INSIGHT, {
    refetchQueries: [{ query: GET_TECH_INSIGHTS }, { query: GET_PUBLISHED_TECH_INSIGHTS }],
    onCompleted: () => {
      toast.success('Tech Insight deleted successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to delete tech insight: ${error.message}`);
    }
  });

  // Create Tech Insight
  const createTechInsight = async (input: TechInsightsInput) => {
    try {
      const { data } = await createTechInsightMutation({
        variables: { input },
      });
      return data?.createTechInsights;
    } catch (error) {
      console.error('Error creating tech insight:', error);
      return null;
    }
  };

  /**
   * Update an existing article
   */
  const updateTechInsight = async (id: string, input: TechInsightsUpdateInput): Promise<TechInsights | null> => {
    try {
      const { data } = await updateTechInsightMutation({
        variables: { id, input }
      });
      return data?.updateTechInsight || null;
    } catch (error) {
      console.error('Error updating tech insight:', error);
      return null;
    }
  };

  /**
   * Publish an article
   */
  const publishTechInsight = async (id: string): Promise<TechInsights | null> => {
    try {
      const { data } = await publishTechInsightMutation({
        variables: { id }
      });
      return data?.publishTechInsight || null;
    } catch (error) {
      console.error('Error publishing tech insight:', error);
      return null;
    }
  };

  /**
   * Unpublish an article
   */
  const unpublishTechInsight = async (id: string): Promise<TechInsights | null> => {
    try {
      const { data } = await unpublishTechInsightMutation({
        variables: { id }
      });
      return data?.unpublishTechInsight || null;
    } catch (error) {
      console.error('Error unpublishing tech insight:', error);
      return null;
    }
  };

  /**
   * Delete an article
   */
  const deleteTechInsight = async (id: string): Promise<boolean> => {
    try {
      const { data } = await deleteTechInsightMutation({
        variables: { id }
      });
      return data?.deleteTechInsight || false;
    } catch (error) {
      console.error('Error deleting tech insight:', error);
      return false;
    }
  };

  return {
    createTechInsight,
    updateTechInsight,
    publishTechInsight,
    unpublishTechInsight,
    deleteTechInsight,
    loading: {
      create: createLoading,
      update: updateLoading,
      publish: publishLoading,
      unpublish: unpublishLoading,
      delete: deleteLoading,
      any: createLoading || updateLoading || publishLoading || unpublishLoading || deleteLoading
    }
  };
};
