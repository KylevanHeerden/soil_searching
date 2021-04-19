import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
// import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    digDays: [],
  },
  getters: {
    getDigDays(state) {
      return state.digDays;
    },
  },
  mutations: {
    setDigDays(state, value) {
      state.digDays = value;
    },
  },
  actions: {
    async getDigDays({ commit }) {
      fb.digDaysCollection.onSnapshot(
        (digDays) => {
          let digDays_array = [];
          digDays.forEach((doc) => {
            let object = {
              createdOn: doc.data().createdOn,
              id: doc.id,
              name: doc.data().name,
              coordinates: doc.data().coordinates,
              location: doc.data().coordinates.location_name,
              date: doc.data().date,
              infoPage: doc.data().infoPage,
              specializedAffiliate: doc.data().specializedAffiliate,
            };
            digDays_array.push(object);
          });
          commit("setDigDays", digDays_array);
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );
    },
  },
  modules: {},
});
