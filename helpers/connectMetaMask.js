export const connectMetaMask = async (address) => {
  if (address == null || address == '') {
    try {
      const { ethereum } = window

      console.log('check this')

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
  } else {
    console.error('something went wrong')
  }
}
