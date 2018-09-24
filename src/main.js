import '@babel/polyfill';
import Vue from 'vue';
import { initializeApp } from 'firebase/app';

import './plugins/vuetify';
import './filters';
import router from './router';
import App from './App.vue';
import store from './store';
import Alert from './components/Shared/Alert.vue';

Vue.config.productionTip = false;

Vue.component('alert', Alert);

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    initializeApp({
      apiKey: 'AIzaSyA-P1mkxbJCLdd3kH58QdPt7uZMDOiMn8o',
      authDomain: 'meetup-a1840.firebaseapp.com',
      databaseURL: 'https://meetup-a1840.firebaseio.com',
      projectId: 'meetup-a1840',
      storageBucket: 'meetup-a1840.appspot.com'
    });
  }
}).$mount('#app');
