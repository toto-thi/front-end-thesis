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
        <v-card-title class="text-capitalize"
          >{{ $t('kTransaction') }}
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field
        ></v-card-title>
        <v-data-table
          :headers="headers"
          :items="transactions"
          :items-per-page="5"
          :search="search"
          item-key="title"
          class="elevation-1"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td class="text-center">
                <a :href="`https://ropsten.etherscan.io/tx/${item.txnHash}`">{{
                  shortenTxn(item.txnHash)
                }}</a>
              </td>
              <td class="text-center">{{ shortenTxn(item.fromWalletID) }}</td>
              <td class="text-center">{{ shortenTxn(item.toWalletID) }}</td>
              <td class="text-center">{{ item.message }}</td>
              <td class="text-center">{{ item.projectID.title }}</td>
              <td class="text-center">
                {{ item.donatedBy.firstname }} {{ item.donatedBy.lastname }}
              </td>
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
      required: true,
    },
  },
  components: { ShortText },
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Txn',
          align: 'center',
          value: 'txnHash',
          width: '1%',
        },
        {
          text: 'From',
          align: 'center',
          sortable: false,
          value: 'fromWalletID',
          width: '1%',
        },
        {
          text: 'To',
          align: 'center',
          sortable: false,
          value: 'toWalletID',
          width: '1%',
        },
        {
          text: 'Message',
          align: 'center',
          sortable: false,
          value: 'message',
          width: '1%',
        },
        {
          text: 'Project Name',
          align: 'center',
          sortable: false,
          value: 'title',
          width: '1%',
        },
        {
          text: 'Donated By',
          align: 'center',
          sortable: false,
          value: 'donatedBy',
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
  methods: {
    shortenTxn(address) {
      return shortenAddress(address)
    },
  },
}
</script>

<style>
</style>