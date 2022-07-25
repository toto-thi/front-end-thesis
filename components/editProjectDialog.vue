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
                  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10)
                "
                @input="menuEndDate = !menuEndDate"
              ></v-date-picker>
            </v-menu>
            <v-file-input
              multiple
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
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      overlay: false,
      menuStartDate: false,
      menuEndDate: false,
      editedItem: {
        startDate: '',
        endDate: '',
        title: '',
        description: '',
        location: '',
        targetAmount: null,
        imgUrl: null,
      },
    }
  },
  methods: {
    async editProjectData() {
      this.overlay = true
      this.editedItem = Object.assign({}, this.item)

      const updateData = {
        pid: this.item.id,
        data: {
          startDate: this.editedItem.startDate,
          endDate: this.editedItem.endDate,
          title: this.editedItem.title,
          description: this.editedItem.description,
          location: this.editedItem.location,
          targetAmount: parseFloat(this.editedItem.targetAmount),
          imageList: this.editedItem.imgUrl,
        },
      }

      await this.$store.dispatch('updateProject', updateData)

      this.editedItem = {}
      this.item = {}
      this.closeDialog()
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
    async uploadImg() {
      //operation here
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