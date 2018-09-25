<template>
  <v-container>
    <v-layout v-if="loading" row wrap class="mt-5">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate :size="70" :width="7" color="primary"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout v-else row wrap>
      <v-flex xs-12>
        <v-card>
          <v-card-title>
            <h3 class="primary--text">{{ meetup.title }}</h3>
            <template v-if="true">
              <v-spacer></v-spacer>
              <edit-meetup-detail-dialog :meetup="meetup" v-if="isCreator" />
            </template>
          </v-card-title>
          <v-img height="400px" :src="meetup.imageUrl" />
          <v-card-text>
            <div class="info--text">{{ meetup.date | date }} - {{ meetup.location }}</div>
            <div>
              <edit-meetup-date-dialog :meetup="meetup" v-if="isCreator"></edit-meetup-date-dialog>
              <edit-meetup-time-dialog :meetup="meetup" v-if="isCreator"></edit-meetup-time-dialog>
            </div>
            <div>{{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <register-dialog v-if="isAuthenticated" :meetup="meetup" />
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    ...mapGetters(['user', 'isAuthenticated', 'loading']),
    meetup() {
      return this.$store.getters.meetup(this.id);
    },
    isCreator() {
      if (!this.isAuthenticated) {
        return false;
      }
      return this.user.id === this.meetup.creatorId;
    }
  }
};
</script>

<style>
</style>
