import { GET_ALL_USERS } from '~/graphql/queries/userQuery'

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
  async getAllUsers({ commit }) {
    let client = this.app.apolloProvider.defaultClient

    const resp = await client
      .query({
        query: GET_ALL_USERS,
      })
      .then(({ data }) => data && data.getAllUsers)

    commit('setUsers', resp)
  },
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}
