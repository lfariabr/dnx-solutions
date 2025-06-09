import { gql } from '@apollo/client';
import { TECH_INSIGHTS_FRAGMENT } from '../queries/techInsights.queries';

export const CREATE_TECH_INSIGHT = gql`
  mutation CreateTechInsights($input: TechInsightsInput!) {
    createTechInsights(input: $input) {
      ...TechInsightsFields
    }
  }
  ${TECH_INSIGHTS_FRAGMENT}
`;

export const UPDATE_TECH_INSIGHT = gql`
  mutation UpdateTechInsights($id: ID!, $input: TechInsightsUpdateInput!) {
    updateTechInsights(id: $id, input: $input) {
      ...TechInsightsFields
    }
  }
  ${TECH_INSIGHTS_FRAGMENT}
`;

export const PUBLISH_TECH_INSIGHT = gql`
  mutation PublishTechInsights($id: ID!) {
    publishTechInsights(id: $id) {
      ...TechInsightsFields
    }
  }
  ${TECH_INSIGHTS_FRAGMENT}
`;

export const UNPUBLISH_TECH_INSIGHT = gql`
  mutation UnpublishTechInsights($id: ID!) {
    unpublishTechInsights(id: $id) {
      ...TechInsightsFields
    }
  }
  ${TECH_INSIGHTS_FRAGMENT}
`;

export const DELETE_TECH_INSIGHT = gql`
  mutation DeleteTechInsights($id: ID!) {
    deleteTechInsights(id: $id)
  }
`;