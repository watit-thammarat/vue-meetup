<template>
  <v-dialog width="350px" persistent v-model="show">
    <v-btn color="info" slot="activator">{{ buttonTitle }}</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="headline">
              {{ captionTitle }}
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>You can always change your decision later on.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions class="d-flex justify-center">
              <v-btn flat class="error--text" @click="show = false">Cancel</v-btn>
              <v-btn flat class="blue--text darken-1" @click="onSave">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    meetup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: false,
      valid: true,
      loading: false,
      error: null,
      id: this.meetup.id
    };
  },
  computed: {
    ...mapGetters(['user']),
    registered() {
      return this.user.registeredMeetups.findIndex(m => m === this.id) > -1;
    },
    buttonTitle() {
      return this.registered ? 'Unregister' : 'Register';
    },
    captionTitle() {
      return this.registered
        ? 'Unregister from Meetup?'
        : 'Register for Meetup?';
    }
  },
  methods: {
    async onSave() {
      try {
        this.loading = true;
        this.error = null;
        if (this.registered) {
          await this.$store.dispatch('unregisterMeetup', this.id);
        } else {
          await this.$store.dispatch('registerMeetup', this.id);
        }
        this.show = false;
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style>
</style>
