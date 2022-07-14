<template>
  <CharityProjectDetail :project="project" />
</template>

<script>
import CharityProjectDetail from '~/components/CharityProjectDetail.vue'

export default {
  name: 'ProjectShow',
  async asyncData({ params, store }) {
    const projectData = await store.dispatch('getProjectDetail', params.id)
    return {
      project: projectData,
    }
  },
  components: {
    CharityProjectDetail,
  },
}
</script>

<style>
</style>