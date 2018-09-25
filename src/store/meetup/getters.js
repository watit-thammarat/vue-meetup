export default {
  meetups: state => state.meetups.sort((a, b) => a.date > b.date),
  meetup: state => id => state.meetups.find(m => m.id === id),
  featuredMeetups: (_, getters) => getters.meetups.slice(0, 5)
};
