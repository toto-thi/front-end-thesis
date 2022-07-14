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
        <v-col cols="1" class="mt-1">
          <!-- will come back later -->
          <v-btn
            @click="connectWallet"
            color="primary"
            rounded
            large
            class="text-capitalize"
            >connect wallet</v-btn
          >
        </v-col>
      </v-row>
    </v-app-bar>

    <!-- CRUD Control -->
    <v-navigation-drawer app fixed absolute permanent v-model="drawer">
      <!-- Menu -->
      <v-list nav dense rounded class="mt-16 pt-16">
        <div v-for="(item, i) in items" :key="i">
          <v-list-item
            v-if="!item.items"
            :key="i"
            :to="item.to"
            class="v-list-item"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content v-text="item.title" />
          </v-list-item>

          <v-list-group v-else :key="item.title" no-action>
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  {{ item.title }}
                </v-list-item-content>
              </v-list-item>
            </template>

            <v-list-item
              v-for="sub in item.items"
              :key="sub.title"
              :to="sub.to"
            >
              <v-list-item-action>
                <v-icon>{{ sub.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-title v-text="sub.title" />
            </v-list-item>
          </v-list-group>
        </div>
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
                <v-list-item-title>
                  {{ user.firstname }} &nbsp; {{ user.lastname }} <br />
                  {{ user.email }}
                </v-list-item-title>
              </v-list-item>
            </v-col>
            <v-col cols="12">
              <v-row class="mx-5">
                <v-col cols="6">
                  <v-menu :rounded="rounded" offset-y>
                    <template v-slot:activator="{ attrs, on }">
                      <v-btn color="white" v-bind="attrs" v-on="on">
                        <v-icon>mdi-cog-outline</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item router exact to="/dashboard/profile">
                        <v-list-item-action>
                          <v-icon>mdi-account-cog-outline</v-icon>
                        </v-list-item-action>
                        <v-list-item-title>Profile</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
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
          to: '/dashboard/main',
        },
        {
          icon: 'mdi-chart-box-outline',
          title: 'Charity',
          to: '/dashboard/charity/approved',
          items: [
            {
              icon: 'mdi-archive-check-outline',
              title: 'Approved',
              to: '/dashboard/charity/approved',
            },
            {
              icon: 'mdi-archive-clock-outline',
              title: 'All Request',
              to: '/dashboard/charity/requested',
            },
            {
              icon: 'mdi-close-box-multiple-outline',
              title: 'Rejected',
              to: '/dashboard/charity/rejected',
            },
            {
              icon: 'mdi-check-all',
              title: 'Finished Project',
              to: '/dashboard/charity/completed',
            },
          ],
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Users',
          to: '/dashboard/users',
        },
        {
          icon: 'mdi-history',
          title: 'All Transactions',
          to: '/dashboard/history',
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
    connectWallet() {
      alert('connecting...')
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