<template>
  <v-row align="center" justify="center" dense style="height: 100vh">
    <v-col cols="4" xl="4" sm="6" md="6" fill-height>
      <v-card flat>
        <v-card-title class="justify-center font-weight-bold display-4">
          Login
        </v-card-title>
        <v-card-subtitle class=" mt-5 mb-5 text-center font-weight-bold title" >
            Welcome Back! <br>
            <span>Join the Donor's Community</span>
        </v-card-subtitle>
        <v-text>
          <v-form class="px-3">
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
                    color="primary"
                    large
                    block
                    rounded
                    class="white--text text-capitalize font-weight-bold title"
                    >Login</v-btn
                  >
                </v-col>
                <span>Don't have an account yet? &nbsp; </span>
                <a> Register now!</a>
              </v-row>
            </v-card-actions>
          </v-form>
        </v-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      show: false,
      checkbox: false,
      email: '',
      password: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [(v) => !!v || 'Please enter your password'],
    }
  },
}
</script>

<style>
</style>