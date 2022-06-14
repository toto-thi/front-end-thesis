<template>
  <div>
    <v-row justify="center" align="center" class="mt-10">
      <v-col cols="4" xl="4" sm="12" md="4">
        <h1>Make</h1>
        <h1>Donation</h1>
        <br />
        <h2 class="font-weight-medium">Help people who has problem.</h2>
        <br />
        <br />
        <v-btn
          large
          rounded
          color="primary"
          class="white--text"
          nuxt
          to="/CharityPage"
          >Donate Now
          <v-icon right>mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="8" xl="8" sm="12" md="4">
        <!-- <v-card shaped outlined elevation="5" color="primary">
          <v-img src="/home-pic-1.png" :aspect-ratio="16 / 9"></v-img>
        </v-card> -->
        <v-sheet color="primary" rounded="xl">
          <v-img src="/home-pic-1.png" :aspect-ratio="16 / 9"></v-img>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row
      justify="center"
      align="center"
      class="mt-10 fill-height"
      style="height: 100vh"
    >
      <v-col md="3" sm="6" xs="12" offset="1" align-self="start">
        <v-sheet rounded="xl" color="primary" height="45vh">
          <v-img src="/home-pic-2.png"></v-img>
          <span class="mx-10 headline white--text font-weight-bold">
            Browse <br />
          </span>
          <span class="mx-10 pb-5 headline white--text font-weight-bold">
            Charity Projects
          </span>
        </v-sheet>
      </v-col>
      <v-col md="3" sm="6" xs="12" offset="1" align-self="center">
        <v-sheet rounded="xl" color="primary" height="45vh">
          <v-img src="/home-pic-3.png"></v-img>
          <span class="mx-10 headline white--text font-weight-bold">
            Let's Donate <br />
          </span>
          <span class="mx-10 pb-5 headline white--text font-weight-bold">
            and help people
          </span>
        </v-sheet>
      </v-col>
      <v-col md="3" sm="12" xs="12" offset="1" align-self="center">
        <h1>More Flexible, Fast</h1>
        <h1>And Reliable</h1>
        <br />
        <h2 class="font-weight-medium">
          Users can choose charity projects everywhere and donate to them via
          cryptocurrency.
        </h2>
        <br />
        <br />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>