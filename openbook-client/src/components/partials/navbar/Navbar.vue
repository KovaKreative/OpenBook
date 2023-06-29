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
        <div class="navbar-end">
          <div v-if="user">
            <p>Hello, {{ user.name }}!</p>
            <router-link to="/new" class="navbar-item">New Story</router-link>
            <router-link to="/logout" class="navbar-item">Log Out</router-link>
          </div>
          <router-link to="/" class="navbar-item" v-if="!user">Log In/Register</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
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
    }
  },
  computed: {...mapGetters(['user'])}
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
