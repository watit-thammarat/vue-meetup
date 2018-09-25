import * as firebase from 'firebase';

export default {
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
};
