import gql from 'graphql-tag'

export const USER_FRAGMENT = gql`
  fragment UserData on User {
    id
    firstname
    lastname
    gender
    imgUrl
    role
    dob
    walletID
  }
`

export const PROJECT_FRAGMENT = gql`
  fragment ProjectData on Project {
    id
    title
    description
    startDate
    endDate
    targetAmount
    createdBy {
      id
      firstname
      lastname
      imgUrl
    }
  }
`
