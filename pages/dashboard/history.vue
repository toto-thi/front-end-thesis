<template>
  <Transactions :transactions="transactions" />
</template>

<script>
import Transactions from '~/components/dashboard/Transactions.vue'

export default {
  components: { Transactions },
  layout: 'dashboard',

  async asyncData({ store }) {
    const response = await store.dispatch('getAllTransactions')

    return {
      transactions: response
    }
  },
}
</script>

<style>
</style>