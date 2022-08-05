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
                  v-model="item.title"
                  outlined
                ></v-text-field>
                <v-textarea
                  :label="$t('kProjectDetail')"
                  v-model="item.description"
                  textarea
                  outlined
                  counter
                ></v-textarea>
                <v-text-field
                  v-model="item.targetAmount"
                  :label="$t('kTargetAmount')"
                  prepend-inner-icon="mdi-ethereum"
                  outlined
                  type="number"
                ></v-text-field>
                <v-text-field
                  v-model="item.location"
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
                    v-model="item.startDate"
                    no-title
                    max="2050-01-01"
                    min="2020-01-01"
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
                    v-model="item.endDate"
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
              <v-btn color="primary" text @click="editProjectData">{{
                $t('kUpdateBtn')
              }}</v-btn>
              <v-btn color="error" text @click="closeDialog">
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
import gql from 'graphql-tag'
import { UPLOAD_PROJECT_IMAGES } from '~/graphql/mutations/projectMutate'

export default {
  props: {
    status: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      onboarding: 0,
      menuStartDate: false,
      menuEndDate: false,
      editedItem: {
        startDate: '',
        endDate: '',
        title: '',
        description: '',
        location: '',
        targetAmount: null,
        files: [],
      },
      files: [],
    }
  },
  methods: {
    async editProjectData() {
      this.onboarding = 1
      this.editedItem = Object.assign({}, this.item)

      const response = await this.uploadImg()

      if (!!response) {
        this.editedItem.files = response
      }

      const updateData = {
        pid: this.item.id,
        data: {
          startDate: this.editedItem.startDate,
          endDate: this.editedItem.endDate,
          title: this.editedItem.title,
          description: this.editedItem.description,
          location: this.editedItem.location,
          targetAmount: parseFloat(this.editedItem.targetAmount),
          imageList: this.editedItem.files,
        },
      }

      await this.$store.dispatch('updateProject', updateData)

      this.editedItem = {}
      this.item = {}
      this.onboarding = 2
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    closeDialog() {
      this.$emit('closeDialog')
      this.status = false
    },
    onSuccess() {
      this.status = false
      this.onboarding = null
    },
    async uploadImg() {
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
  },
  computed: {
    startDateFormatted() {
      return this.formatDate(this.item.startDate)
    },
    endDateFormatted() {
      return this.formatDate(this.item.endDate)
    },
  },
}
</script>

<style>
</style>