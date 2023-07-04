<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <h1 class="navbar-item logo">Open Book</h1>
        <p class="navbar-item" v-if="user">Hello, {{ user.name }}!</p>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" v-on:click="toggleNav"
        v-bind:class="{ 'is-active': isActive }">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" v-bind:class="{ 'is-active': isActive }">
      <div class="navbar-end">
        <router-link to="/read" class="navbar-item">Read Stories</router-link>
        <router-link to="/new" class="navbar-item" v-if="user">New Story</router-link>
        <a v-on:click="logOut" class="navbar-item" v-if="user">Log Out</a>
        </div>
        <div class="navbar-end" v-if="!user">
          <router-link to="/" class="navbar-item">Log In/Register</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import router from '../../../router';

export default {
  name: 'navbar',
  data: function() {
    return {
      isActive: false
    };
  },
  methods: {
    toggleNav: function() {
      this.isActive = !this.isActive;
    },
    logOut: function() {
      axios.get(`/logout`)
        .then(res => {
          console.log(res);
          if (res.data.success) {
            router.push({ path: '/' });
            this.$store.dispatch('user', null);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: { ...mapGetters(['user']) }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@use '../../../mq' as mq

.navbar
  // background-color: #481818

.logo
  font-weight: bold
  font-size: x-large
</style>
