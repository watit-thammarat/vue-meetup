<template>
  <v-container>
    <v-layout row wrap justify-center v-for="m in meetups" :key="m.id" class="mb-2">
      <v-flex xs12 sm10 md8>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-img height="130px" :src="m.imageUrl" />
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <div class="headline white--text">{{ m.title }}</div>
                    <span>{{ m.date | date }}</span>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="{ name: 'Meetup', params: { id: m.id } }">
                    <v-icon left>arrow_forward</v-icon> View Meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({}),
  computed: {
    ...mapGetters(['meetups'])
  }
};
</script>

<style>
</style>
