<template>
  <all-project-table :allProjects="allProjects" />
</template>

<script>
import { mapGetters } from 'vuex'
import AllProjectTable from '~/components/dashboard/AllProjectTable.vue'

export default {
  layout: 'dashboard',
  computed: { ...mapGetters(['allProjects']) },
  components: { AllProjectTable },
  async mounted() {
    await this.$store.dispatch('getAllProjects')
  },
}
</script>

<style>
</style>
