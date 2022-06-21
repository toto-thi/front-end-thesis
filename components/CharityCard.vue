<template>
  <v-main fill-height>
    <v-row align="center" justify="center">
      <v-sheet rounded="xl" color="#44496c">
        <v-row align="center">
          <v-col cols="6" xl="6" sm="12" md="12">
            <v-img
              src="/charity-pic-1.png"
              contain
              height="400"
              width="600"
            ></v-img>
          </v-col>
          <v-col cols="6" xl="6" sm="12" md="12">
            <v-img
              src="/charity-pic-2.png"
              contain
              height="400"
              width="600"
            ></v-img>
          </v-col>
        </v-row>
      </v-sheet>
    </v-row>
    <br />
    <br />
    <br />

    <v-row justify="center" align="center" class="mt-16">
      <v-col
        cols="4"
        xl="4"
        sm="6"
        md="6"
        v-for="project in dummyProjects"
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
            Project Start: {{ project.startDate }}  <br>
            Project Close: {{ project.closeDate }}
          </v-card-text>
          <v-card-actions class="mr-4">
            <v-row align="center" justify="end">
              <v-btn rounded outlined color="white" class="text-capitalize mb-4">
                Donate Now
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import projects from '@/DummyData.json'

export default {
  name: 'CharityPage',
  data() {
    return {
      dummyProjects: projects
    }
  },
}
</script>

<style>
</style>