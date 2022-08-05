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
      onboarding: 0,
      contractAddress: '',
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeMe')
    },
    async approve() {
      this.onboarding = 1

      const newInfo = {
        uid: this.items.id,
        contractAddress: this.contractAddress,
      }

      await this.$store.dispatch('approveProject', newInfo)
      this.status = false

      this.items = {}
      this.contractAddress = ''
      this.onboarding = 2
    },
    async reject() {
      this.onboarding = 1
      await this.$store.dispatch('rejectProject', this.items.id)
      this.items = {}
      this.contractAddress = ''
      this.onboarding = 2
    },
    onSuccess() {
      this.onboarding = null
      this.status = false
    },
  },
}
</script>

<style>
</style>