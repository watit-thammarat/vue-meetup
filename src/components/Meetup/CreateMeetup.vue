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
          <div>
            <v-btn raised color="primary" @click="onPickFile">Upload Image</v-btn>
            <input ref="file" type="file" style="display: none;" accept="image/*" @change="onFilePicked">
          </div>
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
          <v-btn :disabled="!valid || loading" :loading="loading" color="primary" @click="onSubmit">
            Create Meetup
            <span slot="loader" class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </v-btn>
          <v-btn color="warning" @click="onCancel">Cancel</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    error: null,
    loading: false,
    title: '',
    location: '',
    imageUrl: '',
    image: null,
    description: '',
    date: new Date().toISOString().substr(0, 10),
    time: new Date().toISOString().substr(11, 5),
    titleRules: [title => !!title || 'Title is required'],
    locationRules: [location => !!location || 'Location is required'],
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
    async onSubmit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      if (!this.image) {
        return;
      }
      const payload = {
        title: this.title,
        location: this.location,
        description: this.description,
        date: this.datetime.toISOString(),
        image: this.image
      };
      try {
        this.loading = true;
        this.error = null;
        await this.$store.dispatch('createMeetup', payload);
        this.$router.push({ name: 'Meetups' });
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    onCancel() {
      this.$refs.form.reset();
    },
    onImageError() {
      console.log('onImageError');
    },
    onPickFile() {
      this.$refs.file.click();
    },
    onFilePicked(e) {
      const [file] = e.target.files;
      const { name } = file;
      if (name.lastIndexOf('.') < 0) {
        return alert('Please add a valid file!');
      }
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result;
        this.image = file;
      });
    }
  }
};
</script>

<style>
</style>
