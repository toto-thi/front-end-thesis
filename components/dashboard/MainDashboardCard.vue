<template>
  <div>
    <div>
      <v-container>
        <v-row class="mx-2 text-center">
          <v-col>
            <v-card class="rounded-xl white--text" color="primary">
              <v-row class="mt-2 mx-2" style="height: 25vh">
                <v-col cols="1" align-self="start">
                  <v-icon color="white" large> mdi-chart-areaspline </v-icon>
                </v-col>
                <v-col cols="6" align-self="center">
                  <p class="display-1 px-16 mx-16 font-weight-bold">
                    {{ allProjects.length }}
                  </p>
                </v-col>
                <v-col cols="5" align-self="end">
                  <v-card-text class="title font-weight-bold">
                    {{ $t('kProjectCount') }}</v-card-text
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="rounded-xl white--text" color="primary">
              <v-row class="mt-2 mx-2" style="height: 25vh">
                <v-col cols="1" align-self="start">
                  <v-icon color="white" large> mdi-chart-donut </v-icon>
                </v-col>
                <v-col cols="4" align-self="center">
                  <p class="display-1 mx-16 px-16 font-weight-bold">
                    {{ approved.length }}
                  </p>
                </v-col>
                <v-col cols="7" align-self="end">
                  <v-card-text class="title font-weight-bold text-capitalize">
                    {{ $t('kProjectActiveCount') }}
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="rounded-xl white--text" color="primary">
              <v-row class="mt-2 mx-2" style="height: 25vh">
                <v-col cols="1" align-self="start">
                  <v-icon color="white" large> mdi-ethereum </v-icon>
                </v-col>
                <v-col cols="7" align-self="center">
                  <p class="mt-8 display-1 font-weight-bold">
                    {{ !!totalDonation ? totalDonation : 0 }}
                  </p>
                  <p class="subtitle-1">≈ ${{ !!totalDonation ? estimatedInUSD : 0 }}</p>
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
import AllProjectTable from './AllProjectTable.vue'

export default {
  name: 'MainDashboardCard',
  data() {
    return {
      totalDonation: 0,
      estimatedInUSD: 0,
    }
  },
  methods: {
    async calTotalDonation() {
      const resData = await this.$store.dispatch('totalDonation')
      this.totalDonation = parseFloat(resData)
    },
  },
  async mounted() {
    await this.calTotalDonation()

    const response = (
      await PriceInUSD(this.$axios, this.totalDonation)
    ).toLocaleString('en-US')

    this.estimatedInUSD = response
  },
  computed: {
    ...mapGetters(['allProjects', 'approved', 'dLoading', 'loading']),
  },
  components: { AllProjectTable },
}
</script>

<style>
</style>