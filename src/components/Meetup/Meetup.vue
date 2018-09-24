<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs-12>
        <v-card>
          <v-card-title>
            <h3 class="primary--text">{{ meetup.title }}</h3>
          </v-card-title>
          <v-img height="400px" :src="meetup.imageUrl" />
          <v-card-text>
            <div class="info--text">{{ meetup.date | date }} - {{ meetup.location }}</div>
            <div>{{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
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
    meetup() {
      return this.$store.getters.meetup(this.id);
    }
  }
};
</script>

<style>
</style>
