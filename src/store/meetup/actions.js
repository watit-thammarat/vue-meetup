import * as firebase from 'firebase';

export default {
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
  }
};
