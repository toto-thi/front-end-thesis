import { LOGIN_USER } from '~/graphql/mutations/authMutate'
import { USER_PROFILE } from '~/graphql/queries/userQuery'
import { CREATE_USER, UPDATE_USER } from '~/graphql/mutations/userMutate'
import { decode } from 'jsonwebtoken'
import { Toast } from '~/helpers/swal'

const state = () => ({
  user: {},
  authenticated: false,
  loading: false,
})

const getters = {
  user: (state) => state.user,
  authenticated: (state) => state.authenticated,
  loading: (state) => state.loading,
}

const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setUser(state, payload) {
    state.user = payload
    state.authenticated = true
  },
  clearUser: (state) => {
    state.user = {}
    state.authenticated = false
  },
}

const actions = {
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
      Toast.fire({
        icon: 'error',
        title: err.message.split(': ')[1],
      })
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

      Toast.fire({
        icon: 'success',
        title: 'You\'re now logged in',
      })

      return res
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: err.message.split(': ')[1],
      })
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

      Toast.fire({
        icon: 'success',
        title: 'Signup completed!',
      })
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: err.message.split(': ')[1],
      })
    }

    commit('setLoading', false)
  },

  async singOut({ commit }) {
    commit('setLoading', true)
    await this.app.$apolloHelpers.onLogout()
    localStorage.removeItem('temp')
    commit('clearUser')
    commit('setLoading', false)

    Toast.fire({
      icon: 'success',
      title: 'You\'re now logged out',
    })
  },

  async updateProfile({ commit, dispatch }, newData) {
    commit('setLoading', true)

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

      await dispatch('getCurrentUser', resp.id)

      Toast.fire({
        icon: 'success',
        title: 'Your profile has been updated!',
      })
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: err.message.split(': ')[1],
      })
    }
    commit('setLoading', false)
  },
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}
