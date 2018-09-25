export default {
  setUser: (state, payload) => {
    state.user = payload;
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
};
