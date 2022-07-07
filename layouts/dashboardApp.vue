<template>
  <v-app>
    <div v-if="loading">
      <loading-screen :loading="loading" />
    </div>
    <div v-else>
      <DashboardNav :user="user" />
      <v-main style="padding: 112px 0px 0px 256px">
        <v-container fluid>
          <nuxt />
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import DashboardNav from '../components/custom_component/navs/DashboardNav.vue'
import LoadingScreen from '../components/custom_component/helpers/LoadingScreen.vue'

export default {
  middleware: 'isAuth',
  computed: {
    ...mapGetters(['user', 'loading']),
  },
  data() {
    return {
      drawer: true,
      miniVariant: false,
    }
  },
  components: { DashboardNav, LoadingScreen },
}
</script>

<style>
</style>