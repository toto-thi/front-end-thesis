<template>
  <profile-editor :userProfile="user" />
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileEditor from '~/components/custom_component/dashboard/ProfileEditor.vue'

export default {
  layout: 'dashboardApp',
  computed: { ...mapGetters(['user']) },
  components: { ProfileEditor },
}
</script>

<style>
</style>