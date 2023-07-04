<template>
  <div class='stories container'>
    <section class='all-stories third'>
      <h1 class="m-3 is-size-3 has-text-weight-semibold">All Stories</h1>
      <p v-if="!allStories.length">There don't seem to be any stories in our database. You can be our first author!</p>
      <div class="container is-flex is-flex-wrap-wrap">
        <div class="card m-2 flex-shrink" v-for="story in allStories">
          <header class="card-header">
            <span class="card-header-icon"><i class="fas fa-book-open" aria-hidden="true"></i></span>
            <router-link :to="{ path: `read/${story.id}` }">
              <h1 class="card-header-title">{{ story.story_title }}
              </h1>
            </router-link>
          </header>
          <div class="card-content">
            <p>{{ story.description }}</p>
            <p>Status:
              <span>{{ story.completed ? 'Completed' : 'Ongoing' }}</span>
            </p>
            <p> {{ story.genre }} / {{ story.category }}</p>
          </div>
          <footer class="card-footer p-2">
            <p>By {{ story.name }}, Published {{ story.publish_date }}</p>
          </footer>
        </div>
      </div>
    </section>
    <section class='my-stories third' v-if="user !== null">
      <h1 class="m-3 is-size-3 has-text-weight-semibold">Your Stories</h1>
      <p v-if="!myStories.length">You haven't started any stories yet.</p>
      <div class="container is-flex is-flex-wrap-wrap">
        <div class="card m-2 flex-shrink" v-for="story in myStories">
          <header class="card-header">
            <span class="card-header-icon"><i class="fas fa-book-open" aria-hidden="true"></i></span>
            <router-link :to="{ path: `read/${story.id}` }">
              <h1 class="card-header-title">{{ story.story_title }}
              </h1>
            </router-link>
          </header>
          <div class="card-content">
            <p>{{ story.description }}</p>
            <p>Status:
              <span>{{ story.completed ? 'Completed' : 'Ongoing' }}</span>
            </p>
            <p> {{ story.genre }} / {{ story.category }}</p>
          </div>
          <footer class="card-footer p-2">
            <p>Published {{ story.publish_date }}</p>
          </footer>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import axios from 'axios';

export default {
  name: 'stories',
  data: function() {
    return {
      allStories: [],
      myStories: []
    };
  },
  methods: {
    fetchMyStories: function(id) {
      axios.get(`/stories/${id}`)
        .then(res => {
          console.log(res.data);
          this.myStories = Object.values(res.data.myStories);
        });
    }
  },
  computed: { ...mapGetters(['user']) },
  created: function() {
    axios.get('/stories/all')
      .then(res => {
        console.log(res.data);
        this.allStories = Object.values(res.data.allStories);
      });
    if (this.user !== null) {
      this.fetchMyStories(this.user.id);
    }
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'user') {
        if (mutation.payload === null) {
          return this.myStories = [];
        }
        this.fetchMyStories(state.user.id);
      }
    });
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@use '../mq' as mq

</style>