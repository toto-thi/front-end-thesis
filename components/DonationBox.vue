<template>
  <v-container>
    <v-dialog
      v-model="status"
      max-width="25%"
      class="rounded-xl"
    >
      <v-card color="white">
        <v-card-title class="justify-center">{{ $t('kDonate') }}</v-card-title>
        <v-card-text class="mt-6">
          <v-text-field
            :label="$t('kMoney')"
            type="number"
            outlined
            prepend-inner-icon="mdi-ethereum"
          ></v-text-field>
          <v-textarea :label="$t('kMessage')" textarea outlined counter>
          </v-textarea>
        </v-card-text>
        <v-card-actions>
            <v-btn color="success" @click="makeDonation">{{ $t('kDonateBtn') }}</v-btn>
            <v-spacer />
            <v-btn color="error" @click="closeBox">{{ $t('kCancelBtn') }}</v-btn>
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
      required: true,
    },
    data: {
        type: Object,
        required: true
    }
  },
  methods: {
    closeBox() {
      this.$emit('closeBox')
    },
    makeDonation() {
        console.log('recieved data', this.data)
        console.log('test test')
    }
  },
}
</script>

<style>
</style>