<template>
  <v-app>
    <DashboardNav />
    <v-main style="padding: 112px 0px 0px 256px">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import DashboardNav from '~/components/DashboardNav.vue'

export default {
  middleware: 'isAuth',
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