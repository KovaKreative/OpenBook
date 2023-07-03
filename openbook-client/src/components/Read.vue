<template>
  <div class='read container'>
    <section class='all-stories third'>
      <h1>All Stories</h1>
      <p v-if="!allStories.length">There don't seem to be any stories in our database. You can be our first author!</p>
      <div class="card-box">
        <div class="story-card" v-for="story in allStories">
          <!-- <a href="/read/{{ story.id }}"> -->
          <!-- <%= story.story_title %>
                    <% if (story.completed) { %>
                      - Completed
                      <% } else { %>
                        - Ongoing
                        <% } %> -->
          <!-- </a> -->
          <!-- <p>By <%= story.name %>, Published <%= story.publish_date %>
                </p> -->
          <!-- <p>
                  <%= story.genre %> / <%= story.category %>
                </p> -->
          <p class='description'>
            {{ story.description }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'read',
  data: function() {
    return {
      allStories: []
    };
  },
  created: function() {
    axios.get('/read/all')
      .then(res => {
        console.log(res.data);
        this.allStories = Object.values(res.data.allStories);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@use '../mq' as mq

</style>
