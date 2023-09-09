import Vue from "vue";
import Vuex from "vuex";
import User from "./modules/User";
import Recommendation from "./modules/Recommendation";
import VuexPersistence from "vuex-persist";
import { SET_ERROR, SET_MESSAGE } from "./mutations";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
});

export default new Vuex.Store({
  state: {
    message: null,
    error: null,
    historyRoute: null,
  },
  mutations: {
    [SET_ERROR](state, error) {
      state.error = error;
    },
    [SET_MESSAGE](state, message) {
      state.message = message;
    },
  },
  actions: {
    setError({ commit }, error) {
      commit(SET_ERROR, error);
    },
    setMessage({ commit }, message) {
      commit(SET_MESSAGE, message);
    },
  },
  getters: {
    error: (state) => state.error,
    message: (state) => state.message,
  },
  modules: {
    User,
    Recommendation,
  },
  plugins: [vuexLocal.plugin],
});
