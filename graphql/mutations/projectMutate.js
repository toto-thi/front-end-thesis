import gql from 'graphql-tag'

export const APPROVE_PROJECT = gql`
  mutation ApproveProject($id: ID!, $approval: Boolean!) {
    approveProject(id: $id, approval: $approval)
  }
`
