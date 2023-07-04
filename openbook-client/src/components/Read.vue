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
    axios.get(`/read/${this.$route.params.id}`)
      .then(res => {
        if (!res.data.success) {
          return router.push({ path: "/stories" });
        }
        console.log(res.data.story);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@use '../mq' as mq

</style>
