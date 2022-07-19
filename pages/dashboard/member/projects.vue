<template>
  <v-container>
    <member-project-card :createdProject="createdProject" />
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      createdProject: null,
    }
  },
  async mounted() {
    const uid = this.$store.getters.user.id
    const response = await this.$store.dispatch('getProjectByCreator', uid)

    this.createdProject = response
  },
}
</script>

<style>
</style>