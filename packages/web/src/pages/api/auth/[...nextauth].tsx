import { GraphQLClient } from 'graphql-request';
import jwt from 'jsonwebtoken';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';
import { getSdk } from '../../../graphql/sdk';

const token = jwt.sign(
  { role: 'adapter' },
  process.env.SECRET || 'gCtvpTciwl/nPSvvWQrqn+kIXB7A/SpvRXX5CtfJNDI=',
);

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4000/graphql',
  {
    headers: {
      authorization: `bearer ${token}`,
    },
  },
);
const sdk = getSdk(client);

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: '2.0', // opt-in to Twitter OAuth 2.0
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  secret: process.env.SECRET || 'gCtvpTciwl/nPSvvWQrqn+kIXB7A/SpvRXX5CtfJNDI=',

  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.userId = user.id;
      }

      return token;
    },

    session: ({ session, token }) => {
      session.accesToken = jwt.sign(
        {
          userId: token.userId,
        },
        process.env.SECRET || 'gCtvpTciwl/nPSvvWQrqn+kIXB7A/SpvRXX5CtfJNDI=',
        { expiresIn: '7d' },
      );

      return session;
    },
  },

  adapter: {
    createUser: async ({ name, email, image }) => {
      const { user } = await sdk.CreateUser({
        name: name || email,
        email,
        image: image || 'https://next-auth.js.org/img/logo/logo-sm.png',
      });

      return { emailVerified: null, ...user };
    },

    getUser: async (id) => {
      const { user } = await sdk.GetUser({ getUserId: id });

      if (!user) return null;

      return { emailVerified: null, ...user, accesToken: 'jwt' };
    },

    getUserByEmail: async (email) => {
      const { user } = await sdk.GetUserByEmail({ email });

      if (!user) return null;

      return { emailVerified: null, ...user };
    },

    getUserByAccount: async ({ providerAccountId }) => {
      const { user } = await sdk.GetUserByAccount({
        providerAccountId,
      });

      if (!user) return null;

      return { emailVerified: null, ...user };
    },

    linkAccount: async ({ provider, providerAccountId, userId }) => {
      await sdk.LinkAccount({
        provider,
        providerAccountId,
        userId,
      });
    },

    // @ts-ignore
    createSession: () => {},
    // @ts-ignore
    getSessionAndUser: () => {},
    // @ts-ignore
    updateSession: () => {},
    // @ts-ignore
    deleteSession: () => {},
    // @ts-ignore
    updateUser: () => {},
  },
});
