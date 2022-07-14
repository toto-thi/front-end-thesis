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
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.title }}</td>
          <td class="text-xs-right">
            <ShortText :text="item.description" :target="15" />
          </td>
          <td class="text-center">{{ item.startDate }}</td>
          <td class="text-center">{{ item.endDate }}</td>
          <td class="text-center">{{ item.targetAmount }}</td>
          <td class="text-center">{{ item.donateAmount }}</td>
          <td class="text-center">{{ item.isPending ? 'Pending' : 'Approved' }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ShortText from '~/utils/ShortText.vue'

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
  components: { ShortText },
}
</script>

<style>
</style>