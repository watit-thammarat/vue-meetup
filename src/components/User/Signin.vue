<template>
  <v-container class="mt-3">
    <v-layout v-if="error" row justify-center>
      <v-flex xs12 sm6>
        <alert :error="error" @dismissed="onDismissed"></alert>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex x12 sm6>
        <v-card>
          <v-card-text>
            <v-container>
              <v-form ref="form" lazy-validation v-model="valid">
                <v-text-field @keyup.enter="onSubmit" :rules="emailRules" label="Mail" v-model="payload.email" type="email" required></v-text-field>
                <v-text-field @keyup.enter="onSubmit" :rules="passwordRules" label="Password" v-model="payload.password" type="password" required></v-text-field>
                <v-btn :disabled="!valid || loading" :loading="loading" class="info" @click="onSubmit">
                  Sign in
                  <span slot="loader" class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                </v-btn>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      valid: true,
      loading: false,
      error: null,
      payload: {
        email: '',
        password: ''
      },
      emailRules: [email => !!email || 'Email is required'],
      passwordRules: [password => !!password || 'Password is required']
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
    user(value) {
      if (value) {
        this.$router.push({ name: 'Home' });
      }
    }
  },
  methods: {
    onDismissed() {
      this.error = null;
    },
    async onSubmit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      try {
        this.loading = true;
        this.error = null;
        await this.$store.dispatch('signin', this.payload);
        // this.$router.push({ name: 'Home' });
      } catch (err) {
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
