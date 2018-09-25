<template>
  <v-dialog width="350px" persistent v-model="show">
    <v-btn fab color="accent" slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-form ref="form" lazy-validation v-model="valid">
                <v-text-field v-model="payload.title" :rules="rules.title" label="Title" required></v-text-field>
              </v-form>
              <v-textarea v-model="payload.description" :rules="rules.description" name="description" label="Description" required></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat class="blue--text darken-1" @click="show = false">Close</v-btn>
              <v-btn flat class="blue--text darken-1" @click="onSave">Save</v-btn>
            </v-card-actions>
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
      valid: true,
      loading: false,
      error: null,
      payload: {
        id: this.meetup.id,
        title: this.meetup.title,
        description: this.meetup.description
      },
      rules: {
        title: [title => !!title || 'Title is required'],
        description: [desc => !!desc || 'Description is required']
      }
    };
  },
  methods: {
    async onSave() {
      if (!this.$refs.form.validate()) {
        return;
      }
      try {
        this.loading = true;
        this.error = null;
        await this.$store.dispatch('updateMeetup', this.payload);
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
