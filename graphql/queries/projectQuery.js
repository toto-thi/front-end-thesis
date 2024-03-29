import gql from 'graphql-tag'
import { PROJECT_FRAGMENT } from '../fragments'

export const GET_ALL_PROJECT = gql`
  ${PROJECT_FRAGMENT}
  query GetAllProjects {
    getAllProjects {
      ...ProjectData
      isApproved
      isClose
      isPending
      isRejected
    }
  }
`

export const GET_PROJECT_DETAILS = gql`
  ${PROJECT_FRAGMENT}
  query GetProjectById($id: ID!) {
    getProjectById(id: $id) {
      ...ProjectData
      isApproved
      isClose
      isPending
      isRejected
    }
  }
`

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

export const GET_PROJECT_BY_CREATOR = gql`
  ${PROJECT_FRAGMENT}
  query GetProjectByCreator($uid: ID!) {
    getProjectByCreator(uid: $uid) {
      ...ProjectData
      isApproved
      isClose
      isRejected
      isPending
    }
  }
`

export const GET_FINISHED_PROJECTS = gql`
  ${PROJECT_FRAGMENT}
  query GetClosedProjects {
    getClosedProjects {
      ...ProjectData
    }
  }
`

export const TOTAL_DONATION = gql`
  query TotalDonation {
    calTotalDonation
  }
`
