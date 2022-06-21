<template>
  <div>
    <v-menu :key="text" :rounded="rounded" offset-y>
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          color="primary"
          class="white--text ma-5"
          v-bind="attrs"
          v-on="on"
          height="56"
        >
          {{ user.firstname }}
          <v-avatar size="48" class="ma-2">
            <img :src="user.imgUrl" :alt="user.firstname" />
          </v-avatar>
        </v-btn>
      </template>

      <v-list>
        <v-list-item router exact to="/random">
          <v-list-item-action>
            <v-icon> mdi-account </v-icon>
          </v-list-item-action>
          <v-list-item-title>Account</v-list-item-title>
        </v-list-item>
        <v-list-item router exact to="/ooo">
          <v-list-item-action>
            <v-icon> mdi-cog </v-icon>
          </v-list-item-action>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
        <v-list-item router exact @click="signOut">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-title>Sing Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'MenuUser',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async signOut() {
      await this.$store.dispatch('singOut')
    },
  },
}
</script>

<style>
</style>