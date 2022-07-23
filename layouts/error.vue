<template>
  <v-app dark>
    <div v-if="error.statusCode === 404">
      <v-row justify="center" align="center">
        <h1 class="text-center">
          <v-img contain src="/bug-fix-img.svg" max-height="40vh"> </v-img>
          {{ pageNotFound }}
        </h1>
      </v-row>
      <v-row justify="center" align="center">
        <h1>
          <NuxtLink to="/"> Home page </NuxtLink>
        </h1>
      </v-row>
    </div>
    <div v-else>
      <h1>
        {{ otherError }}
      </h1>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
