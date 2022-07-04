const state = {
    approvedProjects: {},
    pendingProjects: {},
    rejectedProjects: {},
    closedProjects: {}

}

const getters = {
    approved: (state) => state.approvedProjects,
    pending: (state) => state.pendingProjects,
    reject: (state) => state.rejectedProjects,
    closed: (state) => state.closedProjects
}

const mutations = {}

const actions = {}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions,
}
