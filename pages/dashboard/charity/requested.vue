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
  components: { PendingTable },
}
</script>

<style>
</style>