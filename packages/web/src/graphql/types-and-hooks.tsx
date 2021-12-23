import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      image: // value for 'image'
 *      email: // value for 'email'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
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

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      getUserId: // value for 'getUserId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
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

/**
 * __useGetUserByEmailQuery__
 *
 * To run a query within a React component, call `useGetUserByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetUserByEmailQuery(baseOptions: Apollo.QueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options);
      }
export function useGetUserByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options);
        }
export type GetUserByEmailQueryHookResult = ReturnType<typeof useGetUserByEmailQuery>;
export type GetUserByEmailLazyQueryHookResult = ReturnType<typeof useGetUserByEmailLazyQuery>;
export type GetUserByEmailQueryResult = Apollo.QueryResult<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
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

/**
 * __useGetUserByAccountQuery__
 *
 * To run a query within a React component, call `useGetUserByAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByAccountQuery({
 *   variables: {
 *      providerAccountId: // value for 'providerAccountId'
 *   },
 * });
 */
export function useGetUserByAccountQuery(baseOptions: Apollo.QueryHookOptions<GetUserByAccountQuery, GetUserByAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByAccountQuery, GetUserByAccountQueryVariables>(GetUserByAccountDocument, options);
      }
export function useGetUserByAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByAccountQuery, GetUserByAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByAccountQuery, GetUserByAccountQueryVariables>(GetUserByAccountDocument, options);
        }
export type GetUserByAccountQueryHookResult = ReturnType<typeof useGetUserByAccountQuery>;
export type GetUserByAccountLazyQueryHookResult = ReturnType<typeof useGetUserByAccountLazyQuery>;
export type GetUserByAccountQueryResult = Apollo.QueryResult<GetUserByAccountQuery, GetUserByAccountQueryVariables>;
export const LinkAccountDocument = gql`
    mutation LinkAccount($userId: String!, $providerAccountId: String!, $provider: String!) {
  linkAccount(
    userId: $userId
    providerAccountId: $providerAccountId
    provider: $provider
  )
}
    `;
export type LinkAccountMutationFn = Apollo.MutationFunction<LinkAccountMutation, LinkAccountMutationVariables>;

/**
 * __useLinkAccountMutation__
 *
 * To run a mutation, you first call `useLinkAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLinkAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [linkAccountMutation, { data, loading, error }] = useLinkAccountMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      providerAccountId: // value for 'providerAccountId'
 *      provider: // value for 'provider'
 *   },
 * });
 */
export function useLinkAccountMutation(baseOptions?: Apollo.MutationHookOptions<LinkAccountMutation, LinkAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LinkAccountMutation, LinkAccountMutationVariables>(LinkAccountDocument, options);
      }
export type LinkAccountMutationHookResult = ReturnType<typeof useLinkAccountMutation>;
export type LinkAccountMutationResult = Apollo.MutationResult<LinkAccountMutation>;
export type LinkAccountMutationOptions = Apollo.BaseMutationOptions<LinkAccountMutation, LinkAccountMutationVariables>;
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

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    connectedProviders
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UnlinkProviderDocument = gql`
    mutation UnlinkProvider($provider: String!) {
  unlinkProvider(provider: $provider) {
    id
  }
}
    `;
export type UnlinkProviderMutationFn = Apollo.MutationFunction<UnlinkProviderMutation, UnlinkProviderMutationVariables>;

/**
 * __useUnlinkProviderMutation__
 *
 * To run a mutation, you first call `useUnlinkProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlinkProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlinkProviderMutation, { data, loading, error }] = useUnlinkProviderMutation({
 *   variables: {
 *      provider: // value for 'provider'
 *   },
 * });
 */
export function useUnlinkProviderMutation(baseOptions?: Apollo.MutationHookOptions<UnlinkProviderMutation, UnlinkProviderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlinkProviderMutation, UnlinkProviderMutationVariables>(UnlinkProviderDocument, options);
      }
export type UnlinkProviderMutationHookResult = ReturnType<typeof useUnlinkProviderMutation>;
export type UnlinkProviderMutationResult = Apollo.MutationResult<UnlinkProviderMutation>;
export type UnlinkProviderMutationOptions = Apollo.BaseMutationOptions<UnlinkProviderMutation, UnlinkProviderMutationVariables>;