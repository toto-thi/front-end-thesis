<template>
  <v-app light>
    <AppNavbar />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppNavbar from '~/components/AppNavbar.vue'
import AppFooter from '~/components/AppFooter.vue'
export default {
  name: 'DefaultLayout',
  data() {
    return {
      fixed: false,
    }
  },
  components: { AppFooter, AppNavbar },
}
</script>
