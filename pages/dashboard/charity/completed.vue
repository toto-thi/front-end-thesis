<template>
  <FinishedTable :finishedProject="closed"/>
</template>

<script>
import { mapGetters } from 'vuex'
import FinishedTable from '~/components/dashboard/FinishedTable.vue'

export default {
  layout: 'dashboard',
  components: { FinishedTable },
  computed: {
    ...mapGetters(['closed'])
  }

}
</script>

<style>
</style>