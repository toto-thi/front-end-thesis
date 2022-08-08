import { contractABI } from '~/utils/constants'
import { ethers } from 'ethers'

export const createEthereumContract = (contractAddress) => {
  const { ethereum } = window

  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  )

  return transactionContract
}

export const getAllTransactions = async (contractAddress) => {
  // const { ethereum } = window

  try {
      const transactionsContract = createEthereumContract(contractAddress)

      const availableTransactions =
        await transactionsContract.getAllTransactions()

      const structuredTransactions = availableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      )

      return structuredTransactions
    // } else {
    // console.error('Ethereum is not present')
    // }
  } catch (err) {
    console.error(err)
  }
}

export const sendTransaction = async (inputData) => {
  const { ethereum } = window
  const { contractAddress, amount, message, walletID, addressTo } = inputData

  try {
    if (ethereum) {
      const transactionsContract = createEthereumContract(contractAddress)
      const parsedAmount = ethers.utils.parseEther(amount)

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: walletID,
            to: addressTo,
            gas: '0x5208',
            value: parsedAmount._hex,
          },
        ],
      })

      const transactionHash = await transactionsContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message
      )

      const transactionCount = await transactionsContract.getTransactionCount()

      await transactionHash.wait()

      return [transactionHash, transactionCount.toNumber()]
    }
  } catch (err) {
    console.error(err)
  }
}
