<template>
  <v-container>
    <v-row>
      <v-card
        color="primary"
        class="rounded-xl mb-16 white--text font-weight-bold"
        height="20vh"
        width="100%"
      >
        <v-row justify="center" align="center">
          <v-col cols="6" align-self="center">
            <v-card-title class="justify-center pb-12 text-capitalize">
              <h1>{{ $t('KRequestTitle') }}</h1>
            </v-card-title>
          </v-col>
          <v-col cols="6">
            <v-img src="/request-table-img.svg" contain height="25vh"></v-img>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
    <v-row>
      <v-card class="rounded-xl" width="100%">
        <v-card-title>{{ $t('kRequestBtn') }}</v-card-title>
        <v-data-table
          :headers="headers"
          :items="pendingProject"
          :items-per-page="5"
          item-key="title"
          class="elevation-1"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.title }}</td>
              <td class="text-xs-right">
                <ShortText :text="item.description" :target="15" />
              </td>
              <td class="text-center">{{ item.startDate }}</td>
              <td class="text-center">{{ item.endDate }}</td>
              <td class="text-center">{{ item.targetAmount }}</td>
              <td class="text-center">
                <v-btn color="primary" large @click="reviewProject(item)">
                  <v-icon large color="white">mdi-message-draw</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
        <ReviewProjectDialog
          :status="reviewDialog"
          @closeMe="closeDialog"
          :items="reviewData"
        />
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import ShortText from '~/utils/ShortText.vue'
import ReviewProjectDialog from './ReviewProjectDialog.vue'

export default {
  props: {
    pendingProject: {
      type: Array,
      required: true,
    },
  },
  components: { ShortText, ReviewProjectDialog },
  data() {
    return {
      reviewDialog: false,
      loading: false,
      reviewPID: '',
      reviewData: {},
      headers: [
        {
          text: 'Title',
          align: 'start',
          value: 'title',
          width: '1%',
        },
        {
          text: 'Description',
          align: 'start',
          sortable: false,
          value: 'description',
          width: '1%',
        },
        {
          text: 'Start Date',
          align: 'center',
          sortable: false,
          value: 'startDate',
          width: '1%',
        },
        {
          text: 'End Date',
          align: 'center',
          sortable: false,
          value: 'endDate',
          width: '1%',
        },
        {
          text: 'Target (ETH)',
          align: 'center',
          sortable: true,
          value: 'targetAmount',
          width: '1%',
        },
        {
          text: 'Approval',
          align: 'center',
          value: 'approval',
          sortable: false,
          width: '1%',
        },
      ],
    }
  },
  methods: {
    reviewProject(item) {
      this.reviewDialog = true
      this.reviewPID = item.id
      this.reviewData = Object.assign({}, item)
    },
    closeDialog() {
      this.reviewDialog = false
    },
  },
}
</script>

<style>
</style>