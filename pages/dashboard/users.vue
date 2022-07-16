<template>
  <users-table :users="userList" />
</template>

<script>
import { mapGetters } from 'vuex'
import UsersTable from '~/components/dashboard/UsersTable.vue'

export default {
  components: { UsersTable },
  layout: 'dashboard',
  async asyncData({ store }) {
    const response = await store.dispatch('getAllUsers');
    return {
      userList: response
    }
  },
}
</script>

<style>
</style>