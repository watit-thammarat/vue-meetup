import '@babel/polyfill';
import Vue from 'vue';
import * as firebase from 'firebase';

import './plugins/vuetify';
import './filters';
import router from './router';
import App from './App.vue';
import store from './store';
import Alert from './components/Shared/Alert.vue';
import EditMeetupDetailDialog from './components/Meetup/Edit/EditMeetupDetailDialog.vue';
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue';
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog.vue';
import RegisterDialog from './components/Meetup/Registration/RegisterDialog.vue';

Vue.config.productionTip = false;

Vue.component('alert', Alert);
Vue.component('edit-meetup-detail-dialog', EditMeetupDetailDialog);
Vue.component('edit-meetup-date-dialog', EditMeetupDateDialog);
Vue.component('edit-meetup-time-dialog', EditMeetupTimeDialog);
Vue.component('register-dialog', RegisterDialog);

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyA-P1mkxbJCLdd3kH58QdPt7uZMDOiMn8o',
      authDomain: 'meetup-a1840.firebaseapp.com',
      databaseURL: 'https://meetup-a1840.firebaseio.com',
      projectId: 'meetup-a1840',
      storageBucket: 'gs://meetup-a1840.appspot.com'
    });
    this.$store.dispatch('loadMeetups');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
      }
    });
  }
}).$mount('#app');
