import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
// import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    digDays: [],
    locations: [],
    specializedAff: [],
  },
  getters: {
    getDigDays(state) {
      return state.digDays;
    },

    getLocations(state) {
      return state.locations;
    },

    getSpecializedAff(state) {
      return state.specializedAff;
    },
  },
  mutations: {
    setDigDays(state, value) {
      state.digDays = value;
    },

    setLocations(state, value) {
      state.locations = value;
    },

    setSpecializedAff(state, value) {
      state.specializedAff = value;
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

    async getSpecializedAff({ commit }) {
      fb.specializedAffCollection.onSnapshot(
        (affiliates) => {
          let affiliates_array = [];
          affiliates.forEach((doc) => {
            let object = {
              id: doc.id,
              location: doc.data().location,
              coordinates: doc.data().coordinates,
              name: doc.data().name,
            };
            affiliates_array.push(object);
          });
          commit("setSpecializedAff", affiliates_array);
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );
    },

    async getLocations({ commit }) {
      fb.locationsCollection.onSnapshot(
        (locations) => {
          let locations_array = [];
          locations.forEach((doc) => {
            let object = {
              id: doc.id,
              location_name: doc.data().location_name,
              coordinates: doc.data().coordinates,
            };
            locations_array.push(object);
          });
          commit("setLocations", locations_array);
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );
    },
  },
  modules: {},
});
