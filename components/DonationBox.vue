<template>
  <v-container>
    <v-dialog v-model="status" max-width="25%" class="rounded-xl">
      <v-card color="white">
        <v-card-title class="justify-center">{{ $t('kDonate') }}</v-card-title>
        <v-card-text class="mt-6">
          <v-text-field
            v-model="donateAmount"
            :label="$t('kMoney')"
            type="number"
            :hint="`${$t('kEstimatedPrice')}: $${estimatedPrice}`"
            persistent-hint
            outlined
            prepend-inner-icon="mdi-ethereum"
          ></v-text-field>
          <v-textarea
            v-model="message"
            :label="$t('kMessage')"
            textarea
            outlined
            counter
          >
          </v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="makeDonation">{{
            $t('kDonateBtn')
          }}</v-btn>
          <v-spacer />
          <v-btn color="error" @click="closeBox">{{ $t('kCancelBtn') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import { PriceInUSD } from '~/helpers/calETHPrice'
import { sendTransaction } from '~/helpers/transactionContext'

export default {
  props: {
    status: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      donateAmount: 0,
      message: '',
      estimatedPrice: 0,
    }
  },
  methods: {
    closeBox() {
      this.$emit('closeBox')
    },
    async makeDonation() {
      if (this.user.walletID == null) {
        Swal.fire({
          title: 'Warning',
          text: 'Please connect your wallet before start making donation :)',
        })
      }

      const donateData = {
        contractAddress: this.data.contractAddress,
        amount: this.donateAmount,
        message: this.message,
        walletID: this.data.sender,
        addressTo: this.data.targetWallet,
      }
      console.log('test donate data', donateData)

      await sendTransaction(donateData);
      this.status = false
      this.donateAmount = 0
      this.message = ''
    },
  },
  computed: {
    ...mapGetters(['user']),
  },
  async updated() {
    const response = (
      await PriceInUSD(this.$axios, this.donateAmount)
    ).toLocaleString('en-US')

    this.estimatedPrice = response
  },
}
</script>

<style>
</style>