<template>
  <v-card class="rounded-xl" width="100%">
    <v-card-title>All Users</v-card-title>
    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="5"
      item-key="title"
      class="elevation-1"
    >
    </v-data-table>
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
          text: 'First Name',
          align: 'start',
          value: 'firstname',
          width: '1%',
        },
        {
          text: 'Last Name',
          align: 'start',
          value: 'lastname',
          width: '1%',
        },
        {
          text: 'Email',
          align: 'start',
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
          text: 'Picture',
          align: 'center',
          sortable: true,
          value: 'imgUrl',
          width: '1%',
        },
      ],
    }
  },
}
</script>

<style>
</style>