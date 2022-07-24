import { contractABI } from '~/utils/constants'
import { ethers } from 'ethers'

const { ethereum } = window

const createEthereumContract = (contractAddress) => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  )

  return transactionContract
}

const getAllTransactions = async (contractAddress) => {
  try {
    if (ethereum) {
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
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      )

      return structuredTransactions
    } else {
      console.error('Ethereum is not present')
    }
  } catch (err) {
    console.error(err)
  }
}

const checkIfWalletIsConnected = async (contractAddress) => {
  try {
    if (!ethereum) {
      console.error('Please install MetaMask')
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' })

    if (!accounts.length) {
      getAllTransactions(contractAddress)
    } else {
      console.error('No account found')
    }
  } catch (err) {
    console.error(err)
  }
}

const checkIfTransactionIsExists = async (contractAddress) => {
  try {
    if (ethereum) {
      const transactionsContract = createEthereumContract(contractAddress)
      const currentTransactionCount =
        await transactionsContract.getTransactionCount()

      return currentTransactionCount
    }
  } catch (err) {
    console.error(err)
    throw new Error('No Ethereum object was found')
  }
}

const sendTransaction = async (inputData) => {
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
        message,
        parsedAmount
      )

      const transactionCount = await transactionsContract.getTransactionCount()

      return [transactionHash.hash, transactionCount.toNumber()]
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = [
  checkIfTransactionIsExists,
  getAllTransactions,
  checkIfWalletIsConnected,
  sendTransaction,
]
