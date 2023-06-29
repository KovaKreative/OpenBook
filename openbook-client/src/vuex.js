import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  user: null
};

const store = new Vuex.Store({
  state,
  getters: {
    user: state => state.user
  },
  actions: {
    user(context, user) {
      //The first user refers to the mutation below, the second refers to the getter above
      context.commit('user', user);
    }
  },
  mutations: {
    user(state, user) {
      state.user = user;
    }
  }
});

export default store;