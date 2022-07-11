<template>
  <approved-table :approvedProject="approved" />
</template>

<script>
import { mapGetters } from 'vuex'
import ApprovedTable from '~/components/custom_component/dashboard/ApprovedTable.vue'

export default {
  layout: 'dashboardApp',
  computed: {
    ...mapGetters(['approved']),
  },
  components: { ApprovedTable },
}
</script>

<style>
</style>