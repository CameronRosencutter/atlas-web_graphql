const { GraphQLObjectType, GraphQLList } = require('graphql');
const { TaskType, ProjectType } = require('./types'); // Import TaskType and ProjectType if they are defined in a separate file
const { tasks, projects } = require('./data'); // Import tasks and projects arrays

// Define ProjectType
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    // Add tasks field
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        // Filter tasks array to find tasks with projectId equal to id of the project
        return tasks.filter(task => task.projectId === parent.id);
      }
    }
  })
});

// Define TaskType
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    projectId: { type: GraphQLString }, // Add projectId field
    // Add project field
    project: {
      type: ProjectType,
      resolve(parent, args) {
        // Find the project associated with the task by matching projectId with id
        return projects.find(project => project.id === parent.projectId);
      }
    }
  })
});

// Define the RootQueryType
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Field to fetch all tasks
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        // Return all tasks
        return tasks;
      }
    },
    // Field to fetch all projects
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        // Return all projects
        return projects;
      }
    }
  }
});

module.exports = RootQueryType;
