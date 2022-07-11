<template>
  <PendingTable :pendingProject="pending" />
</template>

<script>
import { mapGetters } from 'vuex'
import PendingTable from '~/components/custom_component/dashboard/PendingTable.vue'

export default {
  layout: 'dashboardApp',
  computed: {
    ...mapGetters(['pending']),
  },
  components: { PendingTable },
}
</script>

<style>
</style>