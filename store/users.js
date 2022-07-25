import { GET_ALL_USERS } from '~/graphql/queries/userQuery'
import { UPDATE_USER } from '~/graphql/mutations/userMutate'
import { connectMetaMask } from '~/helpers/connectMetaMask'

const state = {
  users: [],
}

const getters = {
  userList: (state) => state.users,
}

const mutations = {
  setUsers(state, payload) {
    state.users = payload
  },
}

const actions = {
  async connectWallet(_, address) {
    const res = await connectMetaMask(address)

    return res
  },
  async getAllUsers({ commit }) {
    let client = this.app.apolloProvider.defaultClient

    const resp = await client
      .query({
        query: GET_ALL_USERS,
      })
      .then(({ data }) => data && data.getAllUsers)

    commit('setUsers', resp)
    return resp
  },
  async updateUser({ commit }, newData) {
    let client = this.app.apolloProvider.defaultClient

    try {
      let resp = await client
        .mutate({
          mutation: UPDATE_USER,
          variables: {
            id: newData.id,
            updateInput: newData.detail,
          },
        })
        .then(({ data }) => data && data.updateUser)

      commit('setUsers', resp)
    } catch (err) {
      console.error(err)
    }
  },
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}
