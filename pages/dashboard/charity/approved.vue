<template>
  <approved-table :approvedProject="approved" />
</template>

<script>
import { mapGetters } from 'vuex'
import ApprovedTable from '~/components/dashboard/ApprovedTable.vue'

export default {
  layout: 'dashboard',
  computed: {
    ...mapGetters(['approved']),
  },
  components: { ApprovedTable },
  async mounted() {
    await this.$store.dispatch('getApprovedProject')
  },
}
</script>

<style>
</style>