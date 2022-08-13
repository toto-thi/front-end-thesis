import gql from 'graphql-tag'
import { USER_FRAGMENT } from '../fragments'

export const CREATE_USER = gql`
  mutation CreateAccount($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      accessToken
    }
  }
`
export const UPDATE_USER = gql`
  ${USER_FRAGMENT}
  mutation UpdateUser($id: ID!, $updateInput: UpdateInput) {
    updateUser(id: $id, updateInput: $updateInput) {
      ...UserData
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
  }
`

export const FILE_UPLOADER = gql`
  mutation FileUploader($file: Upload!) {
    fileUploader(file: $file)
  }
`
