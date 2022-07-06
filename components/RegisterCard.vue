<template>
  <v-row justify="center" dense height="100vh" class="mb-10">
    <v-col cols="8" xl="8" sm="8" md="8" fill-height class="px-16">
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

      <v-card flat class="px-5">
        <v-card-title class="justify-center font-weight-bold" style="font-size: 3.5rem">
          Register
        </v-card-title>
        <v-card-subtitle class="mt-5 mb-5 text-center font-weight-bold title">
          Welcome to the Charity Community! <br />
          <span
            >Be a part of the initial charity of a secure and transparency
            charity projects.</span
          >
        </v-card-subtitle>

        <v-form class="px-3">
          <!-- First Name -->
          <v-text-field
            name="firstName"
            label="First Name"
            id="firstname"
            required
            outlined
            clearable
            v-model="firstname"
          ></v-text-field>

          <!-- Last Name -->
          <v-text-field
            name="lastName"
            label="Last Name"
            id="lastname"
            required
            outlined
            clearable
            v-model="lastname"
          ></v-text-field>

          <!-- DOB picker -->
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="computedDateFormatted"
                label="Date of Birth"
                hint="MM/DD/YYYY format"
                persistent-hint
                append-icon="mdi-calendar"
                readonly
                outlined
                clearable
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateOfbirth"
              no-title
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1950-01-01"
              @input="menu = !menu"
            ></v-date-picker>
          </v-menu>

          <!-- Select Gender -->
          <span>Gender</span>
          <v-radio-group
            v-model="selectedGender"
            dense
            mandatory
            class="title"
            row
          >
            <v-radio label="Male" value="male"> </v-radio>
            <v-radio label="Female" value="female"> </v-radio>
          </v-radio-group>

          <!-- Email -->
          <v-text-field
            name="Email"
            label="Email"
            id="email"
            required
            outlined
            clearable
            v-model="email"
            :rules="emailRules"
          ></v-text-field>

          <!-- Password -->
          <v-text-field
            name="Password"
            label="Password"
            id="password"
            required
            outlined
            clearable
            v-model="password"
            :append-icon="show ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            :type="show ? 'text' : 'password'"
            :rules="passwordRules"
            @click:append="show = !show"
          ></v-text-field>

          <!-- Confirm Password -->
          <v-text-field
            name="confirmPassword"
            label="Re-enter Password"
            id="confirmpassword"
            required
            outlined
            clearable
            v-model="confirmPassword"
            :append-icon="cfpShow ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            :type="cfpShow ? 'text' : 'password'"
            :rules="confirmPasswordRules"
            @click:append="cfpShow = !cfpShow"
          ></v-text-field>

          <v-card-actions>
            <v-row align="center" justify="center" class="mx-8">
              <v-col cols="12">
                <v-btn
                  @click="createUser"
                  color="primary"
                  large
                  block
                  rounded
                  class="white--text text-capitalize font-weight-bold title"
                  >Register</v-btn
                >
              </v-col>
              <span>Already have an account? &nbsp; </span>
              <nuxt-link to="Login" style="text-decoration: none">
                Login now!</nuxt-link
              >
            </v-row>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
    <v-col cols="4" xl="4" class="hidden-sm-and-down">
      <v-sheet color="primary" height="100vh" rounded="xl"></v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Register',
  data(vm) {
    return {
      checkbox: false,
      activePicker: null,
      menu: false,
      show: false,
      cfpShow: false,
      firstname: '',
      lastname: '',
      dateOfbirth: '',
      dateFormatted: vm.formatDate(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      ),
      selectedGender: '',
      email: '',
      password: '',
      confirmPassword: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) =>
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            v
          ) ||
          'Minimum 8 characters, at least one letter, one number and one special character',
      ],
      confirmPasswordRules: [
        (v) => !!v || 'Please re-enter your password to confirm',
        (v) => v == this.password || 'Password do not match',
      ],
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    },
  },
  methods: {
    saveDob(date) {
      this.$refs.menu.save(date)
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },

    async createUser() {
      const newUser = {
        firstname: this.firstname.trim(),
        lastname: this.lastname.trim(),
        dob: this.dateOfbirth.toString(),
        gender: this.selectedGender.trim(),
        email: this.email.toLowerCase().trim(),
        password: this.password.trim(),
      }

      await this.$store.dispatch('signUp', newUser);
    },
  },
  computed: {
    ...mapGetters(['user']),
    computedDateFormatted() {
      return this.formatDate(this.dateOfbirth)
    },
  },
}
</script>

<style>
</style>