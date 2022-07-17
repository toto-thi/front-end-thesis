<template>
  <v-container>
    <v-dialog v-model="status" max-width="60%">
      <v-card>
        <v-card-title>{{ $t('kRequestForm') }}</v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-btn color="primary" text>{{ $t('kApprovalTitle') }}</v-btn>
          <v-spacer />
          <v-btn color="error" text>{{ $t('kRejection') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
    props: {
        status: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style>

</style>