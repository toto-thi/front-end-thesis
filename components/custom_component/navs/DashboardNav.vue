<template>
  <nav>
    <v-app-bar flat app dense class="white" prominent :clipped-left="true">
      <v-row class="mt-2 text-center">
        <v-col cols="2" class="pl-16">
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
        <v-col cols="2" class="">
          <span class="headline font-weight-black">Admin Dashboard</span> <br />
          <span class="caption">Welcome, {{ user.firstname }}</span>
        </v-col>
        <v-col cols="5" class="text-center" align-self="end">
          <v-text-field
            dense
            outlined
            clearable
            placeholder="Search Here..."
            prepend-inner-icon="mdi-magnify"
            v-model="search"
          ></v-text-field>
        </v-col>
        <v-col cols="2" class="text-start" align-self="end">
          <v-select
            dense
            outlined
            item-text="name"
            item-value="value"
            :items="langs"
            v-model="defaultLang"
            class="text-left"
          >
            <template v-slot:selection="{ item }">
              <v-img
                :src="item.langImg"
                contain
                height="24px"
                width="24px"
              ></v-img>
              <span>{{ item.value }}</span>
            </template>
          </v-select>
        </v-col>
        <v-col cols="1" class="mt-2">
          <!-- will come back later -->
          <v-badge overlap>
            <v-icon large>mdi-bell-outline</v-icon>
          </v-badge>
        </v-col>
      </v-row>
    </v-app-bar>

    <!-- CRUD Control -->
    <v-navigation-drawer app fixed absolute permanent v-model="drawer" height="100%">
      <!-- Menu -->
      <v-list nav rounded class="mt-16 pt-16">
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

      <!-- User Display -->
      <template v-slot:append>
        <div class="pa-2">
          <v-row justify="center" class="px-2">
            <v-col cols="12">
              <v-list-item class="mt-5 mx-5 justify-center" fill-height>
                <v-list-item-avatar size="64">
                  <v-img :src="user.imgUrl" />
                </v-list-item-avatar>
              </v-list-item>
              <v-list-item class="text-center">
                <v-list-item-title class="text-capitalize">
                  {{ user.firstname }} &nbsp;
                  {{ user.lastname }}</v-list-item-title
                >
              </v-list-item>
            </v-col>
            <v-col cols="12">
              <v-row class="mx-5">
                <v-col cols="6">
                  <v-btn color="white">
                    <v-icon>mdi-cog-outline</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn @click="signOut" color="white">
                    <v-icon> mdi-logout </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
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
      items: [
        {
          icon: 'mdi-home-variant-outline',
          title: 'Dashboard',
          to: '/dashboard/adminPage',
        },
        {
          icon: 'mdi-chart-box-outline',
          title: 'Charity Project',
          to: '/dashboard/',
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Users',
          to: '/dashboard/',
        },
        {
          icon: 'mdi-history',
          title: 'All Transactions',
          to: '/dashboard/',
        },
      ],
      langs: [
        {
          name: 'English',
          value: 'English',
          langImg: 'https://cdn-icons-png.flaticon.com/512/555/555417.png',
        },
        {
          name: 'Laos',
          value: 'ລາວ',
          langImg: 'https://cdn-icons-png.flaticon.com/512/330/330573.png',
        },
      ],
      defaultLang: {
        name: 'English',
        value: 'English',
        langImg: 'https://cdn-icons-png.flaticon.com/512/555/555417.png',
      },
      noticeMsg: [],
    }
  },
  methods: {
    async signOut() {
      await this.$store.dispatch('singOut')
    },
  },
}
</script>

<style scoped>
.v-navigation-drawer__border {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 1px;
}
</style>