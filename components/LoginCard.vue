<template>
  <div>
    <div>
      <v-row align="center" justify="center" dense class="mt-16">
        <v-col cols="8" xl="8" sm="8" md="8" class="px-16">
          <v-card
            color="white"
            class="px-16 mx-16 rounded-xl"
            style="padding: 112px"
          >
            <v-card-title
              class="justify-center font-weight-bold"
              style="font-size: 3.5rem"
            >
              {{ $t('kLogin') }}
            </v-card-title>
            <v-card-subtitle
              class="mt-5 mb-5 text-center font-weight-bold title"
            >
              <p>{{ $t('kLoginTitle') }}</p>
              <p>{{ $t('kLoginSubTitle') }}</p>
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
                  <v-btn plain class="text-capitalize font-weight-medium">
                    <p>{{ $t('kForgotPassword') }}</p>
                  </v-btn>
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
                      class="text-capitalize font-weight-bold title"
                      >{{ $t('kLogin') }}</v-btn
                    >
                  </v-col>
                  <span>{{ $t('kNoAcc') }} &nbsp; </span>
                  <nuxt-link to="Register" style="text-decoration: none">
                    {{ $t('kRegisterNow') }}
                  </nuxt-link>
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

      this.$nuxt.$loading.start()

      const resp = await this.$store.dispatch('loginUser', this.credentials)

      const wallet = this.user.walletID
      if (!!wallet) {
        this.$store.state.walletAddress = wallet
        this.$store.state.connectionStatus = true
      }

      if (!!resp) {
        if (this.user.role === 'admin') {
          this.$router.push('/dashboard/main')
        } else if (this.user.role === 'member') {
          this.$router.push('/dashboard/profile')
        } else {
          this.$router.push('/login')
        }
      }
      setTimeout(() => this.$nuxt.$loading.finish(), 5000)
    },
  },
}
</script>

<style scoped>
.select {
  width: 0px;
}
</style>