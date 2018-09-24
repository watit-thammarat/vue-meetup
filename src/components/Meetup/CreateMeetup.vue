<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 sm6>
        <h1 class="secondary--text">Create a new Meetup</h1>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 sm6>
        <v-form ref="form" lazy-validation v-model="valid">
          <v-text-field v-model="title" :rules="titleRules" label="Title" required></v-text-field>
          <v-text-field v-model="location" :rules="locationRules" label="Location" required></v-text-field>
          <v-text-field v-model="imageUrl" :rules="imageUrlRules" label="Image URL" required></v-text-field>
          <v-img @error="onImageError" v-if="imageUrl" :src="imageUrl" />
          <v-textarea v-model="description" :rules="descriptionRules" name="description" label="Description" required></v-textarea>
          <div class="my-2">
            <v-layout class="mb-2">
              <v-flex>
                <h2 class="secondary--text">Choose a Date & Time</h2>
              </v-flex>
            </v-layout>
            <v-layout row class="mb-3">
              <v-flex xs12>
                <v-date-picker v-model="date"></v-date-picker>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-time-picker v-model="time"></v-time-picker>
              </v-flex>
            </v-layout>
          </div>
          <v-btn :disabled="!valid" class="primary" @click="onSubmit">Create Meetup</v-btn>
          <v-btn class="warning" @click="onCancel">Cancel</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    title: '',
    location: '',
    imageUrl: '',
    description: '',
    date: new Date().toISOString().substr(0, 10),
    time: new Date().toISOString().substr(11, 5),
    titleRules: [title => !!title || 'Title is required'],
    locationRules: [location => !!location || 'Location is required'],
    imageUrlRules: [imageUrl => !!imageUrl || 'image URL is required'],
    descriptionRules: [
      description => !!description || 'Description is required'
    ]
  }),
  computed: {
    datetime() {
      return new Date(`${this.date}T${this.time}:00Z`);
    }
  },
  methods: {
    onSubmit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      const payload = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: this.datetime
      };
      this.$store.dispatch('createMeetup', payload);
      this.$router.push({ name: 'Meetups' });
    },
    onCancel() {
      this.$refs.form.reset();
    },
    onImageError() {
      console.log('Could not load image');
    }
  }
};
</script>

<style>
</style>
