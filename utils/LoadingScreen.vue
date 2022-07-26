<template>
  <v-dialog v-model="isLoading" color="white" persistent fullscreen>
    <v-container fill-height text-center>
      <v-row justify="center" align="center">
        <v-progress-circular
          indeterminate
          :size="70"
          :width="7"
          color="primary"
        ></v-progress-circular>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script>
export default {
  name: 'LoadingScreen',
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style>
</style>