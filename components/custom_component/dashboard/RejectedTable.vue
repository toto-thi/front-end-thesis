<template>
  <v-card class="rounded-xl" width="100%">
    <v-card-title>Projects that got rejection</v-card-title>
    <v-data-table
      :headers="headers"
      :items="rejectedProjects"
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
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ShortText from '~/utils/ShortText.vue'

export default {
  props: {
    rejectedProjects: {
      type: Array,
      required: true,
    },
  },
  components: { ShortText },
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
      ],
    }
  },
}
</script>

<style>
</style>