<template>
  <users-table :users="userList" />
</template>

<script>
import { mapGetters } from 'vuex'
import UsersTable from '~/components/dashboard/UsersTable.vue'

export default {
  components: { UsersTable },
  layout: 'dashboard',
  computed: { ...mapGetters(['userList']) },
  async mounted() {
    this.$store.dispatch('getAllUsers')
  }
}
</script>

<style>
</style>