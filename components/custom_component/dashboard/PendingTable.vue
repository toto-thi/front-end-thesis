<template>
  <v-card class="rounded-xl" width="100%">
    <v-card-title>All Request</v-card-title>
    <v-data-table
      :headers="headers"
      :items="pendingProject"
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
        <v-card-title class="text-h5"
          >Are you sure you want to approve this project?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#DF0000" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="#53A700" text @click="confirmApproval">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogReject" max-width="50%" max-height="200px">
      <v-card color="primary" class="rounded-xl white--text">
        <v-card-title class="text-h5"
          >Are you sure you want to reject this project?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#DF0000" text @click="dialogReject = !dialogReject"
            >Cancel</v-btn
          >
          <v-btn color="#53A700" text @click="confirmReject">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
    props:{
        pendingProject: {
            type: Array,
            required: true
        }
    },
  data() {
    return {
      dialogApprove: false,
      dialogReject: false,
      setStatus: {
        id: '',
        approval: ''
      },
      headers: [
        {
          text: 'Title',
          align: 'start',
          value: 'title',
          width: '1%'
        },
        {
          text: 'Description',
          align: 'start',
          sortable: false,
          value: 'description',
          width: '1%'
        },
        {
          text: 'Start Date',
          align: 'center',
          sortable: false,
          value: 'startDate',
          width: '1%'
        },
        {
          text: 'End Date',
          align: 'center',
          sortable: false,
          value: 'endDate',
          width: '1%'
        },
        {
          text: 'Approval',
          align: 'center',
          value: 'approval',
          sortable: false,
          width: '1%'
        },
      ],
    }
  },
  methods: {
    closeDialog() {
      this.dialogApprove = false
    },
    confirmApproval() {
      this.dialogApprove = false
    },
    approveProject(item) {
      this.dialogApprove = true
      const updateStatus = {
        id: item.id,
        approval: true
      }
      this.$store.dispatch('approveProject', updateStatus)
    },
    rejectProject(item) {
      this.dialogReject = true
    },
    confirmReject() {
      alert('rejected')
      this.dialogReject = false
    },
  },
}
</script>

<style>
</style>