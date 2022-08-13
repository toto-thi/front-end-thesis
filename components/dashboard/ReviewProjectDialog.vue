<template>
  <v-container>
    <v-dialog v-model="status" color="primary" max-width="60%">
      <v-window v-model="onboarding">
        <v-window-item>
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
                :hint="`${$t('kEstimatedPrice')}: $${estimatedPrice}`"
                persistent-hint
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
              <v-carousel
                cycle
                hide-delimiter-background
                show-arrows-on-hover
                class="mt-8"
              >
                <v-carousel-item
                  v-for="(item, i) in items.imageList"
                  :key="i"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                >
                  <v-img :src="item.url" contain height="500px"></v-img>
                </v-carousel-item>
              </v-carousel>
              <!-- PDF here -->
              <p class=" mt-4 title textcolor text-capitalize">
                #{{ $t('kDocument') }}
              </p>
              <p class="title textcolor text-capitalize">
                <a :href="`${items.referenceDoc}`">
                  {{ $t('kDownloadDocument') }}
                </a>
              </p>
              <br />

              <p class="subtitle textcolor text-capitalize">
                {{ $t('kConfirmText') }}.
              </p>
              <v-text-field
                v-model="contractAddress"
                :label="$t('kProjectAddress')"
                persistent-hint
                hint="0xCff... 42characters address"
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
        </v-window-item>
        <v-window-item>
          <v-card color="white" height="45vh">
            <v-card-title class="justify-center headline">
              {{ $t('kLoading') }}
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
import { PriceInUSD } from '~/helpers/calETHPrice'
import Swal from 'sweetalert2'

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
  components: {},
  data() {
    return {
      onboarding: 0,
      estimatedPrice: 0,
      contractAddress: '',
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeMe')
    },
    async approve() {
      if(this.contractAddress === '') {
        Swal.fire({
          title: 'Warning',
          text: 'Please input smart contract address before you approve',
        })
      } else { 
        this.onboarding = 1

      const newInfo = {
        uid: this.items.id,
        contractAddress: this.contractAddress,
      }

      await this.$store.dispatch('approveProject', newInfo)

      this.items = {}
      this.contractAddress = ''
      setTimeout(() => ((this.onboarding = 2), (this.status = false)), 3000)
      }
    },
    async reject() {
      this.onboarding = 1
      await this.$store.dispatch('rejectProject', this.items.id)
      this.items = {}
      this.contractAddress = ''
      setTimeout(() => (this.onboarding = 2), 3000)
    },
    onSuccess() {
      this.onboarding = null
      this.status = false
    },
  },
  async mounted() {
    const response = (
      await PriceInUSD(this.$axios, this.items.targetAmount)
    ).toLocaleString('en-US')

    this.estimatedPrice = response
  },
}
</script>

<style scoped>
.textcolor {
  color: #44496c;
}
</style>