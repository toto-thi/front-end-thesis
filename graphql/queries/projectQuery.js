import gql from 'graphql-tag'
import { PROJECT_FRAGMENT } from '../fragments'

export const GET_PENDING_PROJECT = gql`
  ${PROJECT_FRAGMENT}
  query PendingProject {
    getPendingProjects {
      ...ProjectData
    }
  }
`

export const GET_APPROVED_PROJECTS = gql`
  ${PROJECT_FRAGMENT}
  query GetApprovedProjects {
    getApprovedProjects {
      ...ProjectData
    }
  }
`
export const GET_REJECTED_PROJECTS = gql`
  ${PROJECT_FRAGMENT}
  query GetRejectedProjects {
    getRejectedProjects {
      ...ProjectData
    }
  }
`
