<template>
  <v-container>
    <v-dialog v-model="status" color="primary" max-width="60%">
      <v-card color="white">
        <v-card-title class="justify-center mt-6">
          <h1>{{ $t('kReviewProject') }}</h1>
        </v-card-title>
        <v-card-text class="white--text mt-6">
          <v-text-field
            :label="$t('kProjectTitle')"
            v-model="items.title"
            outlined
            readonly
          ></v-text-field>
          <v-textarea
            :label="$t('kProjectDetail')"
            v-model="items.description"
            textarea
            outlined
            counter
            readonly
          ></v-textarea>
          <v-text-field
            v-model="items.targetAmount"
            :label="$t('kTargetAmount')"
            prepend-inner-icon="mdi-ethereum"
            outlined
            type="number"
            readonly
          ></v-text-field>
          <v-text-field
            v-model="items.location"
            :label="$t('kLocation')"
            prepend-inner-icon="mdi-map-marker-multiple"
            :hint="$t('kLocationHint')"
            outlined
            readonly
          ></v-text-field>
          <v-text-field
            v-model="items.startDate"
            :label="$t('kProjectStart')"
            append-icon="mdi-calendar"
            readonly
            outlined
          ></v-text-field>
          <v-text-field
            v-model="items.endDate"
            :label="$t('kProjectClose')"
            append-icon="mdi-calendar"
            readonly
            outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" large @click="approve">
            {{ $t('kApprovalTitle') }}
          </v-btn>
          <v-btn color="error" large @click="reject">{{
            $t('kRejection')
          }}</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="closeDialog" large>
            {{ $t('kCancelBtn') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
   <v-overlay :value="overlay">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
   </v-overlay>
  </v-container>
</template>
<script>
export default {
  props: {
    status: {
      type: Boolean,
      required: true,
    },
    items: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      overlay: false
    }
  },
  watch: {
    overlay(val) {
      val && setTimeout(() => {
        this.overlay = false
      }, 3000)
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeMe')
    },
    async approve() {
      this.overlay = true
      await this.$store.dispatch('approveProject', this.items.id)
      this.status = false
    },
    async reject() {
      this.overlay = true
      await this.$store.dispatch('rejectProject', this.items.id)
      this.status = false
    },
  },
}
</script>

<style>
</style>