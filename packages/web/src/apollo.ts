import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getSession } from 'next-auth/react';

const httpLink = createHttpLink({
  uri: process.env.SERVER_URL || 'http://localhost:4000/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const { accesToken } = await getSession();

  return {
    headers: {
      ...headers,
      authorization: accesToken ? `Bearer ${accesToken}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
