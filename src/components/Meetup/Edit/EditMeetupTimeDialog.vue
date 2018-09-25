<template>
  <v-dialog width="350px" persistent v-model="show">
    <v-btn color="accent" slot="activator">edit time</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Time</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap text-xs-center class="mt-3">
          <v-flex xs12>
            <v-time-picker format="24hr" v-model="time" style="width=100%;" actions>
              <template :scope="{save, cancel}">
                <v-btn flat class="blue--text darken-1" @click.native="show = false">Close</v-btn>
                <v-btn flat class="blue--text darken-1" @click.native="onSave">Save</v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
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
      loading: false,
      error: null,
      date: new Date(this.meetup.date).toISOString().substr(0, 10),
      time: new Date(this.meetup.date).toISOString().substr(11, 5),
      id: this.meetup.id
    };
  },
  computed: {
    datetime() {
      return new Date(`${this.date}T${this.time}:00Z`).toISOString();
    }
  },
  methods: {
    async onSave() {
      try {
        this.loading = true;
        this.error = null;
        const payload = {
          id: this.id,
          date: this.datetime
        };
        await this.$store.dispatch('updateMeetup', payload);
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
