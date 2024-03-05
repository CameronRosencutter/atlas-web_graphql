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
    // Define any queries here if needed
  }
});

// Define the GraphQL schema with RootQuery
module.exports = new GraphQLSchema({
  query: RootQuery
});
