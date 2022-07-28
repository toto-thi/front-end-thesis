import gql from 'graphql-tag'

export const ADD_TRANSACTION = gql`
  mutation Donate($donateInput: DonateInput!) {
    donate(donateInput: $donateInput) {
      id
      txnHash
      projectID
      fromWalletID
      toWalletID
      amount
      message
      donatedBy {
        firstname
        lastname
      }
    }
  }
`
