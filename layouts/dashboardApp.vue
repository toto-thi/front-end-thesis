<template>
  <v-app>
    <DashboardNav :user="user" />
    <v-main style="padding: 112px 0px 0px 256px">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import DashboardNav from '~/components/navs/DashboardNav.vue'

export default {
  middleware: 'isAuth',
  computed: {
    ...mapGetters(['user']),
  },
  data() {
    return {
      drawer: true,
      miniVariant: false,
    }
  },
  components: { DashboardNav },
}
</script>

<style>
</style>