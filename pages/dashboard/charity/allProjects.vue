<template>
  <all-project-table :allProjects="allProjects" />
</template>

<script>
import { mapGetters } from 'vuex'
import AllProjectTable from '~/components/custom_component/dashboard/AllProjectTable.vue'

export default {
  layout: 'dashboardApp',
  computed: { ...mapGetters(['allProjects']) },
  components: { AllProjectTable },
}
</script>

<style>
</style>
