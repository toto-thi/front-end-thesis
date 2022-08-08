<template>
  <Transactions :transactions="transactions" />
</template>

<script>
import Transactions from '~/components/dashboard/Transactions.vue'

export default {
  components: { Transactions },
  layout: 'dashboard',
  data() {
    return {
      transactions: []
    }
  },
  async mounted() {
    const response = await this.$store.dispatch('getAllTransactions')
    this.transactions = response
  },
}
</script>

<style>
</style>