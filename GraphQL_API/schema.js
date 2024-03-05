// Import necessary modules from the graphql package
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql');

// Define the TaskType GraphQLObjectType
const TaskType = new GraphQLObjectType({
  name: 'Task', // Name of the object type
  fields: {
    // Define the fields of the TaskType
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString }
  }
});

// Define the RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType, // Assuming TaskType is defined elsewhere in your schema
      args: {
        id: { type: GraphQLString } // Define arguments for querying a task by ID
      },
      resolve(parent, args) {
        // Implement the resolve function to fetch data from the database
        // Here, you would typically fetch the task with the provided ID from the database
        // and return it
      }
    }
  }
});

// Define the GraphQL schema with RootQuery
module.exports = new GraphQLSchema({
  query: RootQuery
});
