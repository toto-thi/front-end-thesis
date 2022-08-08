import gql from 'graphql-tag'
import { TRANSACTION_FRAGMENT } from '../fragments'

export const GET_ALL_TRANSACTIONS = gql`
  ${TRANSACTION_FRAGMENT}

  query AllTransactions {
    allTransactions {
      ...Transactions
    }
  }
`

export const GET_TRANSACTIONS_BY_USER = gql`
  ${TRANSACTION_FRAGMENT}
  query TransactionPerUser($walletAddress: String!) {
    transactionPerUser(walletAddress: $walletAddress) {
      ...Transactions
      projectID {
        title
      }
    }
  }
`

export const GET_PERSONAL_TRANSACTION = gql`
  ${TRANSACTION_FRAGMENT}
  query MyPersonalTransaction($walletAddress: String!) {
    myPersonalTransaction(walletAddress: $walletAddress) {
      ...Transactions
      projectID {
        title
      }
    }
  }
`
