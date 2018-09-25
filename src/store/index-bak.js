import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    meetups: [],
    user: null,
    loading: false
  },
  mutations: {
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    createMeetup: (state, payload) => {
      state.meetups = [...state.meetups, payload];
    },
    updateMeetup: (state, payload) => {
      const index = state.meetups.findIndex(m => m.id === payload.id);
      if (index < 0) {
        return;
      }
      const meetups = [...state.meetups];
      meetups[index] = { ...meetups[index], ...payload };
      state.meetups = meetups;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    setMeetups: (state, payload) => {
      state.meetups = payload;
    },
    registerMeetup: (state, { id, key }) => {
      state.user.registeredMeetups = [...state.user.registeredMeetups, id];
      state.user.keys[id] = key;
    },
    unregisterMeetup: (state, id) => {
      state.user.registeredMeetups = state.user.registeredMeetups.filter(
        m => m !== id
      );
      const keys = { ...state.user.keys };
      delete keys[id];
      state.user.keys = keys;
    }
  },
  actions: {
    registerMeetup: async ({ commit, getters }, id) => {
      const userId = getters.user.id;
      const { key } = await firebase
        .database()
        .ref(`/users/${userId}`)
        .child('/registrations')
        .push(id);
      commit('registerMeetup', { id, key });
    },
    unregisterMeetup: async ({ commit, getters }, payload) => {
      await firebase
        .database()
        .ref(`/users/${getters.user.id}/registrations`)
        .child(getters.user.keys[payload])
        .remove();
      commit('unregisterMeetup', payload);
    },
    loadMeetups: async ({ commit }) => {
      try {
        commit('setLoading', true);
        const data = await firebase
          .database()
          .ref('meetups')
          .once('value');
        const payload = [];
        const obj = data.val();
        for (const id in obj) {
          payload.push({ ...obj[id], id });
        }
        commit('setMeetups', payload);
      } catch (err) {
        console.error(err);
      } finally {
        commit('setLoading', false);
      }
    },
    updateMeetup: async ({ commit }, { id, title, description, date }) => {
      const payload = {};
      if (title) {
        payload.title = title;
      }
      if (description) {
        payload.description = description;
      }
      if (date) {
        payload.date = date;
      }
      await firebase
        .database()
        .ref('meetups')
        .child(id)
        .update(payload);
      commit('updateMeetup', { ...payload, id });
    },
    createMeetup: async (
      { commit, getters },
      { title, description, location, date, image }
    ) => {
      const payload = {
        title,
        description,
        location,
        date,
        creatorId: getters.user.id
      };
      const { key } = await firebase
        .database()
        .ref('meetups')
        .push(payload);
      const ext = image.name.slice(image.name.lastIndexOf('.'));
      await firebase
        .storage()
        .ref(`meetups/${key}.${ext}`)
        .put(image);
      const imageUrl = await firebase
        .storage()
        .ref(`meetups/${key}.${ext}`)
        .getDownloadURL();
      await firebase
        .database()
        .ref('meetups')
        .child(key)
        .update({ imageUrl });
      commit('createMeetup', { ...payload, imageUrl, id: key });
    },
    signup: async ({ commit }, { email, password }) => {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const payload = {
        id: user.uid,
        registeredMeetups: [],
        keys: {}
      };
      commit('setUser', payload);
    },
    signin: async ({ dispatch }, { email, password }) => {
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      await dispatch('fetchUserData', user.uid);
    },
    autoSignIn: async ({ dispatch }, { uid }) => {
      try {
        await dispatch('fetchUserData', uid);
      } catch (err) {
        console.error(err);
      }
    },
    fetchUserData: async ({ commit }, id) => {
      const data = await firebase
        .database()
        .ref(`/users/${id}/registrations`)
        .once('value');
      const obj = data.val();
      const registeredMeetups = [];
      const keys = {};
      for (const key in obj) {
        const meetupId = obj[key];
        registeredMeetups.push(meetupId);
        keys[meetupId] = key;
      }
      commit('setUser', { id, registeredMeetups, keys });
    },
    logout: ({ commit }) => {
      commit('setUser', null);
      firebase.auth().signOut();
    }
  },
  getters: {
    meetups: state => state.meetups.sort((a, b) => a.date > b.date),
    meetup: state => id => state.meetups.find(m => m.id === id),
    featuredMeetups: (_, getters) => getters.meetups.slice(0, 5),
    user: state => state.user,
    isAuthenticated: state => !!state.user,
    loading: state => state.loading
  }
});
