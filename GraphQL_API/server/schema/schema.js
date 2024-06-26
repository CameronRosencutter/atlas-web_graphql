const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Allow cross-origin requests
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Server started on port 4000');
});