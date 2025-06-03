import { useMutation } from '@apollo/client';
import { useToast } from '@/components/ui/use-toast';
import { CaseStudyInput } from '@/lib/graphql/types/caseStudy.types';
import { gql } from '@apollo/client';

// Helper function to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/--+/g, '-')      // Replace multiple hyphens with single hyphen
    .trim();
};

const CREATE_CASE_STUDY = gql`
  mutation CreateCaseStudy($input: CaseStudyInput!) {
    createCaseStudy(input: $input) {
      id
      title
      slug
    }
  }
`;

const UPDATE_CASE_STUDY = gql`
  mutation UpdateCaseStudy($id: ID!, $input: CaseStudyUpdateInput!) {
    updateCaseStudy(id: $id, input: $input) {
      id
      title
      slug
    }
  }
`;

const DELETE_CASE_STUDY = gql`
  mutation DeleteCaseStudy($id: ID!) {
    deleteCaseStudy(id: $id)
  }
`;

export function useCaseStudyMutations() {
  const { toast } = useToast();

  const [createCaseStudy, { loading: isCreating }] = useMutation(CREATE_CASE_STUDY, {
    refetchQueries: ['GetCaseStudies'],
    context: {
      headers: {
        authorization: typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('token')}` : ''
      }
    },
    onCompleted: () => {
      toast({
        title: 'Success',
        description: 'Case study created successfully',
      });
    },
    onError: (error) => {
      console.error('Error creating case study:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create case study',
        variant: 'destructive',
      });
    },
  });

  const [updateCaseStudy, { loading: isUpdating }] = useMutation(UPDATE_CASE_STUDY, {
    refetchQueries: ['GetCaseStudy', 'GetCaseStudies'],
    context: {
      headers: {
        authorization: typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('token')}` : ''
      }
    },
    onCompleted: () => {
      toast({
        title: 'Success',
        description: 'Case study updated successfully',
      });
    },
    onError: (error) => {
      console.error('Error updating case study:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update case study',
        variant: 'destructive',
      });
    },
  });

  const [deleteCaseStudy, { loading: isDeleting }] = useMutation(DELETE_CASE_STUDY, {
    refetchQueries: ['GetCaseStudies'],
    context: {
      headers: {
        authorization: typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('token')}` : ''
      }
    },
    onCompleted: () => {
      toast({
        title: 'Success',
        description: 'Case study deleted successfully',
      });
    },
    onError: (error) => {
      console.error('Error deleting case study:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete case study',
        variant: 'destructive',
      });
    },
  });

  return {
    createCaseStudy: (input: Omit<CaseStudyInput, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) => {
      const slug = generateSlug(input.title);
      return createCaseStudy({ 
        variables: { 
          input: {
            ...input,
            slug,
          } 
        }
      });
    },
    updateCaseStudy: (id: string, input: Partial<Omit<CaseStudyInput, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const updateData = { ...input };
      // Only generate new slug if title is being updated
      if (input.title) {
        updateData.slug = generateSlug(input.title);
      }
      return updateCaseStudy({ 
        variables: { 
          id, 
          input: updateData 
        }
      });
    },
    deleteCaseStudy: (id: string) => deleteCaseStudy({ variables: { id } }),
    isCreating,
    isUpdating,
    isDeleting,
  };
}
