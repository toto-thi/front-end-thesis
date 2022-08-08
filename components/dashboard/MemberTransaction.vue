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
      <v-tabs v-model="tab" background-color="white" text>
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#tab-1" class="text-capitalize headline">
          {{ $t('kTransactionRecieved') }}
        </v-tab>
        <v-tab href="#tab-2" class="text-capitalize headline">
          {{ $t('kTransactionSend') }}
        </v-tab>
      </v-tabs>
      <v-card width="100%" class="rounded-xl">
        <v-tabs-items v-model="tab">
          <v-tab-item value="tab-1">
            <v-card class="rounded-xl" width="100%">
              <v-card-title class="text-capitalize">
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
                :items="recievedTransactions"
                :items-per-page="5"
                :search="search"
                item-key="title"
                class="elevation-1"
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td class="text-center">
                      <a
                        :href="`https://ropsten.etherscan.io/tx/${item.txnHash}`"
                        >{{ shortenTxn(item.txnHash) }}</a
                      >
                    </td>
                    <td class="text-center">
                      {{
                        item.fromWalletID === $store.getters.user.walletID
                          ? $t('kMe')
                          : shortenTxn(item.fromWalletID)
                      }}
                    </td>
                    <td class="text-center">
                      {{
                        item.toWalletID === $store.getters.user.walletID
                          ? $t('kMe')
                          : shortenTxn(item.toWalletID)
                      }}
                    </td>
                    <td class="text-center">{{ item.message }}</td>
                    <td class="text-center">{{ item.projectID.title }}</td>
                    <td class="text-center">
                      {{ item.donatedBy.firstname }}
                      {{ item.donatedBy.lastname }}
                    </td>
                    <td class="text-center">{{ item.amount }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-2">
            <v-card class="rounded-xl" width="100%">
              <v-card-title class="text-capitalize">
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
                :items="sentTransaction"
                :items-per-page="5"
                :search="search"
                item-key="title"
                class="elevation-1"
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td class="text-center">
                      <a
                        :href="`https://ropsten.etherscan.io/tx/${item.txnHash}`"
                        >{{ shortenTxn(item.txnHash) }}</a
                      >
                    </td>
                    <td class="text-center">
                      {{
                        item.fromWalletID === $store.getters.user.walletID
                          ? $t('kMe')
                          : shortenTxn(item.fromWalletID)
                      }}
                    </td>
                    <td class="text-center">
                      {{
                        item.toWalletID === $store.getters.user.walletID
                          ? $t('kMe')
                          : shortenTxn(item.toWalletID)
                      }}
                    </td>
                    <td class="text-center">{{ item.message }}</td>
                    <td class="text-center">{{ item.projectID.title }}</td>
                    <td class="text-center">
                      {{ item.donatedBy.firstname }}
                      {{ item.donatedBy.lastname }}
                    </td>
                    <td class="text-center">{{ item.amount }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import ShortText from '~/utils/ShortText.vue'
import { shortenAddress } from '~/helpers/shortenAddress'

export default {
  props: {
    recievedTransactions: {
      type: Array,
      required: true,
    },
    sentTransaction: {
      type: Array,
      required: true,
    },
  },
  components: { ShortText },
  data() {
    return {
      search: '',
      tab: null,
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