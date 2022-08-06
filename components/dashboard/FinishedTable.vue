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
            <v-card-title class="justify-center pb-12">
              <h1 class="text-capitalize">{{ $t('kFinishedBtn') }}</h1>
            </v-card-title>
          </v-col>
          <v-col cols="6">
            <v-img src="/finished-table-img.svg" contain height="25vh"></v-img>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
    <v-row>
      <v-card class="rounded-xl" width="100%">
        <v-card-title class="text-capitalize">{{
          $t('kFinishedBtn')
        }}</v-card-title>
        <v-data-table
          :headers="headers"
          :items="finishedProject"
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
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import ShortText from '~/utils/ShortText.vue'

export default {
  props: {
    finishedProject: {
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
          text: 'Donated (ETH)',
          align: 'center',
          sortable: true,
          value: 'donateAmount',
          width: '1%',
        },
      ],
    }
  },
  components: {
    ShortText,
  },
}
</script>

<style>
</style>