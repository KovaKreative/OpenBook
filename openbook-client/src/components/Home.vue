<template>
  <div class="home">
    <section class="hero is-medium">
      <div class="hero-body">Hero</div>
    </section>
    <div class="container">
      <Login />
    </div>
  </div>
</template>

<script>
import Login from './Login.vue';

export default {
  name: 'home',
  components: {
    Login
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
