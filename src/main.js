import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import vuetify from "./plugins/vuetify";
import VueGeolocation from "vue-browser-geolocation";
import VueGoogleAutocomplete from "vue-google-autocomplete";

Vue.config.productionTip = false;
Vue.use(VueGeolocation);
Vue.use(VueGoogleAutocomplete);

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_FIREBASE_APIKEY2,
    libraries: "places",
  },
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
