const { GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = require('graphql');

const Project = require('../models/project');
const Task = require('../models/task');




const projects = [
  {
    id: '1',
    title: 'Project 1',
    weight: '1',
    description: 'Description 1',
    tasks: 'Task 1',
  },
  {
    id: '2',
    title: 'Project 2',
    weight: '2',
  },
  {
    id: '3',
    title: 'Project 3.5',
    weight: '3.5',
  },
];

// Define the tasks array
const tasks = [
  {
    id: '1',
    title: 'Create your first webpage',
    weight: '1 Pound',
    projectId: '1',
    description: 'Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)'
  },
  {
    id: '2',
    title: 'Structure your webpage',
    weight: 1,
    projectId: '1',
    description: 'Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order'
  },
  {
    id: '3',
    title: 'Advanced HTML',
    weight: 1,
    description:  'Welcome to the Web Stack specialization. The 3 first projects will give you all basics of the Web development: HTML, CSS and Developer tools. In this project, you will learn how to use HTML tags to structure a web page. No CSS, no styling - don’t worry, the final page will be “ugly” it’s normal, it’s not the purpose of this project. Important note: details are important! lowercase vs uppercase / wrong letter… be careful!',
  },
  {
    id: '3.5',
    title: 'Bootstrap',
    weight: 1,
    description: '’Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS and JavaScript design templates for typography, forms, buttons, navigation, and other interface components.'
  }
];

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    // Add other fields here
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    // Add tasks field
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        // Resolve tasks associated with the project
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

// Define the RootQuery
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Add task field to retrieve a task by id
    task: {
      type: TaskType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        // Retrieve the id argument
        const { id } = args;
        // Find the task in the tasks array that matches the provided id
        return tasks.find(task => task.id === id);
      }
    },
    // Add project field to retrieve a project by id
    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        // Retrieve the id argument
        const { id } = args;
        // Find the project in the projects array that matches the provided id
        return projects.find(project => project.id === id);
      }
    }
  }
});

// Define Mutation
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const project = new Project({
          title: args.title,
          weight: args.weight,
          description: args.description,
        });

        return project.save();
      }
    },
    addTask: {
      type: TaskType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        projectId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args){
        const task = new Task({
          title: args.title,
          weight: args.weight,
          description: args.description,
          projectId: args.projectId,
        });

        return task.save();
      }
    }
  }
});


module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
});