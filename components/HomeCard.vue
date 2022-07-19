<template>
  <div>
    <v-row justify="center" align="center" class="mt-10">
      <v-col cols="4" xl="4" sm="12" md="4">
        <h1 class="text-capitalize">{{ $t('kQuoteTitle1') }}</h1>
        <br />
        <h2 class="font-weight-medium">{{ $t('kQuoteSubTitle1') }}.</h2>
        <br />
        <br />
        <v-btn
          large
          rounded
          color="primary"
          class="white--text text-capitalize"
          nuxt
          to="/charityPage"
        >
          {{ $t('kDonate') }}
          <v-icon right>mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="8" xl="8" sm="8" md="8">
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
          <span
            class="mx-10 headline white--text font-weight-bold text-capitalize"
          >
            {{ $t('kIndexCardTitle1') }} <br />
          </span>
          <span
            class="
              mx-10
              pb-5
              headline
              white--text
              font-weight-bold
              text-capitalize
            "
          >
            {{ $t('kCharityProject') }}
          </span>
        </v-sheet>
      </v-col>
      <v-col md="3" sm="6" xs="12" offset="1" align-self="center">
        <v-sheet rounded="xl" color="primary" height="45vh">
          <v-img src="/home-pic-3.png"></v-img>
          <span
            class="mx-10 headline white--text font-weight-bold text-capitalize"
          >
            {{ $t('kIndexCardTitle2') }} <br />
          </span>
          <span
            class="
              mx-10
              pb-5
              headline
              white--text
              font-weight-bold
              text-capitalize
            "
          >
            {{ $t('kIndexCardSubTitle2') }}
          </span>
        </v-sheet>
      </v-col>
      <v-col md="3" sm="12" xs="12" offset="1" align-self="center">
        <h1 class="text-capitalize">
          {{ $t('kQuoteTitle2') }}
        </h1>

        <br />
        <h2 class="font-weight-medium">{{ $t('kQuoteSubTitle2') }}.</h2>
        <br />
        <br />
      </v-col>
    </v-row>
  </div>
</template>

<script>
</script>

<style>
</style>