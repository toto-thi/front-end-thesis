import { PROJECT_FRAGMENT } from '../fragments'
import gql from 'graphql-tag'

export const APPROVE_PROJECT = gql`
  mutation ApproveProject(
    $id: ID!
    $approval: Boolean!
    $contractAddress: String!
  ) {
    approveProject(
      id: $id
      approval: $approval
      contractAddress: $contractAddress
    )
  }
`
export const REJECT_PROJECT = gql`
  mutation RejectProject($id: ID!, $rejection: Boolean!) {
    rejectProject(id: $id, rejection: $rejection)
  }
`

export const CREATE_PROJECT = gql`
  ${PROJECT_FRAGMENT}
  mutation AddProject($projectInput: ProjectInput!) {
    addProject(projectInput: $projectInput) {
      ...ProjectData
    }
  }
`

export const UPDATE_PROJECT = gql`
  ${PROJECT_FRAGMENT}
  mutation UpdateProject($id: ID!, $projectInput: ProjectInput) {
    updateProject(id: $id, projectInput: $projectInput) {
      ...ProjectData
    }
  }
`
export const UPLOAD_PROJECT_IMAGES = gql`
  mutation MultipleFileUploader($files: [Upload]!) {
    multipleFileUploader(files: $files) {
      url
    }
  }
`

export const CLOSE_PROJECT = gql`
  mutation CloseProject($closeProjectId: ID!) {
    closeProject(id: $closeProjectId)
  }
`
