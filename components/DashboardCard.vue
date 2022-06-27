<template>
  <div>
    <v-row class="mx-2 text-center" >
      <v-col cols="4" v-for="(card, i) in cards" :key="i">
        <v-card class="rounded-xl white--text" color="primary" >
          <v-row class="mt-2 mx-2" style="height: 25vh;">
            <v-col cols="2" align-self="start">
              <v-icon color="white" large> {{ card.icon }}</v-icon>
            </v-col>
            <v-col cols="6" align-self="center">
              <p class="headline"> {{ card.count }}</p>
            </v-col>
            <v-col cols="4" align-self="end">
              <v-card-text class="title font-weight-bold">{{ card.title }}</v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-10 mx-4"> 
      <v-card class="rounded-xl">
        <v-card-title>All Request</v-card-title>
        <v-data-table
        :headers="headers"
        :items="pendingApproval"
        item-key="title"
        class="elevation-1"
        >

        </v-data-table>
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
      cards: [
        {
          icon: 'mdi-chart-areaspline',
          title: 'Projects',
          count: '774'
        },
        {
          icon: 'mdi-chart-areaspline',
          title: 'Active Projects',
          count: '544'
        },
        {
          icon: 'mdi-chart-areaspline',
          title: 'Donated',
          count: '4097.8352 ETH'
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
        }
      ],
      pendingApproval: fakeData
    }
  },
}
</script>

<style scoped>
.decreaseHeight {
  margin-top: 25px;
}
</style>