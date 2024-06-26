// client/src/queries/queries.js

import { gql } from 'apollo-boost';

// Define your queries
export const getTasksQuery = gql`
  {
    tasks {
      id
      title
    }
  }
`;

export const getProjectsQuery = gql`
  {
    projects {
      id
      title
    }
  }
`;
