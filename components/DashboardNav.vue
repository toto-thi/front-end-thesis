<template>
  <nav>
    <v-app-bar
      flat
      app
      dense
      class="white"
      prominent
      :clipped-left="true"
      max-height="100px"
    >
      <v-row class="mt-2 text-center">
        <v-col cols="2">
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
        <v-col cols="2" align-self="center">
          <span class="headline font-weight-black">{{
            dashboardTitle(user.role)
          }}</span>
          <br />
          <span class="caption"
            >{{ $t('kWelcome') }}, {{ user.firstname }}</span
          >
        </v-col>
        <v-spacer />
        <v-col cols="1" class="text-start" align-self="center">
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
            <v-list>
              <v-list-item @click="onChange('en')">
                <v-list-item-title>English</v-list-item-title>
              </v-list-item>
              <v-list-item @click="onChange('la')">
                <v-list-item-title>ລາວ</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col cols="1" class="mr-16" align-self="center">
          <div v-if="user.walletID === null || user.walletID === ''">
            <v-btn
              @click="connectWallet(user.walletID)"
              color="primary"
              rounded
              large
              class="text-capitalize"
            >
              {{ $t('kConnectWallet') }}
            </v-btn>
          </div>
          <div v-else-if="user.walletID">
            <v-btn large color="primary" rounded>
              {{ shortAddress(user.walletID) }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-app-bar>

    <!-- CRUD Control -->
    <v-navigation-drawer
      app
      fixed
      absolute
      permanent
      v-model="drawer"
      height="100%"
    >
      <div v-if="user.role == 'admin'">
        <!-- Admin Menu -->
        <v-list nav dense rounded class="mt-16 pt-16">
          <div v-for="(item, i) in adminItems" :key="i">
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
      </div>
      <div v-else>
        <!-- Member Menu -->
        <v-list nav dense rounded class="mt-16 pt-16">
          <v-list-item
            v-for="(item, i) in memberItems"
            :key="i"
            :to="item.to"
            class="v-list-item"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content v-text="item.title" />
          </v-list-item>
        </v-list>
      </div>

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
                  <v-menu offset-y>
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
                        <v-list-item-title>{{
                          $t('kProfile')
                        }}</v-list-item-title>
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
import { mapGetters } from 'vuex'
import { shortenAddress } from '~/helpers/shortenAddress'

export default {
  data() {
    return {
      drawer: true,
      search: '',
      adminItems: [
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
      memberItems: [
        {
          icon: 'mdi-face-man-profile',
          title: 'Profile',
          to: '/dashboard/profile',
        },
        {
          icon: 'mdi-chart-box-outline',
          title: 'Your Project',
          to: '/dashboard/member/projects',
        },
        {
          icon: 'mdi-history',
          title: 'History',
          to: '/dashboard/member/history',
        },
      ],
      langs: [
        {
          name: 'English',
          value: 'English',
          langImg: 'https://cdn-icons-png.flaticon.com/512/555/555417.png',
          code: 'en',
        },
        {
          name: 'ລາວ',
          value: 'ລາວ',
          langImg: 'https://cdn-icons-png.flaticon.com/512/330/330573.png',
        },
      ],
      defaultLang: {
        name: 'English',
        value: 'English',
        langImg: 'https://cdn-icons-png.flaticon.com/512/555/555417.png',
        code: 'en',
      },
      noticeMsg: [],
    }
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    async signOut() {
      await this.$store.dispatch('singOut')
      this.$router.push('/login')
    },
    async connectWallet(address) {
      const resp = await this.$store.dispatch('connectWallet', address)

      const walletDetail = {
        id: this.user.id,
        detail: {
          walletID: resp,
        },
      }

      if (!!resp) {
        await this.$store.dispatch('updateUser', walletDetail)
        await this.$store.dispatch('getCurrentUser', this.user.id)
      }
    },
    shortAddress(address) {
      return shortenAddress(address)
    },
    dashboardTitle(role) {
      if (role === 'admin') return 'Admin Dashboard'
      else return 'Dashboard'
    },
    onChange(code) {
      return this.$i18n.setLocale(code)
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