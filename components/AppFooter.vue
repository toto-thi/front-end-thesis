<template>
  <v-footer class="mt-16 white" absolute app>
    <v-row align="start" justify="space-between" class="ml-16" style="height:25vh">
      <v-col cols="4" sm="4" xl="4" class="text-center">
        <h1>About</h1>
        <br>
        <h4>This project is for Thesis purpose only.</h4>
        <h4>National university of Laos</h4>
        <h4>Faculty of Natural Sciences</h4>
        <h4>Computer Science 2021-2022</h4>
      </v-col>
      <v-col cols="4" xl="4" sm="4" class="text-center">
        <h1>Developers</h1>
        <br>
        <h4>Thinakone Louangdy</h4>
        <h4>Souphaxay Phounsavart</h4>
      </v-col>
      <v-col cols="4" xl="4" sm="4">
        <v-row class="mt-10" align="center" justify="center">
          <v-btn
            plain
            v-for="(social, s) in socials"
            :key="s"
            :href="social.to"
          >
            <v-icon large>mdi-{{ social.icon }}</v-icon></v-btn
          >
        </v-row>
      </v-col>
    </v-row>
    <!-- <v-divider />
    <v-row justify="center">
        <v-col cols="12"> </v-col>
    </v-row> -->
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      socials: [
        {
          icon: 'facebook',
          to: 'https://www.facebook.com/TotoThii',
          altName: 'TotoThii',
        },
        {
          icon: 'discord',
          to: 'https://discord.gg/U2JHus3nau',
          altName: 'Thesis Crisis',
        },
        {
          icon: 'github',
          to: 'https://github.com/toto-thi',
          altName: 'TotoThii',
        },
        {
          icon: 'youtube',
          to: 'https://www.youtube.com/channel/UCHXdbCkHemrdZ1HvM9nT-yA',
          altName: 'TotoThii',
        },
      ],
    }
  },
}
</script>

<style>
</style>