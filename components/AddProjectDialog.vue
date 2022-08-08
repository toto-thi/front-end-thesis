<template>
  <v-container>
    <v-dialog v-model="status" max-width="60%">
      <v-window v-model="onboarding">
        <v-window-item>
          <v-card>
            <v-card-title class="justify-center">{{
              $t('kRequestForm')
            }}</v-card-title>
            <v-card-text class="mt-3">
              <v-container>
                <v-text-field
                  :label="$t('kProjectTitle')"
                  v-model="title"
                  outlined
                ></v-text-field>
                <v-textarea
                  :label="$t('kProjectDetail')"
                  v-model="description"
                  textarea
                  outlined
                  counter
                ></v-textarea>
                <v-text-field
                  v-model="targetAmount"
                  :label="$t('kTargetAmount')"
                  :hint="`${$t('kEstimatedPrice')}: $${estimatedPrice}`"
                  persistent-hint
                  prepend-inner-icon="mdi-ethereum"
                  outlined
                  type="number"
                ></v-text-field>
                <v-text-field
                  v-model="location"
                  :label="$t('kLocation')"
                  prepend-inner-icon="mdi-map-marker-multiple"
                  :hint="$t('kLocationHint')"
                  outlined
                ></v-text-field>
                <v-menu
                  v-model="menuStartDate"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="startDateFormatted"
                      :label="$t('kProjectStart')"
                      hint="MM/DD/YYYY format"
                      persistent-hint
                      append-icon="mdi-calendar"
                      readonly
                      outlined
                      clearable
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startDate"
                    no-title
                    max="2050-01-01"
                    :min="
                      new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .substr(0, 10)
                    "
                    @input="menuStartDate = !menuStartDate"
                  ></v-date-picker>
                </v-menu>
                <v-menu
                  v-model="menuEndDate"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="endDateFormatted"
                      :label="$t('kProjectClose')"
                      hint="MM/DD/YYYY format"
                      persistent-hint
                      append-icon="mdi-calendar"
                      readonly
                      outlined
                      clearable
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="endDate"
                    no-title
                    max="2050-01-01"
                    :min="
                      new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .substr(0, 10)
                    "
                    @input="menuEndDate = !menuEndDate"
                  ></v-date-picker>
                </v-menu>
                <v-file-input
                  multiple
                  v-model="files"
                  :label="$t('kUploadImgBtn')"
                  accept="image/*"
                  outlined
                  clearable
                  small-chips
                ></v-file-input>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" text @click="makeRequest">
                {{ $t('kMakeRequest') }}
              </v-btn>
              <v-btn color="error" text @click="closeDialog">
                {{ $t('kCancelBtn') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-window-item>
        <v-window-item>
          <v-card color="white" height="60vh">
            <v-card-title class="justify-center headline">
              {{ $t('kAdding') }}
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
              <v-btn color="success" @click="closeDialog">
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
import gql from 'graphql-tag'
import { UPLOAD_PROJECT_IMAGES } from '~/graphql/mutations/projectMutate'
import { PriceInUSD } from '~/helpers/calETHPrice'

export default {
  props: {
    status: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      menuStartDate: false,
      menuEndDate: false,
      onboarding: 0,
      startDate: '',
      endDate: '',
      title: '',
      description: '',
      location: '',
      targetAmount: 0,
      estimatedPrice: 0,
      files: [],
    }
  },
  methods: {
    async addImages() {
      let stringArray = []

      const { data } = await this.$apollo.mutate({
        mutation: gql`
          ${UPLOAD_PROJECT_IMAGES}
        `,
        variables: {
          files: this.files,
        },
      })

      for (let { url } of data.multipleFileUploader) {
        stringArray.push({ url: url })
      }

      return stringArray
    },
    async makeRequest() {
      this.onboarding = 1

      const urlString = await this.addImages()

      const newData = {
        title: this.title,
        description: this.description,
        startDate: this.startDate,
        endDate: this.endDate,
        location: this.location,
        targetAmount: parseFloat(this.targetAmount),
        imageList: urlString,
      }

      await this.$store.dispatch('createProject', newData)

      this.title = ''
      this.description = ''
      this.startDate = ''
      this.endDate = ''
      this.location = ''
      this.targetAmount = ''
      this.files = []
      setTimeout(() => (this.onboarding = 2), 3000)
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    closeDialog() {
      this.$emit('closeDialog')
    },
    onSuccess() {
      this.onboarding = 0
      this.status = false
    },
  },
  computed: {
    startDateFormatted() {
      return this.formatDate(this.startDate)
    },
    endDateFormatted() {
      return this.formatDate(this.endDate)
    },
  },
  async updated() {
    const response = (
      await PriceInUSD(this.$axios, this.targetAmount)
    ).toLocaleString('en-US')

    this.estimatedPrice = response
  },
}
</script>

<style>
</style>