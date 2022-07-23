// import { ethers } from 'ethers'

export const connectMetaMask = async (address) => {
  if (address == null) {
    try {
      const { ethereum } = window
      // const provider = new ethers.providers.Web3Provider(ethereum)

      if (!ethereum) {
        alert('Get MetaMask!')
        return
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })

      // const balance = await provider.getBalance(accounts[0])
      // setBalance(ethers.utils.formatEther(balance));

      // return [accounts[0], balance]
      return accounts[0]
    } catch (err) {
      console.log(err)
    }
  }
}
