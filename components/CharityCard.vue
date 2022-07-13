<template>
  <div>
    <v-row align="center" justify="center">
      <v-sheet rounded="xl" color="#44496c" width="85%">
        <v-row align="center">
          <v-col cols="6" xl="6" sm="6" md="6" align-self="center">
            <v-img
              src="/charity-pic-1.png"
              contain
              height="600"
              width="100%"
            ></v-img>
          </v-col>
          <v-col cols="6" xl="6" sm="6" md="6">
            <v-img
              src="/charity-pic-2.png"
              contain
              height="600"
              width="100%"
            ></v-img>
          </v-col>
        </v-row>
      </v-sheet>
    </v-row>
    <br />
    <br />
    <br />
    <v-row justify="center" align="center" class="mt-16 mx-16">
      <v-col
        cols="4"
        xl="4"
        sm="6"
        md="6"
        v-for="project in approved"
        :key="project.id"
      >
        <v-lazy
          min-height="200"
          :options="{ threshold: 1 }"
          transition="scroll-x-reverse-transition"
        >
          <v-card color="primary" class="white--text mb-10 mx-10 rounded-xl">
            <v-card-title>
              <v-avatar>
                <v-img :src="project.imgUrl"></v-img>
              </v-avatar>
              <span class="subheadline ml-3"> {{ project.title }}</span>
            </v-card-title>
            <v-divider color="white"></v-divider>
            <v-card-text class="white--text">
              <ShortText :text="project.description" :target="100" />
            </v-card-text>
            <v-card-text class="white--text">
              Project Start: {{ project.startDate }} <br />
              Project Close: {{ project.endDate }} <br />
              Created By: {{ project.createdBy.firstname }}
              {{ project.createdBy.lastname }}
            </v-card-text>
            <v-card-text class="white--text">
              Progress:
              <v-progress-linear
                :value="
                  calPercentage(project.donateAmount, project.targetAmount)
                "
                color="#53A700"
                height="25"
                :buffer-value="100"
                class="white--text rounded-xl"
              >
                <template v-slot:default="{ value }">
                  <strong>{{ value }}%</strong>
                </template>
              </v-progress-linear>
            </v-card-text>
            <v-card-actions class="mr-4">
              <v-row align="center" justify="end">
                <v-btn
                  rounded
                  outlined
                  color="white"
                  class="text-capitalize mb-4"
                >
                  Donate Now
                  <v-icon small>mdi-arrow-right</v-icon>
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ShortText from '~/utils/ShortText.vue'

export default {
  name: 'CharityPage',
  computed: {
    ...mapGetters(['approved']),
  },
  data() {
    return {
      progressValue: '',
    }
  },
  methods: {
    calPercentage(donateVal, maxVal) {
      return (donateVal * 100) / maxVal
    },
  },
  components: { ShortText },
}
</script>

<style>
</style>