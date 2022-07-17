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
          @change="uploadImg"
        />
      </v-col>
      <v-col cols="8">
        <v-container>
          <v-row class="mt-5 mx-10">
            <v-text-field
              name="firstname"
              :label="$t('kFirstName')"
              outlined
              v-model="firstname"
              id="firstname"
              class="mx-2"
            ></v-text-field>
            <v-text-field
              name="lastname"
              :label="$t('kLastName')"
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
                :label="$t('kDOB')"
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

          <span class="mx-12">{{ $t('kGender') }}</span>
          <v-radio-group
            v-model="selectedGender"
            dense
            mandatory
            class="title mx-12"
            row
          >
            <v-radio :label="$t('kMale')" value="male"> </v-radio>
            <v-radio :label="$t('kFemale')" value="female"> </v-radio>
          </v-radio-group>
          <v-text-field
            name="email"
            :label="$t('kEmail')"
            outlined
            v-model="email"
            :rules="emailRule"
            id="email"
            class="mx-12"
          ></v-text-field>
          <v-text-field
            name="password"
            :label="$t('kPassword')"
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
            :label="$t('kRole')"
            outlined
            v-model="role"
            disabled
            id="role"
            class="mx-12"
          ></v-text-field>
          <v-row align="center" justify="center" class="mx-9">
            <v-col cols="6">
              <v-btn
                @click="updateUserData(userProfile.id)"
                color="success"
                class="text-capitalize white--text"
                block
                :loading="loading"
                >{{ $t('kUpdateBtn') }}</v-btn
              >
            </v-col>
            <v-col cols="6">
              <v-btn
                @click="cancel"
                color="red"
                class="text-capitalize white--text"
                block
                >{{ $t('kCancelBtn') }}</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { UPLOAD_PROFILE_IMG } from '~/graphql/mutations/userMutate'

export default {
  props: {
    userProfile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
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
      this.loading = true

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
      this.loading = false
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

      this.$refs['uploader'].click()
    },
    async uploadImg() {
      let { data } = await this.$apollo.mutate({
        mutation: gql`
          ${UPLOAD_PROFILE_IMG}
        `,
        variables: {
          file: this.$refs['uploader'].files[0],
        },
      })
      this.imgUrl = data.fileUploader
      this.$refs.uploader = null
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
    dateFormatted() {
      return this.formatDate(this.dob)
    },
    buttonText() {
      return this.selectedFile ? this.selectedFile.name : this.defaultButtonText
    },
  },
}
</script>

<style>
</style>