import gql from 'graphql-tag'

export const CREATE_USER = gql`
  mutation CreateAccount($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      accessToken
    }
  }
`
