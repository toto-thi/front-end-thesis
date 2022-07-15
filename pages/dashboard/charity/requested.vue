<template>
  <PendingTable :pendingProject="pending" />
</template>

<script>
import { mapGetters } from 'vuex'
import PendingTable from '~/components/dashboard/PendingTable.vue'

export default {
  layout: 'dashboard',
  computed: {
    ...mapGetters(['pending']),
  },
  async mounted() {
    await this.$store.dispatch('getPendingProject')
  },
  components: { PendingTable },
}
</script>

<style>
</style>