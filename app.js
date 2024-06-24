const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema'); // Import the schema you created

const app = express();

// Set up the GraphQL endpoint with the schema and enable GraphiQL
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true // Enable GraphiQL interface
}));

// Start the server
app.listen(4000, () => {
  console.log('Now listening for requests on port 4000');
});
