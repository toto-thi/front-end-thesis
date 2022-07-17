<template>
  <v-container>
    <v-row>
      <v-card
        color="primary"
        class="rounded-xl mb-16 white--text font-weight-bold"
        height="20vh"
        width="100%"
      >
        <v-row justify="center" align="center">
          <v-col cols="6" align-self="center">
            <v-card-title class="justify-center pb-12 text-capitalize">
              <h1>{{ $t('kUsersBtn') }}</h1>
            </v-card-title>
          </v-col>
          <v-col cols="6">
            <v-img src="/user-table-img.svg" contain height="25vh"></v-img>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
    <v-row>
      <v-card class="rounded-xl" width="100%">
        <v-data-table
          :headers="headers"
          :items="users"
          :items-per-page="5"
          item-key="title"
          class="elevation-1"
          v-model="users"
        >
          <template v-slot:top>
            <v-toolbar flat class="rounded-xl">
              <v-toolbar-title class="text-capitalize">{{
                $t('kUsersBtn')
              }}</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:item="{ item }">
            <tr>
              <td class="text-center">
                <v-row align="center" justify="center" class="ma-2">
                  <v-img
                    contain
                    max-height="100px"
                    max-width="50px"
                    :src="item.imgUrl"
                  ></v-img>
                </v-row>
              </td>
              <td class="text-center">{{ item.firstname }}</td>
              <td class="text-center">{{ item.lastname }}</td>
              <td class="text-center">{{ item.email }}</td>
              <td class="text-center">{{ item.role }}</td>
              <td class="text-center">{{ item.gender }}</td>
              <td class="text-center">{{ item.dob }}</td>
              <td class="text-center">
                <v-icon class="mx-2" color="primary" @click="editUser(item)"
                  >mdi-pencil</v-icon
                >
                <v-icon color="#DF0000" @click="deleteUser(item.id)"
                  >mdi-delete</v-icon
                >
              </td>
            </tr>
          </template>
        </v-data-table>
        <v-dialog v-model="editDialog" max-width="500px">
          <v-card color="white">
            <v-card-title>{{$t('kUserDialog')}}</v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" xs="4">
                    <v-text-field
                      outlined
                      :label="$t('kFirstName')"
                      v-model="selected.firstname"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" xs="4">
                    <v-text-field
                      outlined
                      :label="$t('kLastName')"
                      v-model="selected.lastname"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <span>{{$t('kGender')}}</span>
                    <v-radio-group
                      v-model="selected.gender"
                      dense
                      mandatory
                      class="title"
                      row
                    >
                      <v-radio :label="$t('kMale')" value="male"> </v-radio>
                      <v-radio :label="$t('kFemale')" value="female"> </v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      clearable
                      :label="$t('kEmail')"
                      v-model="selected.email"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <span>{{$t('kRole')}}</span>
                    <v-select
                      dense
                      outlined
                      item-text="name"
                      item-value="value"
                      :items="roles"
                      v-model="selected.role"
                      class="text-left"
                    >
                      <template v-slot:selection="{ item }">
                        <span>{{ item.name }}</span>
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" text @click="confirmEdit"
                >{{$t('kUpdateBtn')}}</v-btn
              >
              <v-spacer />
              <v-btn color="error" text @click="editDialog = !editDialog"
                >{{$t('kCancelBtn')}}</v-btn
              >
            </v-card-actions>
            <v-overlay :value="loading">
              <v-progress-circular
                indeterminate
                size="64"
              ></v-progress-circular>
            </v-overlay>
          </v-card>
        </v-dialog>

        <v-dialog v-model="deleteDialog" max-width="500px">
          <v-card color="white">
            <v-card-title
              >Are you sure you want to delete this user?</v-card-title
            >
            <v-card-actions>
              <v-btn color="success" text>Yes, I Confirm</v-btn>
              <v-spacer />
              <v-btn color="error" text @click="deleteDialog = !deleteDialog"
                >Cancel</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['loading']),
  },
  data() {
    return {
      headers: [
        {
          text: 'Picture',
          align: 'center',
          sortable: true,
          value: 'imgUrl',
          width: '1%',
        },
        {
          text: 'First Name',
          align: 'center',
          value: 'firstname',
          width: '1%',
        },
        {
          text: 'Last Name',
          align: 'center',
          value: 'lastname',
          width: '1%',
        },
        {
          text: 'Email',
          align: 'center',
          value: 'email',
          width: '1%',
        },
        {
          text: 'Role',
          align: 'center',
          sortable: false,
          value: 'role',
          width: '1%',
        },
        {
          text: 'Gender',
          align: 'center',
          sortable: false,
          value: 'gender',
          width: '1%',
        },
        {
          text: 'Date of Birth',
          align: 'center',
          sortable: false,
          value: 'dob',
          width: '1%',
        },
        {
          text: 'Action',
          align: 'center',
          sortable: false,
          value: 'action',
          width: '1%',
        },
      ],
      editDialog: false,
      deleteDialog: false,
      roles: [
        {
          name: 'Member',
          value: 'member',
        },
        {
          name: 'Admin',
          value: 'admin',
        },
      ],
      selected: {
        firstname: '',
        lastname: '',
        gender: '',
        email: '',
        role: '',
        dob: '',
      },
      defaultUser: {
        firstname: '',
        lastname: '',
        gender: '',
        email: '',
        role: '',
        dob: '',
      },
    }
  },
  methods: {
    editUser(user) {
      this.editDialog = true
      this.selected = Object.assign({}, user)
    },
    async confirmEdit() {
      const newData = {
        id: this.selected.id,
        detail: {
          firstname: this.selected.firstname,
          lastname: this.selected.lastname,
          gender: this.selected.gender,
          dob: this.selected.dob,
          email: this.selected.email,
          role: this.selected.role,
        },
      }

      try {
        await this.$store.dispatch('updateUser', newData)
        await this.$store.dispatch('getAllUsers')
      } catch (err) {
        console.error(err)
      }

      this.editDialog = false
      this.selected = Object.assign({}, this.defaultUser)
    },
    deleteUser(id) {
      this.deleteDialog = true
    },
    async confirmDelete() {},
  },
}
</script>

<style>
</style>