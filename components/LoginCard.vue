<template>
  <div>
    <div>
      <v-row justify="center" dense height="100vh">
        <v-col cols="10" xl="10" sm="8" md="8" class="px-16">
          <v-app-bar flat elevate-on-scroll class="white">
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
          </v-app-bar>

          <v-card flat class="px-16 mx-16" style="padding: 112px">
            <v-card-title
              class="justify-center font-weight-bold"
              style="font-size: 3.5rem"
            >
              {{ $t('kLogin') }}
            </v-card-title>
            <v-card-subtitle
              class="mt-5 mb-5 text-center font-weight-bold title"
            >
              {{ $t('kLoginTitle') }} <br />
              <span>{{ $t('kLoginSubTitle') }}</span>
            </v-card-subtitle>

            <v-form class="px-3">
              <v-text-field
                name="Email"
                :label="$t('kEmail')"
                id="email"
                required
                outlined
                clearable
                v-model="credentials.email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                name="Password"
                :label="$t('kPassword')"
                id="password"
                required
                outlined
                clearable
                v-model="credentials.password"
                :append-icon="show ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                :type="show ? 'text' : 'password'"
                :rules="passwordRules"
                @click:append="show = !show"
              ></v-text-field>

              <v-row justify="space-between" align="start">
                <v-col cols="6" align-self="start">
                  <v-checkbox
                    :label="$t('kRememberMeBox')"
                    v-model="checkbox"
                  ></v-checkbox>
                </v-col>
                <v-col cols="6" align-self="center" align="end">
                  <v-btn plain class="text-capitalize font-weight-medium"
                    ><span>{{ $t('kForgotPassword') }}</span></v-btn
                  >
                </v-col>
              </v-row>
              <v-card-actions>
                <v-row align="center" justify="center" class="mx-8">
                  <v-col cols="12">
                    <v-btn
                      @click="signIn"
                      color="primary"
                      large
                      block
                      rounded
                      class="white--text text-capitalize font-weight-bold title"
                      >{{ $t('kLogin') }}</v-btn
                    >
                  </v-col>
                  <span>{{ $t('kNoAcc') }} &nbsp; </span>
                  <nuxt-link to="Register" style="text-decoration: none">
                    {{ $t('kRegisterNow') }}</nuxt-link
                  >
                </v-row>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      show: false,
      checkbox: false,
      lang: ['English', 'ລາວ'],
      errorMsg: '',
      credentials: {
        email: '',
        password: '',
      },
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [(v) => !!v || 'Please enter your password'],
    }
  },
  computed: {
    ...mapGetters(['loading', 'user']),
  },
  methods: {
    async signIn() {
      await this.$store.dispatch('loginUser', this.credentials)

      const wallet = this.user.walletID
      if (!!wallet) {
        this.$store.state.walletAddress = wallet
        this.$store.state.connectionStatus = true
      }

      if (this.user.role === 'admin') {
        this.$router.push('/dashboard/main')
      } else if (this.user.role === 'member') {
        this.$router.push('/dashboard/profile')
      } else {
        this.$router.push('/login')
      }
    },
  },
}
</script>

<style scoped>
.select {
  width: 0px;
}
</style>