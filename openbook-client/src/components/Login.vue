<template>
  <section class="login">
    <div class="toggle-tabs">
      <button class="tab" v-bind:class="{ 'active': isUser }" v-on:click="toggleLogin()">Log In</button>
      <button class="tab" v-bind:class="{ 'active': !isUser }" v-on:click="toggleLogin(false)">Register</button>
    </div>
    <div class="form-container">
      <div class="login-form" v-bind:class="{ 'hidden': !isUser }">
        <form>
          <div class="field is-horizontal">
            <label class="label field-label is-normal">E-mail</label>
            <div class="control has-icons-left field-body">
              <input class="input" type="email">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div class="field is-horizontal">
            <label class="label field-label is-normal">Password</label>
            <div class="control has-icons-left field-body">
              <input class="input" type="password">
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
            </div>
          </div>
          <button class="button is-primary" type="submit">
            Log In
          </button>
        </form>
      </div>
      <div class="register-form" v-bind:class="{ 'hidden': isUser }">
        <form>
          <div class="field is-horizontal">
            <label class="label field-label is-normal">Username</label>
            <div class="control has-icons-left field-body">
              <input class="input" type="text" placeholder="e.g. Bram Stoker">
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>
          <div class="field is-horizontal">
            <label class="label field-label is-normal">E-mail</label>
            <div class="control has-icons-left field-body">
              <input class="input" type="email" placeholder="e.g. blackbeard@pirates.org">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div class="field is-horizontal">
            <label class="label field-label is-normal">Confirm</label>
            <div class="control has-icons-left field-body">
              <input class="input" type="email">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div class="field is-horizontal">
            <label class="label field-label is-normal">Password</label>
            <div class="control has-icons-left field-body">
              <input class="input" type="password" placeholder="8+ characters">
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
            </div>
          </div>
          <div class="field is-horizontal">
            <label class="label field-label is-normal">Re-enter</label>
            <div class="control has-icons-left field-body">
              <input class="input" type="password">
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
            </div>
          </div>
          <button class="button is-primary" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'login',
  data: function() {
    return {
      isUser: true
    };
  },
  methods: {
    toggleLogin: function(activate=true) {
      this.isUser = activate;
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@use '../mq' as mq
.login
  max-width: 640px
  margin: auto
  margin-top: 1em

.toggle-tabs
  display: flex
  justify-content: flex-start

.tab
  color: black
  background-color: gray
  padding: 0.5em 10%
  border-radius: 1em 1em 0 0
  outline: none
  border: none
  font-size: medium

.tab:active .tab:focus
  outline: none
  border: none

.tab:hover
  cursor: pointer

.form-container
  background-color: #ccc
  padding: 2em
  border-radius: 0% 2em
  transition: height 1s linear


.tab.active
  background-color: #CCC

.hidden
  display: none
</style>
