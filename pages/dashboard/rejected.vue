<template>
  <rejected-table :rejectedProjects="reject" />
</template>

<script>
import { mapGetters } from 'vuex'
import RejectedTable from '~/components/custom_component/dashboard/RejectedTable.vue'

export default {
  layout: 'dashboardApp',
  computed: { ...mapGetters(['reject']) },
  components: { RejectedTable },
}
</script>

<style>
</style>