import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import Auth from './Auth.resolver';
import User from './User.entity';

const main = async () => {
  await createConnection({
    entities: [User],
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
  });

  const app = express();

  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [Auth],
  });

  const server = new ApolloServer({
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    schema,
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

main();
