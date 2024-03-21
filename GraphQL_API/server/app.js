const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../server/schema/schema.js'); // Import the schema
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Cluster0');

mongoose.connection.once('open', () =>
  console.log('connected to database')
);

const app = express();

// Define the route for GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema, // Pass the schema to the graphqlHTTP middleware
  graphiql: true, // Enable GraphiQL for easy debugging
}));

// Start the server
app.listen(4000, () => {
  console.log('Server is now listening on port 4000');
});

{
  "data": {
    "addProject": {
    "title": "Bootstrap",
    "weight": "1",
    "description": "Words will goe here"
    }
  }
}