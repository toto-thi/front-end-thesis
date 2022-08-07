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
    isActive
  }
`

export const PROJECT_FRAGMENT = gql`
  fragment ProjectData on Project {
    id
    title
    description
    contractAddress
    location
    imageList {
      url
    }
    startDate
    endDate
    targetAmount
    donateAmount
    createdBy {
      id
      firstname
      lastname
      imgUrl
      walletID
    }
  }
`

export const TRANSACTION_FRAGMENT = gql`
  fragment Transactions on Transaction {
    id
    txnHash
    fromWalletID
    toWalletID
    amount
    message
    donatedBy {
      firstname
      lastname
    }
    projectID {
      title
    }
  }
`
