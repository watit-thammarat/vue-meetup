import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    meetups: [
      {
        id: '1',
        imageUrl: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        title: 'Meetup in New York',
        date: new Date(),
        location: 'New York',
        description: 'Hello World'
      },
      {
        id: '2',
        imageUrl: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        title: 'Meetup in Paris',
        date: new Date(),
        location: 'Paris',
        description: 'Hello World'
      }
    ],
    user: null
  },
  mutations: {
    createMeetup: (state, payload) => {
      state.meetups = [...state.meetups, payload];
    },
    setUser: (state, payload) => {
      state.user = payload;
    }
  },
  actions: {
    createMeetup: (
      { commit },
      { title, description, imageUrl, location, date }
    ) => {
      const payload = {
        title,
        description,
        imageUrl,
        location,
        date,
        id: new Date().getTime().toString()
      };
      //reach out to firebase and store it
      commit('createMeetup', payload);
    },
    signup: async ({ commit }, { email, password }) => {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const payload = {
        id: user.uid,
        registeredMeetups: []
      };
      commit('setUser', payload);
    },
    signin: async ({ commit }, { email, password }) => {
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const payload = {
        id: user.uid,
        registeredMeetups: []
      };
      commit('setUser', payload);
    }
  },
  getters: {
    meetups: state => state.meetups.sort((a, b) => a.date > b.date),
    meetup: state => id => state.meetups.find(m => m.id === id),
    featuredMeetups: (_, getters) => getters.meetups.slice(0, 5),
    user: state => state.user,
    isAuthenticated: state => !!state.user
  }
});
