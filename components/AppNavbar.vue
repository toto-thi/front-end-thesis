<template>
  <nav>
    <v-app-bar flat app elevate-on-scroll v class="white">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      />
      <nuxt-link to="/">
        <v-img
          to="/"
          src="/Logo.png"
          contain
          max-height="150"
          max-width="150"
        ></v-img>
      </nuxt-link>

      <v-spacer />
      <v-btn plain rounded color="white--text" class="mx-2 hidden-md-and-down" nuxt to="/CharityPage">
        <span class="text-capitalize">Charity Project</span>
      </v-btn>
      <v-btn plain rounded color="white--text" class="mx-2 hidden-md-and-down" nuxt to="/About">
        <span class="text-capitalize">About Us</span>
      </v-btn>

      <v-menu open-on-hover offset-y close-on-content-click>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mx-2 hidden-md-and-down"
            plain
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-web</v-icon>
          </v-btn>
        </template>
        <v-list shaped>
          <v-list-item>
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>ລາວ</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn
        plain
        rounded
        outlined
        color="white--text #44496c"
        class="mx-2 hidden-md-and-down"
        nuxt
        to="/Login"
      >
        <span class="text-capitalize">Login</span>
      </v-btn>
      <v-btn
        rounded
        color="#44496c"
        class="white--text hidden-md-and-down"
        nuxt
        to="/Register"
      >
        <span class="text-capitalize">Register</span>
      </v-btn>
    </v-app-bar>

    <!-- for mobile only -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      :mini-variant="miniVariant"
      app
      fixed
    >
      <v-list nav rounded>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-spacer />
      <v-row justify="center" class="px-2">
        <v-col cols="12">
          <v-btn
            block
            outlined
            plain
            rounded
            color="white--text"
            class="hidden-md-and-up mb-2"
          >
            <span class="text-capitalize">Login</span>
          </v-btn>
          <v-btn
            outlined
            block
            plain
            rounded
            color="white--text"
            class="hidden-md-and-up"
          >
            <span class="text-capitalize">Register</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-navigation-drawer>

    <!-- For dashboard/setting page -->
    <!-- will implement later -->
  </nav>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-application',
          title: 'Charity Projects',
          to: '/CharityPage',
        },
        {
          icon: 'mdi-information',
          title: 'About Us',
          to: '/About',
        },
      ],
      miniVariant: false,
      rightDrawer: false,
      title: 'TJ Charity',
    }
  },
}
</script>

<style>
</style>


      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->