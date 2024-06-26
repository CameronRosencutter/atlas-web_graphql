import { gql } from 'apollo-boost';

// Query to get all tasks
const getTasksQuery = gql`
  {
    tasks {
      id
      title
    }
  }
`;

// Query to get all projects
const getProjectsQuery = gql`
  {
    projects {
      id
      title
    }
  }
`;

// Mutation to add a new task
const addTaskMutation = gql`
  mutation($title: String!, $projectId: ID!) {
    addTask(title: $title, projectId: $projectId) {
      id
      title
    }
  }
`;

export { getTasksQuery, getProjectsQuery, addTaskMutation };
