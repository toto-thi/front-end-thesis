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
        <v-card color="primary" class="white--text mb-10 mx-10 rounded-xl">
          <v-card-title>
            <v-avatar>
              <v-img :src="project.imgUrl"></v-img>
            </v-avatar>
            <span class="subheadline ml-3"> {{ project.title }}</span>
          </v-card-title>
          <v-divider inset color="white"></v-divider>
          <v-card-text class="white--text">
            {{ project.description }}</v-card-text
          >
          <v-card-text class="white--text">
            Project Start: {{ project.startDate }} <br />
            Project Close: {{ project.endDate }} <br />
            Created By: {{ project.createdBy.firstname }}
            {{ project.createdBy.lastname }}

            <!-- <v-row justify="start">
              <v-col cols="6" align-self="start">
                Created By:
                <v-img
                  :src="project.createdBy.imgUrl"
                  contain
                  height="36px"
                  justify-start
                ></v-img>
              </v-col>
              <v-col class="mr-16">
                {{ project.createdBy.firstname }}
                {{ project.createdBy.lastname }}
              </v-col>
            </v-row> -->
          </v-card-text>
          <v-card-text class="white--text">
            Progress:
            <v-progress-linear
              v-model="project.donateAmount"
              color="#53A700"
              height="25"
              class="white--text rounded-xl"
            >
              <template v-slot:default="{ value }">
                <strong>{{ (value * 100) / project.targetAmount  }}%</strong>
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
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CharityPage',
  computed: {
    ...mapGetters(['approved']),
  },
}
</script>

<style>
</style>