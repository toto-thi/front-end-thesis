import {
  GET_PENDING_PROJECT,
  GET_APPROVED_PROJECTS,
} from '~/graphql/queries/projectQuery'

import { APPROVE_PROJECT } from '~/graphql/mutations/projectMutate'

const state = {
  approvedProjects: {},
  pendingProjects: {},
  rejectedProjects: {},
  closedProjects: {},
  dLoading: false,
}

const getters = {
  approved: (state) => state.approvedProjects,
  pending: (state) => state.pendingProjects,
  reject: (state) => state.rejectedProjects,
  closed: (state) => state.closedProjects,
  dLoading: (state) => state.dLoading,
}

const mutations = {
  setLoading(state, status) {
    state.dLoading = status
  },
  fetchApprovedProject(state, payload) {
    state.approvedProjects = payload
  },
  fetchPendingProject(state, payload) {
    state.pendingProjects = payload
  },
  fetchRejectedProject(state, payload) {
    state.rejectedProjects = payload
  },
  fetchClosedProject(state, payload) {
    state.closedProjects = payload
  },
}

const actions = {
  async getApprovedProject({ commit }) {
    commit('setLoading', true)

    let client = this.app.apolloProvider.defaultClient

    try {
      const approveProj = await client
        .query({
          query: GET_APPROVED_PROJECTS,
        })
        .then(({ data }) => data && data.getApprovedProjects)

      commit('fetchApprovedProject', approveProj)
    } catch (err) {
      console.error(err)
    }
    commit('setLoading', false)
  },
  async getPendingProject({ commit }) {
    commit('setLoading', true)

    let client = this.app.apolloProvider.defaultClient

    try {
      const pendingProj = await client
        .query({
          query: GET_PENDING_PROJECT,
        })
        .then(({ data }) => data && data.getPendingProjects)

      commit('fetchPendingProject', pendingProj)
    } catch (err) {
      console.error(err)
    }
    commit('setLoading', false)
  },
  async approveProject({ commit }, payload) {
    commit('setLoading', true)

    let client = this.app.apolloProvider.defaultClient

    try {
      const resp = await client
        .mutate({
          mutation: APPROVE_PROJECT,
          variables: {
            id: payload.id,
            approval: payload.approval,
          },
        })
        .then(({ data }) => data && data.approveProject)
    } catch (err) {
      console.error(err)
    }
    commit('setLoading', false)
  },
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions,
}
