<template>
  <div>
    <v-row align="center" justify="center" class="mb-16 pb-16">
      <v-card class="rounded-xl pa-2" color="primary" height="40vh">
        <v-row class="white--text">
          <v-col cols="6">
            <v-card-title class="justify-center display-2">{{
              $t('kProblemTitle')
            }}</v-card-title>
            <v-img src="/about-problem-img.svg" height="30vh" contain></v-img>
          </v-col>
          <v-col cols="6" align-self="center" class="pb-16 px-8">
            <span class="title">
              {{ $t('kAboutPageProblem') }}
            </span>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
    <v-row align="center" justify="center" class="mt-16 pb-16">
      <v-card class="rounded-xl pa-2" color="primary" height="40vh">
        <v-row class="white--text">
          <v-col cols="6" align-self="center" class="pb-16 px-8">
            <span class="title">
              {{ $t('kAboutPageSolution') }}
            </span>
          </v-col>
          <v-col cols="6">
            <v-card-title class="justify-center display-2">{{
              $t('kSolutionTitle')
            }}</v-card-title>
            <v-img src="/about-solution-img.svg" height="30vh" contain></v-img>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
    <v-row align="center" justify="center" class="mt-16 pt-8">
      <h1 style="text-decoration: underline">Organizations</h1>
    </v-row>
    <v-row align="center" justify="center" class="mt-5">
      <v-img src="/2hw-img.png" contain width="30vw" height="30vh"></v-img>
      <v-img src="/adrf-img.png" contain width="30vw" height="30vh"></v-img>
    </v-row>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>