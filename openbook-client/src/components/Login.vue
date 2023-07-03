<template>
  <section class="login">
    <div class="toggle-tabs">
      <button class="tab" v-bind:class="{ 'active': isUser }" @click="toggleLogin()">Log In</button>
      <button class="tab" v-bind:class="{ 'active': !isUser }" @click="toggleLogin(false)">Register</button>
    </div>
    <div class="form-container">
      <div class="notification is-danger" v-if="notifications.length">
        <div v-for="note in notifications">{{ note }}</div>
      </div>
      <div class="login-form" @submit.prevent="login(loginForm)" v-bind:class="{ 'hidden': !isUser }">
        <form>
          <div class="field is-horizontal">
            <label class="label field-label is-normal">E-mail</label>
            <div class="control has-icons-left field-body">
              <input class="input" type="email" v-model="loginForm.email">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div class="field is-horizontal">
            <label class="label field-label is-normal">Password</label>
            <div class="control has-icons-left field-body">
              <input class="input" type="password" v-model="loginForm.password">
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
      <div class="register-form" @submit.prevent="register(registerForm)" v-bind:class="{ 'hidden': isUser }">
        <form>
          <div class="field is-horizontal">
            <label class="label field-label is-normal">Username</label>
            <div class="control has-icons-left field-body">
              <input class="input" type="text" v-model="registerForm.userName" placeholder="e.g. Bram Stoker">
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>
          <div class="field is-horizontal">
            <label class="label field-label is-normal">E-mail</label>
            <div class="control has-icons-left field-body">
              <input class="input" type="email" v-model="registerForm.email" placeholder="e.g. blackbeard@pirates.org">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div class="field is-horizontal">
            <label class="label field-label is-normal">Confirm</label>
            <div class="control has-icons-left field-body">
              <input class="input" type="email" v-model="registerForm.emailConfirm">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div class="field is-horizontal">
            <label class="label field-label is-normal">Password</label>
            <div class="control has-icons-left field-body">
              <input class="input" type="password" v-model="registerForm.password" placeholder="8+ characters">
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
            </div>
          </div>
          <div class="field is-horizontal">
            <label class="label field-label is-normal">Re-enter</label>
            <div class="control has-icons-left field-body">
              <input class="input" type="password" v-model="registerForm.passwordConfirm">
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
import axios from 'axios';
import router from '../router';
export default {
  name: 'login',
  data: function() {
    return {
      isUser: true,
      notifications: [],
      loginForm: { email: '', password: '' },
      registerForm: { userName: '', email: '', emailConfirm: '', password: '', passwordConfirm: '' }
    };
  },
  methods: {
    // Toggles between the login form and the registration form
    toggleLogin: function(activate = true) {
      this.notifications = [];
      this.isUser = activate;
    },
    login: function(data) {
      this.notifications = [];
      if (!this.loginForm.email || !this.loginForm.password) {
        return this.notifications.push("Please enter an email and password.");
      }
      axios.post(`/login`, { email: data.email, password: data.password },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          withCredentials: true
        })
        .then(res => {
          console.log(res);
          if (res.data.err) {
            console.log(res.data.err);
            return this.notifications.push(res.data.err);
          }
          this.loginForm = { email: '', password: '' };
          this.$store.dispatch('user', res.data.user);
          router.push({ path: '/read' });
        })
        .catch(err => {
          console.log(err);
        });
    },
    register: function(data) {
      this.notifications = [];

      // Prevent submission if fields are not filled in
      for (const field in this.registerForm) {
        if (!this.registerForm[field].length) {
          this.notifications.push("Please make sure all fields are filled in.");
          break;
        }
      }

      // Confirm email address
      if (this.registerForm.email !== this.registerForm.emailConfirm) {
        this.notifications.push("Email address doesn't match.");
      }

      // Confirm password
      if (this.registerForm.password !== this.registerForm.passwordConfirm) {
        console.log(this.registerForm.password, this.registerForm.passwordConfirm);
        this.notifications.push("Password doesn't match.");
      }

      // Confirm password length
      if (this.registerForm.password.length < 8) {
        this.notifications.push("Password needs to be at least 8 characters.");
      }


      if (this.notifications.length) {
        return this.notifications.unshift("Something is wrong:");
      }

      axios.post(`/register`, { email: data.email, password: data.password, userName: data.userName },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          withCredentials: true
        })
        .then(res => {
          console.log(res);
          if (res.data.err) {
            return this.notifications.push(res.data.err);
          }
          for (const field in this.registerForm) {
            this.registerForm[field] = '';
          }
          this.$store.dispatch('user', res.data.user);
          router.push({ path: '/read' });
        })
        .catch(err => {
          console.log(err);
        });

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
