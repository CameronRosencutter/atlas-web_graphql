import { gql } from 'apollo-boost';

const getTasksQuery = gql`
  {
    tasks {
      id
      title
    }
  }
`;

const getProjectsQuery = gql`
  {
    projects {
      id
      title
    }
  }
`;

const addTaskMutation = gql`
  mutation($title: String!, $description: String!, $projectId: ID!) {
    addTask(title: $title, description: $description, projectId: $projectId) {
      id
      title
    }
  }
`;

const getTaskDetailQuery = gql`
  query($id: ID!) {
    task(id: $id) {
      id
      title
      weight
      description
      project {
        id
        title
        weight
        description
        tasks {
          id
          title
          weight
        }
      }
    }
  }
`;

const addProjectMutation = gql`
  mutation($title: String!, $description: String!) {
    addProject(title: $title, description: $description) {
      id
      title
    }
  }
`;

export {
  getTasksQuery,
  getProjectsQuery,
  addTaskMutation,
  getTaskDetailQuery,
  addProjectMutation,
};
