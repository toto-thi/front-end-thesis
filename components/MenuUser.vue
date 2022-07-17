<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          color="primary"
          class="white--text ma-5"
          rounded
          v-bind="attrs"
          v-on="on"
          height="56"
        >
          {{ user.firstname }}
          <v-avatar size="32" class="ma-2">
            <img :src="user.imgUrl" :alt="user.firstname" />
          </v-avatar>
        </v-btn>
      </template>

      <v-list dense>
        <v-list-item router exact to="/dashboard/profile">
          <v-list-item-action>
            <v-icon> mdi-account </v-icon>
          </v-list-item-action>
          <v-list-item-title class="text-capitalize">{{
            $t('kAccount')
          }}</v-list-item-title>
        </v-list-item>
        <v-list-item router exact @click="signOut">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-title class="text-capitalize">{{
            $t('kSingOut')
          }}</v-list-item-title>
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