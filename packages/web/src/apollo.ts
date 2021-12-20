import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.SERVER_URL || 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});
