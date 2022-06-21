<template>
  <v-row align="center" justify="center" dense height="100vh" v-if="!loading">
    <v-col cols="8" xl="8" sm="12" md="12" fill-height class="px-16">
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

        <!-- <v-spacer />
        <v-select :items="lang" dense flat class="select">
        </v-select> -->
      </v-app-bar>

      <v-card flat class="px-16 mx-16">
        <v-card-title class="justify-center font-weight-bold display-4">
          Login
        </v-card-title>
        <v-card-subtitle class="mt-5 mb-5 text-center font-weight-bold title">
          Welcome Back! <br />
          <span>Join the Donor's Community</span>
        </v-card-subtitle>
        
          <v-form class="px-3">
            <v-text-field
              name="Email"
              label="Email"
              id="email"
              required
              outlined
              clearable
              v-model="credentials.email"
              :rules="emailRules"
            ></v-text-field>
            <v-text-field
              name="Password"
              label="Password"
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
                <v-checkbox label="Remember me" v-model="checkbox"></v-checkbox>
              </v-col>
              <v-col cols="6" align-self="center" align="end">
                <v-btn plain class="text-capitalize font-weight-medium"
                  ><span>Forgot password?</span></v-btn
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
                    >Login</v-btn
                  >
                </v-col>
                <span>Don't have an account yet? &nbsp; </span>
                <nuxt-link to="Register" style="text-decoration: none">
                  Register now!</nuxt-link
                >
              </v-row>
            </v-card-actions>
          </v-form>
        
      </v-card>
    </v-col>
    <v-col cols="4" xl="4" sm="0" md="0" app>
      <v-sheet color="#44496c" height="100vh" rounded="xl">
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Login',
  middleware: 'isAuth',
  data() {
    return {
      show: false,
      checkbox: false,
      lang: ['English', 'ລາວ'],
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
    ...mapGetters(['user', 'loading'])
  },
  methods: {
    async signIn() {
      await this.$store.dispatch('loginUser', this.credentials);
    },
  },
}
</script>

<style scoped>
.select {
  width: 0px;
}
</style>