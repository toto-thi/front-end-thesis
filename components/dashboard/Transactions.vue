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
              <h1>{{ $t('kTransaction') }}</h1>
            </v-card-title>
          </v-col>
          <v-col cols="6">
            <v-img src="/transaction-img.svg" contain height="25vh"></v-img>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
    <v-row>
      <v-card class="rounded-xl" width="100%">
        <v-card-title class="text-capitalize">{{
          $t('kTransaction')
        }}</v-card-title>
        <v-data-table
          :headers="headers"
          :items="transactions"
          :items-per-page="5"
          item-key="title"
          class="elevation-1"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ shortenTxn(item.txnHash) }}</td>
              <td class="text-xs-right">
                <ShortText :text="item.description" :target="15" />
              </td>
              <td class="text-center">{{ item.transferTime }}</td>
              <td class="text-center">{{ item.projectname }}</td>
              <td class="text-center">{{ item.donatedBy.firstname }}</td>
              <td class="text-center">{{ item.amount }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import ShortText from '~/utils/ShortText.vue'
import { shortenAddress } from '~/helpers/shortenAddress'

export default {
  props: {
    transactions: {
      type: Array,
      //   required: true,
    },
  },
  async mounted() {
    await this.$store.dispatch('getRejectedProjects')
  },
  components: { ShortText },
  data() {
    return {
      headers: [
        {
          text: 'Txn',
          align: 'start',
          value: 'txnHash',
          width: '1%',
        },
        {
          text: 'Title',
          align: 'start',
          value: 'title',
          width: '1%',
        },
        {
          text: 'Date and Time',
          align: 'start',
          sortable: false,
          value: 'transferTime',
          width: '1%',
        },
        {
          text: 'Project Name',
          align: 'center',
          sortable: false,
          value: 'projectname',
          width: '1%',
        },
        {
          text: 'By',
          align: 'center',
          sortable: false,
          value: 'username',
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
  computed: {
    shortenTxn(address) {
        return shortenAddress(address);
    }
  }
}
</script>

<style>
</style>