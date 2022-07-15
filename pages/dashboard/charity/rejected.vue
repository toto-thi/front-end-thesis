<template>
  <rejected-table :rejectedProjects="reject" />
</template>

<script>
import { mapGetters } from 'vuex'
import RejectedTable from '~/components/dashboard/RejectedTable.vue'

export default {
  layout: 'dashboard',
  computed: { ...mapGetters(['reject']) },
  components: { RejectedTable },
  async mounted() {
    await this.$store.dispatch('getRejectedProjects')
  },
}
</script>

<style>
</style>