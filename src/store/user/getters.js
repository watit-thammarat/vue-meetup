export default {
  user: state => state.user,
  isAuthenticated: state => !!state.user
};
