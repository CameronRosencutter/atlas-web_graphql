import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Set up Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>My GraphQL App</h1>
        {/* Add your components here */}
      </div>
    </ApolloProvider>
  );
}

export default App;
