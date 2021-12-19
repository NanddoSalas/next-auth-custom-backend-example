import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import AuthResolver from './Auth.resolver';
import User from './User.entity';
import { getUser } from './utils';

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
    resolvers: [AuthResolver],
  });

  const context = async ({ req, res }: ExpressContext) => {
    const user = await getUser(req);

    return { req, res, user };
  };

  const server = new ApolloServer({
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context,
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
