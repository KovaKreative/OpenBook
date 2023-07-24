<template>
  <main class="new container mt-5" id="story-editor">
    <h2 class="title">New Story</h2>
    <form @submit.prevent="save(controlForm, true)">
      <div class="field">
        <label class="label" for="storyTitle">Story Title:</label>
        <div class="control">
          <input class="input" type="text" name="storyTitle" id="story-title" autocomplete="off"
            v-model="controlForm.title">
        </div>
      </div>
      <div class="field">
        <label class="label" for="description">Description:</label>
        <div class="control">
          <input class="input" type="text" name="description" autocomplete="off" v-model="controlForm.description">
        </div>
      </div>
      <div class="field is-horizontal">
        <label class="label field-label" for="category">Category:</label>
        <div class="control field-body">
          <div class="select">
            <select name="category" v-model="controlForm.category">
              <option value="Free Prose">Free Prose</option>
              <option value="Poetry">Poetry</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <label class="label field-label" for="genre">Genre:</label>
        <div class="control field-body">
          <div class="select">
            <select name="genre" v-model="controlForm.genre">
              <option value="Fiction">Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Horror">Horror</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <label class="label field-label" for="rating">Rating:</label>
        <div class="control field-body">
          <div class="select">
            <select name="rating" v-model="controlForm.rating">
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="R">R</option>
              <option value="N/A">N/A</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label" for="chapterTitle">Chapter Title:</label>
        <div class="control">
          <input class="input" type="text" name="chapterTitle" autocomplete="off" v-model="controlForm.chapter">
        </div>
      </div>
      <div class="field">
        <label class="label" for="chapterText">Chapter body:</label>
        <div class="control">
          <textarea class="textarea has-fixed-size" rows="10" id="text-editor" name="chapterText"
            @input="wordCount(controlForm.body)" v-model="controlForm.body" autocomplete="off"></textarea>
        </div>
      </div>
      <div class="notification is-danger" v-if="notifications.length">
        <div v-for="note in notifications">{{ note }}</div>
      </div>
      <footer>
        <div class="level">
          <p class="level-item">Letter count: <span id="letter-counter">{{ letters }}</span></p>
          <p class="level-item">Word count: <span id="word-counter">{{ words }}</span></p>
        </div>
        <div class="action-buttons">
          <button id="save-story" v-on:click="save(controlForm, false)">Save</button>
          <button id="publish" type="submit">Publish</button>
          <button id="discard-story" v-on:click="discard()">Discard</button>
        </div>
      </footer>
    </form>
  </main>
</template>

<script>
import axios from 'axios';
export default {
  name: "new",
  data: function() {
    return {
      notifications: [],
      controlForm: { title: '', description: '', chapter: '', body: '', category: '', genre: '', rating: '' },
      letters: 0,
      words: 0
    };
  },
  methods: {
    save: function(form, publish) {
      this.notifications = [];
      // for (const field in form) {
      //   if (form[field].length <= 0) {
      //     return this.notifications.push("Please make sure to complete all fields.");
      //   }
      // }
      // if (form.body.length < 20) {
      //   return this.notifications.push("The body of the chapter needs to be at least 20 characters.");
      // }
      axios.post('/story/new',
        { ...form, publish },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          withCredentials: true
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    discard: function() {

    },
    wordCount: function(text) {
      this.letters = text.replaceAll(' ', '').length;
      const buffer = text.split(' ');
      this.words = buffer.length - (buffer[0] === "");
    }
  },
  created: function() {
    this.wordCount(this.controlForm.body);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
</style>
