const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors'); // Import CORS package

const app = express();

// Allow cross-origin requests
app.use(cors());

// GraphQL endpoint setup
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const PORT = process.env.PORT || 4000; // Use environment variable or port 4000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
