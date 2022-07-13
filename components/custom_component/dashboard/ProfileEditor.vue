<template>
  <div>
    <v-row align="start" class="mx-5">
      <v-col cols="2">
        <v-img :src="imgUrl" :alt="firstname" contain max-height="30vh"></v-img>
        <!-- upload image -->
        <v-btn
          color="primary"
          block
          left
          class="text-capitalize mt-3"
          :loading="isSlecting"
          @click="SelectFile"
          max-width="50px"
        >
          <v-icon left>mdi-camera</v-icon>
          {{ buttonText }}
        </v-btn>
        <input
          class="d-none"
          ref="uploader"
          type="file"
          accept="image/*"
          @change="onFileChanged"
        />
      </v-col>
      <v-col cols="8">
        <v-row class="mt-5 mx-10">
          <v-text-field
            name="firstname"
            label="First Name"
            outlined
            v-model="firstname"
            id="firstname"
            class="mx-2"
          ></v-text-field>
          <v-text-field
            name="lastname"
            label="Last Name"
            outlined
            v-model="lastname"
            id="lastname"
            class="mx-2"
          ></v-text-field>
        </v-row>
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
              class="mx-12"
              v-model="dateFormatted"
              label="Date of Birth"
              append-icon="mdi-calendar"
              readonly
              outlined
              clearable
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dob"
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

        <span class="mx-12">Gender</span>
        <v-radio-group
          v-model="selectedGender"
          dense
          mandatory
          class="title mx-12"
          row
        >
          <v-radio label="Male" value="male"> </v-radio>
          <v-radio label="Female" value="female"> </v-radio>
        </v-radio-group>
        <v-text-field
          name="email"
          label="Email"
          outlined
          v-model="email"
          :rules="emailRule"
          id="email"
          class="mx-12"
        ></v-text-field>
        <v-text-field
          name="password"
          label="Password"
          outlined
          :type="'password'"
          :rules="passwordRule"
          :append-icon="show ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
          clearable
          v-model="password"
          id="password"
          class="mx-12"
        ></v-text-field>
        <v-text-field
          name="role"
          label="Role"
          outlined
          v-model="role"
          disabled
          id="role"
          class="mx-12"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" class="">
      <v-col cols="3">
        <v-btn
          @click="updateUserData(userProfile.id)"
          color="success"
          class="text-capitalize white--text"
          block
          >Update My Profile</v-btn
        >
      </v-col>
      <v-col cols="3">
        <v-btn
          @click="cancel"
          color="red"
          class="text-capitalize white--text"
          block
          >Cancel</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ShortText from '~/utils/ShortText.vue'

export default {
  props: {
    userProfile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      firstname: '',
      lastname: '',
      dob: '',
      imgUrl: '',
      email: '',
      password: '',
      role: '',
      selectedGender: '',
      menu: false,
      show: false,
      emailRule: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRule: [
        (v) => !!v || 'Password is required',
        (v) =>
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            v
          ) ||
          'Minimum 8 characters, at least one letter, one number and one special character',
      ],
      selectedFile: null,
      isSlecting: false,
      defaultButtonText: 'upload new picture',
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    async updateUserData(id) {
      const newData = {
        id: id,
        detail: {
          firstname: this.firstname,
          lastname: this.lastname,
          gender: this.selectedGender,
          dob: this.dob,
          email: this.email,
          imgUrl: this.imgUrl,
          password: this.password,
        },
      }
      try {
        await this.$store.dispatch('updateProfile', newData)
      } catch (err) {
        console.error(err)
      }
    },
    SelectFile() {
      this.isSlecting = true

      window.addEventListener(
        'focus',
        () => {
          this.isSlecting = false
        },
        { once: true }
      )

      this.$refs.uploader.click()
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0]

      //display in image box
      this.imgUrl = URL.createObjectURL(this.selectedFile)
    },
    cancel() {
      this.selectedGender = this.userProfile.gender
      this.firstname = this.userProfile.firstname
      this.lastname = this.userProfile.lastname
      this.dob = this.userProfile.dob
      this.imgUrl = this.userProfile.imgUrl
      this.email = this.userProfile.email
    },
  },
  mounted() {
    this.selectedGender = this.userProfile.gender
    this.firstname = this.userProfile.firstname
    this.lastname = this.userProfile.lastname
    this.dob = this.userProfile.dob
    this.imgUrl = this.userProfile.imgUrl
    this.email = this.userProfile.email
    this.role = this.userProfile.role
  },
  computed: {
    ...mapGetters(['loading']),
    dateFormatted() {
      return this.formatDate(this.dob)
    },
    buttonText() {
      return this.selectedFile ? this.selectedFile.name : this.defaultButtonText
    },
  },
  components: { ShortText },
}
</script>

<style>
</style>