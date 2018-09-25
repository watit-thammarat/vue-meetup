export default {
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
  setMeetups: (state, payload) => {
    state.meetups = payload;
  }
};
