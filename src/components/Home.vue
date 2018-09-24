<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large to="/meetups" class="info">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large to="/meetup/new" class="info">Organize Meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel style="cursor: pointer;">
          <v-carousel-item @click="onLoadMeetup(m)" v-for="m in featuredMeetups" :key="m.id" :src="m.imageUrl">
            <div class="title">
              {{ m.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awesome meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({}),
  computed: {
    ...mapGetters(['featuredMeetups'])
  },
  methods: {
    onLoadMeetup({ id }) {
      this.$router.push({ name: 'Meetup', params: { id } });
    }
  }
};
</script>

<style>
.title {
  position: absolute;
  bottom: 50px;
  transform: translateX(-50%);
  left: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 2rem;
  padding: 30px;
}
</style>
