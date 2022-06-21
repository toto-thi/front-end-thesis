import { LOGIN_USER } from '~/graphql/mutations/authMutate'
import { USER_PROFILE } from '~/graphql/queries/userQuery'
import { CREATE_USER } from '~/graphql/mutations/userMutate'
import { decode } from 'jsonwebtoken'

const state = {
  user: null,
  loading: false,
}

const getters = {
  user: (state) => state.user,
  loading: (state) => state.loading,
}

const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setUser(state, payload) {
    state.user = payload
  },
  clearUser: (state) => (state.user = null),
}

const actions = {
  // async nuxtServerInit({ dispatch }) {
  //   await dispatch('getCurrentUser')
  // },

  async getCurrentUser({ commit }, userId) {
    if (!this.app.$apolloHelpers.getToken()) {
      commit('clearUser')
      return
    }
    commit('setLoading', true)

    let client = this.app.apolloProvider.defaultClient
    try {
      const result = await client.query({
        query: USER_PROFILE,
        variables: {
          id: userId,
        },
      })

      commit('setUser', result.data.userProfile)
    } catch (err) {
      console.error(err)
    }
    commit('setLoading', false)
  },
  async loginUser({ commit, dispatch }, userData) {
    let client = this.app.apolloProvider.defaultClient

    commit('setLoading', true)
    try {
      let res = await client
        .mutate({
          mutation: LOGIN_USER,
          variables: {
            loginInput: userData,
          },
        })
        .then(({ data }) => data && data.login)

      const resToken = res.accessToken

      await this.app.$apolloHelpers.onLogin(resToken)

      const decodeToken = decode(resToken)
      await dispatch('getCurrentUser', decodeToken.userId)

      this.$router.push('/')
    } catch (err) {
      console.error(err)
    }
    commit('setLoading', false)
  },

  async signUp({ commit, dispatch }, userData) {
    let client = this.app.apolloProvider.defaultClient

    commit('setLoading', true)

    try {
      let res = await client
        .mutate({
          mutation: CREATE_USER,
          variables: {
            userInput: userData,
          },
        })
        .then(({ data }) => data && data.createUser)

      const resToken = res.accessToken

      await this.app.$apolloHelpers.onLogin(resToken)

      const decodeToken = decode(resToken)
      await dispatch('getCurrentUser', decodeToken.userId)

      this.$router.push('/')
    } catch (err) {
      console.error(err)
    }

    commit('setLoading', false)
  },

  async singOut({ commit }) {
    commit('clearUser');
    await this.app.$apolloHelpers.onLogout();
    this.$router.push('/');
  },
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}