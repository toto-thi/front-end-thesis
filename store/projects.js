import {
  GET_ALL_PROJECT,
  GET_PROJECT_DETAILS,
  GET_PENDING_PROJECT,
  GET_APPROVED_PROJECTS,
  GET_REJECTED_PROJECTS,
  GET_PROJECT_BY_CREATOR,
  TOTAL_DONATION,
} from '~/graphql/queries/projectQuery'

import {
  APPROVE_PROJECT,
  REJECT_PROJECT,
  CREATE_PROJECT,
  UPDATE_PROJECT,
} from '~/graphql/mutations/projectMutate'

import { fetchProjects, fetchProjectById } from '~/helpers/getAPI'
import { Toast } from '~/helpers/swal'

const state = {
  allProjects: [],
  approvedProjects: [],
  pendingProjects: [],
  rejectedProjects: [],
  closedProjects: [],
  dLoading: false,
}

const getters = {
  allProjects: (state) => state.allProjects,
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
  fetchAllProjects(state, payload) {
    state.allProjects = payload
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
  async nuxtServerInit({ dispatch }) {
    await dispatch('getAllProjects')
    await dispatch('getApprovedProject')
    await dispatch('getPendingProject')
    await dispatch('getRejectedProjects')
  },
  async getAllProjects({ commit }) {
    commit('setLoading', true)

    let client = this.app.apolloProvider.defaultClient

    try {
      const allProj = await fetchProjects(client, GET_ALL_PROJECT)
      commit('fetchAllProjects', allProj.getAllProjects)
    } catch (err) {
      console.error(err)
    }

    commit('setLoading', false)
  },
  async getProjectDetail({ commit }, id) {
    commit('setLoading', true)

    let client = this.app.apolloProvider.defaultClient

    try {
      const resp = await fetchProjectById(client, GET_PROJECT_DETAILS, id)
      return resp.getProjectById
    } catch (err) {
      console.error(err)
    }

    commit('setLoading', true)
  },
  async getProjectByCreator({ commit }, uid) {
    commit('setLoading', true)

    let client = this.app.apolloProvider.defaultClient

    try {
      const response = await client
        .query({
          query: GET_PROJECT_BY_CREATOR,
          variables: {
            uid: uid,
          },
        })
        .then(({ data }) => data.getProjectByCreator)

      return response
    } catch (err) {
      console.error(err)
    }
    commit('setLoading', false)
  },
  async getApprovedProject({ commit }) {
    commit('setLoading', true)

    let client = this.app.apolloProvider.defaultClient

    try {
      const approveProj = await fetchProjects(client, GET_APPROVED_PROJECTS)
      commit('fetchApprovedProject', approveProj.getApprovedProjects)
    } catch (err) {
      console.error(err)
    }

    commit('setLoading', false)
  },
  async getPendingProject({ commit }) {
    commit('setLoading', true)

    let client = this.app.apolloProvider.defaultClient

    try {
      const pendingProj = await fetchProjects(client, GET_PENDING_PROJECT)
      commit('fetchPendingProject', pendingProj.getPendingProjects)
    } catch (err) {
      console.error(err)
    }

    commit('setLoading', false)
  },
  async getRejectedProjects({ commit }) {
    commit('setLoading', true)

    let client = this.app.apolloProvider.defaultClient

    try {
      const rejectProj = await fetchProjects(client, GET_REJECTED_PROJECTS)
      commit('fetchRejectedProject', rejectProj.getRejectedProjects)
    } catch (err) {
      console.error(err)
    }

    commit('setLoading', false)
  },
  async createProject({ commit, dispatch }, payload) {
    commit('setLoading', true)

    let client = this.app.apolloProvider.defaultClient

    try {
      const res = await client
        .mutate({
          mutation: CREATE_PROJECT,
          variables: {
            projectInput: payload,
          },
        })
        .then(({ data }) => data && data.addProject)

      if (!!res) {
        await dispatch('getPendingProject')
        await dispatch('getAllProjects')
      }
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: err.message.split(': ')[1],
      })
    }
    commit('setLoading', false)
  },
  async approveProject({ commit, dispatch }, info) {
    commit('setLoading', true)

    console.log('check data: ', info)

    let client = this.app.apolloProvider.defaultClient

    try {
      const resp = await client
        .mutate({
          mutation: APPROVE_PROJECT,
          variables: {
            id: info.uid,
            approval: true,
            contractAddress: info.contractAddress,
          },
        })
        .then(({ data }) => data && data.approveProject)

      if (!!resp) {
        await dispatch('getPendingProject')
        await dispatch('getApprovedProject')
        await dispatch('getAllProjects')
      }
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: err.message.split(': ')[1],
      })
    }
    commit('setLoading', false)
  },
  async rejectProject({ commit, dispatch }, uid) {
    commit('setLoading', true)

    let client = this.app.apolloProvider.defaultClient

    try {
      const resp = await client
        .mutate({
          mutation: REJECT_PROJECT,
          variables: {
            id: uid,
            rejection: true,
          },
        })
        .then(({ data }) => data && data.rejectProject)

      if (resp) {
        await dispatch('getPendingProject')
        await dispatch('getRejectedProjects')
      }
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: err.message.split(': ')[1],
      })
    }

    commit('setLoading', false)
  },
  async updateProject({ commit, dispatch }, payload) {
    commit('setLoading', true)

    let client = this.app.apolloProvider.defaultClient

    try {
      const resp = await client.mutate({
        mutation: UPDATE_PROJECT,
        variables: {
          id: payload.pid,
          projectInput: payload.data,
        },
      })

      if (!!resp) {
        await dispatch('getAllProjects')
      }
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: err.message.split(': ')[1],
      })
    }

    commit('setLoading', false)
  },
  async totalDonation() {
    let client = this.app.apolloProvider.defaultClient

    try {
      const response = await fetchProjects(client, TOTAL_DONATION)
      if (!!response) return response.calTotalDonation
    } catch (err) {
      console.error(err.message.split(': ')[1])
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
