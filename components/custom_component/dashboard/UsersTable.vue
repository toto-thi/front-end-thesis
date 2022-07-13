<template>
  <v-card class="rounded-xl" width="100%">
    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="5"
      item-key="title"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat class="rounded-xl">
          <v-toolbar-title>All Users</v-toolbar-title>
          <!-- <v-spacer></v-spacer>
          <v-dialog v-model="editDialog" max-width="500px">
            <template v-slot:activator="{ attrs, on }">
              <v-btn color="primary">text</v-btn>
            </template>
          </v-dialog> -->
        </v-toolbar>
      </template>
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-center">
            <v-img
              contain
              max-height="100px"
              max-width="50px"
              :src="item.imgUrl"
            ></v-img>
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
        <v-card-title>Edit User Details</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" xs="4">
                <v-text-field
                  outlined
                  label="First Name"
                  v-model="selected.firstname"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" xs="4">
                <v-text-field
                  outlined
                  label="Last Name"
                  v-model="selected.lastname"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <span>Gender</span>
                <v-radio-group
                  v-model="selected.gender"
                  dense
                  mandatory
                  class="title"
                  row
                >
                  <v-radio label="Male" value="male"> </v-radio>
                  <v-radio label="Female" value="female"> </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  outlined
                  clearable
                  label="Email"
                  v-model="selected.email"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <span>Role</span>
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
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card color="white">
        <v-card-title>Are you sure you want to delete this user?</v-card-title>
        <v-card-actions>
          <v-btn color="success" text>Yes, I Confirm</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="deleteDialog = !deleteDialog"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
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
    async confirmEdit() {},
    deleteUser(id) {
      this.deleteDialog = true
    },
    async confirmDelete() {},
  },
}
</script>

<style>
</style>