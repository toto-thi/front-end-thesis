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
export const UPLOAD_PROFILE_IMG = gql`
  mutation FileUploader($file: Upload!) {
    fileUploader(file: $file)
  }
`
