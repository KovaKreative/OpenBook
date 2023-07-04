<template>
  <div class="home">
    <section class="hero is-medium">
      <div class="hero-body">Hero</div>
    </section>
    <div v-if="!user" class="container">
      <Login />
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import router from '../router';
import Login from './Login.vue';

export default {
  name: 'home',
  components: {
    Login
  },
  computed: { ...mapGetters(['user']) },
  created: function() {
    if (this.user !== null) {
      return router.push({ path: '/read' });
    }

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'user' && mutation.payload !== null) {
        return router.push({ path: '/read' });
      }
    });

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@use '../mq' as mq

.hero
  background-color: mq.$primary
  color: mq.$white

</style>
