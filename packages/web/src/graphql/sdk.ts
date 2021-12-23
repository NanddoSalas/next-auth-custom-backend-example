import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  linkAccount: Scalars['Boolean'];
  unlinkProvider?: Maybe<User>;
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
};


export type MutationLinkAccountArgs = {
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationUnlinkProviderArgs = {
  provider: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  author: Scalars['String'];
  avatar: Scalars['String'];
  body: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
  getUserByAccount?: Maybe<User>;
  getUserByEmail?: Maybe<User>;
  me?: Maybe<User>;
  posts: Array<Post>;
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QueryGetUserByAccountArgs = {
  providerAccountId: Scalars['String'];
};


export type QueryGetUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  connectedProviders: Array<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  name: Scalars['String'];
};

export type CreateUserMutationVariables = Exact<{
  image: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', user: { __typename?: 'User', id: string, name: string, email: string, image: string } };

export type GetUserQueryVariables = Exact<{
  getUserId: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, email: string, image: string } | null | undefined };

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetUserByEmailQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, email: string, image: string } | null | undefined };

export type GetUserByAccountQueryVariables = Exact<{
  providerAccountId: Scalars['String'];
}>;


export type GetUserByAccountQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, email: string, image: string } | null | undefined };

export type LinkAccountMutationVariables = Exact<{
  userId: Scalars['String'];
  providerAccountId: Scalars['String'];
  provider: Scalars['String'];
}>;


export type LinkAccountMutation = { __typename?: 'Mutation', linkAccount: boolean };

export type PostsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, title: string, body: string, createdAt: string, author: string, avatar: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', connectedProviders: Array<string> } | null | undefined };

export type UnlinkProviderMutationVariables = Exact<{
  provider: Scalars['String'];
}>;


export type UnlinkProviderMutation = { __typename?: 'Mutation', unlinkProvider?: { __typename?: 'User', id: string } | null | undefined };


export const CreateUserDocument = gql`
    mutation CreateUser($image: String!, $email: String!, $name: String!) {
  user: createUser(image: $image, email: $email, name: $name) {
    id
    name
    email
    image
  }
}
    `;
export const GetUserDocument = gql`
    query GetUser($getUserId: String!) {
  user: getUser(id: $getUserId) {
    id
    name
    email
    image
  }
}
    `;
export const GetUserByEmailDocument = gql`
    query GetUserByEmail($email: String!) {
  user: getUserByEmail(email: $email) {
    id
    name
    email
    image
  }
}
    `;
export const GetUserByAccountDocument = gql`
    query GetUserByAccount($providerAccountId: String!) {
  user: getUserByAccount(providerAccountId: $providerAccountId) {
    id
    name
    email
    image
  }
}
    `;
export const LinkAccountDocument = gql`
    mutation LinkAccount($userId: String!, $providerAccountId: String!, $provider: String!) {
  linkAccount(
    userId: $userId
    providerAccountId: $providerAccountId
    provider: $provider
  )
}
    `;
export const PostsDocument = gql`
    query Posts($limit: Int, $cursor: Int) {
  posts(limit: $limit, cursor: $cursor) {
    id
    title
    body
    createdAt
    author
    avatar
  }
}
    `;
export const MeDocument = gql`
    query Me {
  me {
    connectedProviders
  }
}
    `;
export const UnlinkProviderDocument = gql`
    mutation UnlinkProvider($provider: String!) {
  unlinkProvider(provider: $provider) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateUser(variables: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateUser');
    },
    GetUser(variables: GetUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>(GetUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUser');
    },
    GetUserByEmail(variables: GetUserByEmailQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserByEmailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserByEmailQuery>(GetUserByEmailDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUserByEmail');
    },
    GetUserByAccount(variables: GetUserByAccountQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserByAccountQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserByAccountQuery>(GetUserByAccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUserByAccount');
    },
    LinkAccount(variables: LinkAccountMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LinkAccountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LinkAccountMutation>(LinkAccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'LinkAccount');
    },
    Posts(variables?: PostsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostsQuery>(PostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Posts');
    },
    Me(variables?: MeQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MeQuery>(MeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Me');
    },
    UnlinkProvider(variables: UnlinkProviderMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UnlinkProviderMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UnlinkProviderMutation>(UnlinkProviderDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UnlinkProvider');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;