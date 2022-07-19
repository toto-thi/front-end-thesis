import gql from 'graphql-tag'

export const USER_FRAGMENT = gql`
  fragment UserData on User {
    id
    firstname
    lastname
    email
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
    location
    imageList
    startDate
    endDate
    targetAmount
    donateAmount
    createdBy {
      id
      firstname
      lastname
      imgUrl
    }
  }
`
