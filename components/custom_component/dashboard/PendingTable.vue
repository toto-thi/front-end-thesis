<template>
  <v-card class="rounded-xl" width="100%">
    <v-card-title>All Request</v-card-title>
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
            <v-icon color="#53A700" class="mx-2" @click="approveProject(item)"
              >mdi-check-decagram</v-icon
            >
            <v-icon color="#DF0000" class="mx-2" @click="rejectProject(item)"
              >mdi-cancel</v-icon
            >
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogApprove" max-width="50%" max-height="200px">
      <v-card color="primary" class="rounded-xl white--text">
        <v-card-title class="text-h5"
          >Are you sure you want to approve this project?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#DF0000" text @click="dialogApprove = !dialogApprove"
            >Cancel</v-btn
          >
          <v-btn color="#53A700" text @click="confirmApproval">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogReject"
      max-width="50%"
      max-height="200px"
      class="primary"
    >
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
import ShortText from '~/utils/ShortText.vue'

export default {
  props: {
    pendingProject: {
      type: Array,
      required: true,
    },
  },
  components: { ShortText },
  data() {
    return {
      dialogApprove: false,
      dialogReject: false,
      selected: [],
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
    approveProject(item) {
      this.dialogApprove = true
      this.selected.id = item.id
      this.selected.approval = true
    },
    confirmApproval() {
      this.dialogApprove = false
      this.$store.dispatch('approveProject', this.selected)
    },
    rejectProject(item) {
      this.dialogReject = true
      this.selected.id = item.id
      this.selected.rejection = true
    },
    confirmReject() {
      this.dialogReject = false
      this.$store.dispatch('rejectProject', this.selected)
    },
  },
}
</script>

<style>
</style>