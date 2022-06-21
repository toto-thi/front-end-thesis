import gql from 'graphql-tag'

export const GET_ALL_USERS = gql`
  fragment UserData on User {
    id
    firstname
    lastname
    dob
    email
    role
    imgUrl
  }

  query GetAllUsers {
    getAllUsers {
      ...userData
    }
  }
`

export const USER_PROFILE = gql`
  query UserProfile($id: ID!) {
  userProfile(id: $id) {
    id
    firstname
    lastname
    dob
    email
    imgUrl
    role
  }
}
`
