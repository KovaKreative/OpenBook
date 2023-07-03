<template>
  <div id="app">
    <Navbar />
    <router-view />

  </div>
</template>

<script>
import axios from 'axios';

import Navbar from '../src/components/partials/navbar/Navbar';

import router from './router';

export default {
  name: 'App',
  components: {
    Navbar
  },
  data: function() {
    return {
      session: { user: null }
    };
  },
  created: function() {
    axios.get(`/validate`, {
      proxy: {
        port: 3000
      },
    })
      .then(res => {
        console.log(res);
        if (!res.data.success) {
          return;
        }
        this.$store.dispatch('user', res.data.user);
        router.push({ path: '/read' })
      });
  }
};
</script>

<style lang="sass">
@use 'mq' as mq
@import '../node_modules/bulma/bulma.sass'

</style>
