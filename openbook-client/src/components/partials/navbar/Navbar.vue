<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <h1 class="navbar-item logo">Open Book</h1>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" v-on:click="toggleNav"
          v-bind:class="{ 'is-active': isActive }">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" v-bind:class="{ 'is-active': isActive }">
        <div class="navbar-end" v-if="user">
          <p class="navbar-item">Hello, {{ user.name }}!</p>
          <router-link to="/new" class="navbar-item">New Story</router-link>
          <a v-on:click="logOut" class="navbar-item">Log Out</a>
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
