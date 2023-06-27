<template>
  <div id="app">
    <Navbar />
    <router-view />

  </div>
</template>

<script>
import Navbar from '../src/components/partials/navbar/Navbar';

export default {
  name: 'App',
  components: {
    Navbar
  }
};
</script>

<style lang="sass">
@use 'mq' as mq
@import '../node_modules/bulma/bulma.sass'

</style>
