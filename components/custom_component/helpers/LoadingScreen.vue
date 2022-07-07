<template>
  <!-- <div class="text-center">
    <v-progress-circular
      v-model="loading"
      indeterminate
      :value="10"
      :size="70"
      :width="7"
      color="primary"
    ></v-progress-circular>
  </div> -->
  <v-dialog v-model="loading" persistent fullscreen>
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
    loading: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style>
</style>