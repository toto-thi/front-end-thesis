<template>
  <v-container>
    <v-dialog v-model="status" max-width="60%">
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
                  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
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
                  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
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
    </v-dialog>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import { UPLOAD_PROJECT_IMAGES } from '~/graphql/mutations/projectMutate'

export default {
  props: {
    status: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      overlay: false,
      menuStartDate: false,
      menuEndDate: false,
      startDate: '',
      endDate: '',
      title: '',
      description: '',
      location: '',
      targetAmount: '',
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

      return data.multipleFileUploader
      // // let keyString = []
      // for (let i = 0; i < data.multipleFileUploader.length; i++) {
      //   //push string array
      //   stringArray.push(data.multipleFileUploader[i].url.toString())

      //   console.log('check array of string:', stringArray)

      //   // keyString.push({link: data.multipleFileUploader[i].url})

      //   // console.log('check key string: ', keyString)
      // }

      // return stringArray
    },
    async makeRequest() {
      this.overlay = true

      const urlString = await this.addImages()

      console.log('check urlString: ', urlString)

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
      this.imgUrl = ''
      this.closeDialog()
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    closeDialog() {
      this.$emit('closeDialog')
    },
  },
  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false
        }, 3000)
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
}
</script>

<style>
</style>