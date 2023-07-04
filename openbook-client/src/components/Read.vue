<template>
  <div class="read">
    Read {{ $route.params.id }}
  </div>
</template>

<script>

import axios from 'axios';
import router from '../router';

export default {
  name: 'read',
  created: function() {
    axios.get(`/read/${$route.params.id}`)
      .then(res => {
        console.log(res.data);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@use '../mq' as mq

</style>
