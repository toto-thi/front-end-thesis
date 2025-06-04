import { ADD_TRANSACTION } from '~/graphql/mutations/transactionMutate'
import {
  GET_ALL_TRANSACTIONS,
  GET_TRANSACTIONS_BY_USER,
  GET_PERSONAL_TRANSACTION
} from '~/graphql/queries/transactionQuery'

const state = () => ({})

const getters = {}

const mutations = {}

const actions = {
  async addToTransaction(_, payload) {
    let client = this.app.apolloProvider.defaultClient

    try {
      const res = await client
        .mutate({
          mutation: ADD_TRANSACTION,
          variables: {
            donateInput: payload,
          },
        })
        .then(({ data }) => data && data.donate)

      if (!!res) return 'Done'
    } catch (err) {
      console.error(err.message.split(': ')[1])
    }
  },
  async getAllTransactions() {
    let client = this.app.apolloProvider.defaultClient

    try {
      const { data } = await client.query({
        query: GET_ALL_TRANSACTIONS,
      })

      if (!!data) return data.allTransactions
    } catch (err) {
      console.error(err.message.split(': ')[1])
    }
  },
  async getUserTransactions(_, payload) {
    let client = this.app.apolloProvider.defaultClient
    
    try {
      const { data } = await client.query({
        query: GET_TRANSACTIONS_BY_USER,
        variables: {
          walletAddress: payload,
        },
      })

      if(!!data) return data.transactionPerUser

    } catch (err) {
      console.error(err.message.split(': ')[1])
    }
  },
  async getSendHistory(_, payload) {
    let client = this.app.apolloProvider.defaultClient
    
    try {
      const { data } = await client.query({
        query: GET_PERSONAL_TRANSACTION,
        variables: {
          walletAddress: payload,
        },
      })

      if(!!data) return data.myPersonalTransaction

    } catch (err) {
      console.error(err.message.split(': ')[1])
    }
  }
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions,
}
