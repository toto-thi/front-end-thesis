import { UPDATE_PROJECT } from '~/graphql/mutations/projectMutate'
import { ADD_TRANSACTION } from '~/graphql/mutations/transactionMutate'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  // async addToProject(_, payload) {
  //   let client = this.app.apolloProvider.defaultClient

  //   console.log('check payload: ', payload)

  //   try {
  //     const res = await client
  //       .mutate({
  //         mutation: UPDATE_PROJECT,
  //         variables: {
  //           id: payload.id,
  //           projectInput: payload.data,
  //         },
  //       })
  //       .then(({ data }) => data && data.updateProject)

  //     if (!!res) return 'Done'
  //   } catch (err) {
  //     console.error(err)
  //   }
  // },
  async addToTransaction(_, payload) {
    let client = this.app.apolloProvider.defaultClient

    console.log('check payload: ', payload)

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
      console.error(err)
    }
  },
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions,
}
