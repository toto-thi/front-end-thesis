<template>
  <v-card class="rounded-xl" width="100%">
    <v-card-title>All Projects</v-card-title>
    <v-data-table
      :headers="headers"
      :items="allProjects"
      :items-per-page="5"
      item-key="title"
      class="elevation-1"
    >
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    allProjects: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
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
          text: 'Recieved (ETH)',
          align: 'center',
          sortable: true,
          value: 'donateAmount',
          width: '1%',
        },
        {
          text: 'Status',
          align: 'center',
          value: 'status',
          sortable: false,
          width: '1%',
        },
      ],
    }
  },
}
</script>

<style>
</style>