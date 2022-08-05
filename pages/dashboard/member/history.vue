<template>
  <v-container>
    <MemberTransaction :transactions="userTransactions" />
  </v-container>
</template>

<script>
import MemberTransaction from '~/components/dashboard/MemberTransaction.vue'

export default {
  layout: 'dashboard',
  components: { MemberTransaction },

  async asyncData({ store }) {
    console.log('check wallet address', store.getters.user.walletID)

    const response = await store.dispatch(
      'getUserTransactions',
      store.getters.user.walletID
    )

    if (!!response) {
      return {
        userTransactions: response,
      }
    }
  },
}
</script>

<style>
</style>