<template>
  <div>
    <v-row class="mx-2 text-center">
      <v-col cols="4" v-for="(card, i) in cards" :key="i">
        <v-card class="rounded-xl white--text" color="primary">
          <v-row class="mt-2 mx-2" style="height: 25vh">
            <v-col cols="2" align-self="start">
              <v-icon color="white" large> {{ card.icon }}</v-icon>
            </v-col>
            <v-col cols="6" align-self="center">
              <p class="headline">{{ card.count }}</p>
            </v-col>
            <v-col cols="4" align-self="end">
              <v-card-text class="title font-weight-bold">{{
                card.title
              }}</v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-10 mx-4">
      <PendingTable :pendingProject="pending"/>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PendingTable from './PendingTable.vue'

export default {
  name: 'MainDashboardCard',
  data() {
    return {
      cards: [
        {
          icon: 'mdi-chart-areaspline',
          title: 'Projects',
          count: '774',
        },
        {
          icon: 'mdi-chart-areaspline',
          title: 'Active Projects',
          count: '544',
        },
        {
          icon: 'mdi-chart-areaspline',
          title: 'Donated',
          count: '4097.8352 ETH',
        },
      ],
    }
  },
  beforeCreate() {
    return this.$store.dispatch('getPendingProject')
  },
  computed: {
    ...mapGetters(['pending', 'dLoading']),
  },
  components: { PendingTable },
}
</script>

<style>
</style>