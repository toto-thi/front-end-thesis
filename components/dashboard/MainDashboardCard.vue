<template>
  <div>
    <div>
      <v-container>
        <v-row class="mx-2 text-center">
          <v-col>
            <v-card class="rounded-xl white--text" color="primary">
              <v-row class="mt-2 mx-2" style="height: 25vh">
                <v-col cols="2" align-self="start">
                  <v-icon color="white" large> mdi-chart-areaspline </v-icon>
                </v-col>
                <v-col cols="6" align-self="center">
                  <p class="headline">{{ allProjects.length }}</p>
                </v-col>
                <v-col cols="4" align-self="end">
                  <v-card-text class="title font-weight-bold">{{
                    $t('kProjectCount')
                  }}</v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="rounded-xl white--text" color="primary">
              <v-row class="mt-2 mx-2" style="height: 25vh">
                <v-col cols="2" align-self="start">
                  <v-icon color="white" large> mdi-chart-donut </v-icon>
                </v-col>
                <v-col cols="6" align-self="center">
                  <p class="headline">{{ approved.length }}</p>
                </v-col>
                <v-col cols="4" align-self="end">
                  <v-card-text class="title font-weight-bold text-capitalize">{{
                    $t('kProjectActiveCount')
                  }}</v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="rounded-xl white--text" color="primary">
              <v-row class="mt-2 mx-2" style="height: 25vh">
                <v-col cols="2" align-self="start">
                  <v-icon color="white" large> mdi-ethereum </v-icon>
                </v-col>
                <v-col cols="6" align-self="center">
                  <p class="headline">{{ totalDonation }}</p>
                  ({{ $t('kEstimatedPrice') }} {{ estimatedInUSD }})
                </v-col>
                <v-col cols="4" align-self="end">
                  <v-card-text class="title font-weight-bold">{{
                    $t('kTotalDonation')
                  }}</v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="mt-10 mx-4">
          <AllProjectTable :allProjects="allProjects" />
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { PriceInUSD } from '~/helpers/calETHPrice'
import LoadingScreen from '~/utils/LoadingScreen.vue'
import AllProjectTable from './AllProjectTable.vue'

export default {
  name: 'MainDashboardCard',
  data() {
    return {
      totalDonation: 0,
      estimatedInUSD: 0,
    }
  },
  async mounted() {
    this.calTotalDonation()
  },
  methods: {
    async calTotalDonation() {
      const resData = await this.$store.dispatch('totalDonation')

      this.totalDonation = resData
    },
  },
  async mounted() {
    const response = (
      await PriceInUSD(this.$axios, this.donateAmount)
    ).toLocaleString('en-US')

    this.estimatedInUSD = response
  },
  computed: {
    ...mapGetters(['allProjects', 'approved', 'dLoading', 'loading']),
  },
  components: { LoadingScreen, AllProjectTable },
}
</script>

<style>
</style>