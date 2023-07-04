import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  user: null,
  myStories: []
};

const store = new Vuex.Store({
  state,
  getters: {
    user: state => state.user,
    myStories: state => state.myStories
  },
  actions: {
    user(context, user) {
      //The first user refers to the mutation below, the second refers to the getter above
      context.commit('user', user);
    },
    myStories(context, myStories) {
      context.commit('myStories', myStories);
    }
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
    myStories(state, myStories) {
      state.myStories = myStories;
    }
  }
});

export default store;