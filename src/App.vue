<template>
  <v-app>
    <v-navigation-drawer temporary app v-model="sideNav">
      <v-list dense>
        <v-list-tile v-for="(m, i) in menuItems" :key="i" :to="m.link" exact>
          <v-list-tile-action>
            <v-icon>{{ m.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{ m.title }}
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Logout
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app class="primary" dark>
      <v-toolbar-side-icon @click="sideNav = !sideNav" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer;">
          DevMeetup
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn exact :to="m.link" flat v-for="(m, i) in menuItems" :key="i">
          <v-icon left>{{ m.icon }}</v-icon>
          {{ m.title }}
        </v-btn>
        <v-btn flat @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main class="mt-5">
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    menuItems() {
      let data = [
        { icon: 'face', title: 'Sign up', link: '/signup' },
        { icon: 'lock_open', title: 'Sign in', link: '/signin' }
      ];
      if (this.isAuthenticated) {
        data = [
          {
            icon: 'supervisor_account',
            title: 'View Meetups',
            link: '/meetups'
          },
          { icon: 'room', title: 'Organize Meetup', link: '/meetup/new' },
          { icon: 'person', title: 'Profile', link: '/profile' }
        ];
      }
      return data;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'Signin' });
      this.sideNav = false;
    }
  }
};
</script>

<style>
</style>

