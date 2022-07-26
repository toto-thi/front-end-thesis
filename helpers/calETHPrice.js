
export const PriceInUSD = async (axios,target) => {
    const ETHPrice = await axios
        .get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
        .then((result) => result.data.USD)

      const calculateExpectedAmount = (target * ETHPrice).toFixed(2)

      return parseFloat(calculateExpectedAmount)
}