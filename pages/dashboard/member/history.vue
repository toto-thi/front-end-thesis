<template>
  <v-container>
    <MemberTransaction
      :recievedTransactions="recieveHistory"
      :sentTransaction="sendHistory"
    />
  </v-container>
</template>

<script>
import MemberTransaction from '~/components/dashboard/MemberTransaction.vue'

export default {
  layout: 'dashboard',
  components: { MemberTransaction },

  data() {
    return {
      recieveHistory: [],
      sendHistory: []
    }
  },
  async mounted() {
    
    const walletID = this.$store.getters.user.walletID
    console.log('check wallet ', walletID)

    const response = await Promise.all([
      this.$store.dispatch('getUserTransactions', walletID),
      this.$store.dispatch('getSendHistory', walletID),
    ])

    console.log('check response', response[0])

    if (!!response) {
      this.recieveHistory = !!response[0] ? response[0] : []
      this.sendHistory = !!response[1] ? response[1] : []
    }
  },
}
</script>

<style>
</style>