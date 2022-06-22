<template>
  <nav>
    <v-app-bar flat app class="white" height="125px">
      <v-row align="start">
        <v-col cols="4">
          <nuxt-link to="/">
            <v-img
              to="/"
              src="/Logo.png"
              contain
              max-height="150"
              max-width="150"
            ></v-img>
          </nuxt-link>
        </v-col>
        <v-col cols="6">
          <v-text-field
            dense
            outlined
            placeholder="Search Here..."
            prepend-inner-icon="mdi-magnify"
            v-model="search"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <div>dix later</div>
        </v-col>
      </v-row>
    </v-app-bar>

    <!-- CRUD Control -->
    <v-navigation-drawer app absolute permanent v-model="drawer">
      <v-list-item class="mt-5 mx-5 justify-center" fill-height>
        <v-list-item-avatar size="64">
          <v-img :src="user.imgUrl" />
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item class="mb-2 text-center">
        <v-list-item-title class="text-capitalize">
          {{ user.firstname }} &nbsp; {{ user.lastname }}</v-list-item-title
        >
      </v-list-item>
      <v-divider />

      <!-- Logout menu -->
      <template v-slot:append>
        <div class="pa-2">
          <v-row justify="center" class="px-2">
            <v-col cols="12">
              <v-btn
                block
                outlined
                plain
                rounded
                color="white--text primary"
                class="mb-2"
                @click="signOut"
              >
                <span class="text-capitalize">Sign Out</span>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      drawer: true,
      search: '',
    }
  },
  methods: {
    async signOut() {
        await this.$store.dispatch('singOut');
    }
  }
}
</script>

<style>
</style>