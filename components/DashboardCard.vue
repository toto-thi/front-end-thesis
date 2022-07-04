<template>
  <div>
    <v-row class="mx-2 text-center">
      <v-col cols="4" v-for="(card, i) in cards" :key="i">
        <v-card class="rounded-xl white--text" color="primary">
          <v-row class="mt-2 mx-2" style="height: 25vh">
            <v-col cols="2" align-self="start">
              <v-icon color="white" large> {{ card.icon }}</v-icon>
            </v-col>
            <v-col cols="6" align-self="center">
              <p class="headline">{{ card.count }}</p>
            </v-col>
            <v-col cols="4" align-self="end">
              <v-card-text class="title font-weight-bold">{{
                card.title
              }}</v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-10 mx-4">
      <v-card class="rounded-xl" width="100%">
        <v-card-title>All Request</v-card-title>
        <v-data-table
          :headers="headers"
          :items="pendingApproval"
          item-key="title"
          class="elevation-1"
        >
          <template v-slot:item.approval="{ item }">
            <v-icon color="#53A700" class="mx-2" @click="approveProject(item)"
              >mdi-check-decagram</v-icon
            >
            <v-icon color="#DF0000" class="mx-2" @click="rejectProject(item)"
              >mdi-cancel</v-icon
            >
          </template>
        </v-data-table>
        <v-dialog v-model="dialogApprove" max-width="50%" max-height="200px">
            <v-card color="primary" class="rounded-xl white--text">
              <v-card-title class="text-h5">Are you sure you want to approve this project?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#DF0000" text @click="closeDialog">Cancel</v-btn>
                <v-btn color="#53A700" text @click="confirmApproval">Confirm</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogReject" max-width="50%" max-height="200px">
            <v-card color="primary" class="rounded-xl white--text">
              <v-card-title class="text-h5">Are you sure you want to reject this project?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#DF0000" text @click="dialogReject = !dialogReject">Cancel</v-btn>
                <v-btn color="#53A700" text @click="confirmReject">Confirm</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import fakeData from '../DummyData.json'

export default {
  name: 'DashBoardCard',
  data() {
    return {
      dialogApprove: false,
      dialogReject: false,
      cards: [
        {
          icon: 'mdi-chart-areaspline',
          title: 'Projects',
          count: '774',
        },
        {
          icon: 'mdi-chart-areaspline',
          title: 'Active Projects',
          count: '544',
        },
        {
          icon: 'mdi-chart-areaspline',
          title: 'Donated',
          count: '4097.8352 ETH',
        },
      ],
      headers: [
        {
          text: 'Title',
          align: 'start',
          value: 'title',
        },
        {
          text: 'Description',
          align: 'start',
          sortable: false,
          value: 'description',
        },
        {
          text: 'Start Date',
          align: 'center',
          sortable: false,
          value: 'startDate',
        },
        {
          text: 'End Date',
          align: 'center',
          sortable: false,
          value: 'closeDate',
        },
        {
          text: 'Approval',
          align: 'center',
          value: 'approval',
          sortable: false,
        },
      ],
      pendingApproval: fakeData,
    }
  },
  methods: {
    closeDialog() {
      this.dialogApprove = false
    },
    confirmApproval() {
      alert('ok done')
      this.dialogApprove = false
    },
    approveProject(item) {
      this.dialogApprove = true
    },
    rejectProject(item) {
      this.dialogReject = true
    },
    confirmReject() {
      alert('rejected')
      this.dialogReject = false
    }
  },
}
</script>

<style scoped>
.decreaseHeight {
  margin-top: 25px;
}
</style>