import { connectMetaMask } from '~/helpers/connectMetaMask'

const state = {
  walletAddress: "",
  connectionStatus: false,
}

const getters = {
  walletAddress: (state) => state.walletAddress,
  connectionStatus: (state) => state.connectionStatus,
}

const mutations = {
  setWalletAddress(state, payload) {
    state.walletAddress = payload
  },
  setConnectionStatus(state, payload) {
    state.connectionStatus = payload
  },
}

const actions = {
  async connectWallet({ commit }, address) {
    const res = await connectMetaMask(address)

    console.log('wallet id: ', res)
    if (!!res) {
      commit('setWalletAddress', res)
      commit('setConnectionStatus', true)
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
