import gql from 'graphql-tag'

export const LOGIN_USER = gql`
  mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    accessToken
  }
}
`;
