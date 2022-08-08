<template>
  <v-container>
    <v-dialog v-model="status" max-width="25%" class="rounded-xl">
      <v-window v-model="onboarding">
        <v-window-item>
          <v-card color="white" height="45vh">
            <v-card-title class="justify-center">{{
              $t('kDonate')
            }}</v-card-title>
            <v-card-text class="mt-6">
              <v-text-field
                
                :label="$t('kMoney')"
                @input="donateAmount"
                type="number"
                :min="0"
                :hint="`${$t('kEstimatedPrice')}: $${estimatedPrice}`"
                append-icon="MAX"
                persistent-hint
                outlined
                prepend-inner-icon="mdi-ethereum"
              ></v-text-field>
              <v-textarea
                v-model="message"
                :label="$t('kMessage')"
                :rules="textLimit"
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
              <v-btn color="error" @click="closeBox">{{
                $t('kCancelBtn')
              }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-window-item>
        <v-window-item>
          <v-card color="white" height="45vh">
            <v-card-title class="justify-center headline">
              {{ $t('kDonating') }}
            </v-card-title>
            <v-card-text class="text-center">
              <v-row class="mt-16 pt-16" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  size="64"
                  color="primary"
                ></v-progress-circular>
              </v-row>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item>
          <v-card color="white" height="20vh" class="text-center">
            <v-row align="end" justify="center" class="mt-16 pt-16">
              <v-btn color="success" @click="onSuccess">
                <v-icon>mdi-check-circle-outline</v-icon> &nbsp;
                {{ $t('kDoneBtn') }}!
              </v-btn>
            </v-row>
          </v-card>
        </v-window-item>
      </v-window>
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
      onboarding: 0,
      textLimit: [(v) => v.length <= 40 || 'Max 40 Characters'],
    }
  },
  methods: {
    closeBox() {
      this.$emit('closeBox')
    },
    async makeDonation() {
      const getMoney = parseFloat(this.donateAmount).toFixed(2)
      const currentMoney = parseFloat(this.currentDonate).toFixed(2)
      const target = parseFloat(this.data.targetAmount).toFixed(2)
      const sum = getMoney + currentMoney

      if (this.user.walletID == null) {
        Swal.fire({
          title: 'Warning',
          text: 'Please connect your wallet before start making donation :)',
        })
      } else if (this.donateAmount === 0) {
        Swal.fire({
          title: 'Warning',
          text: 'Please input donation amount before you donate',
        })
      } else if (parseFloat(sum).toFixed(2) > target) {
        Swal.fire({
          icon: 'warning',
          text: 'We appreciated your kindness, but we only need the exact target amount. Please re-enter your donation amount.',
        })
        this.donateAmount = 0
        this.message = ''
      } else {
        this.onboarding = 1
        
        const donateData = {
          contractAddress: this.data.contractAddress,
          amount: getMoney,
          message: this.message,
          walletID: this.data.sender,
          addressTo: this.data.targetWallet,
        }

        const res = await sendTransaction(donateData)

        const transactionDetail = {
          txnHash: res[0].hash,
          projectID: this.data.id,
          contractAddress: this.data.contractAddress,
          fromWalletID: this.data.sender,
          toWalletID: this.data.targetWallet,
          amount: parseFloat(getMoney),
          message: this.message,
          donatedBy: this.$store.getters.user.id,
        }
        
        if (!!res) {
          await this.$store.dispatch('addToTransaction', transactionDetail)
          if (parseFloat(sum).toFixed(2) === target)
           {
            await this.$store.dispatch('closeProject', this.data.id)
          }
        }
        this.onboarding = 2
      }
    },
    onSuccess() {
      this.status = false
      this.onboarding = null
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