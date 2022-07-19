export const connectMetaMask = async (address) => {
  if (address == '') {
    try {
      const { ethereum } = window

      if (!ethereum) {
        alert('Get MetaMask!')
        return
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })

      return accounts[0]
    } catch (err) {
      console.log(err)
    }
  }
}
