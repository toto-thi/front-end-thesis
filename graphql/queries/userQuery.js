import gql from 'graphql-tag';
import { USER_FRAGMENT } from '../fragments'

export const GET_ALL_USERS = gql`
  ${USER_FRAGMENT}
  query GetAllUsers {
    getAllUsers {
      ...UserData
    }
  }
`

export const USER_PROFILE = gql`
  ${USER_FRAGMENT}
  query UserProfile($id: ID!) {
  userProfile(id: $id) {
    ...UserData
  }
}
`
