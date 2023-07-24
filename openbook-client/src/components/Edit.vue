<template>
  <main class="new container mt-5" id="story-editor">
    <h2 class="title">New Story</h2>
    <form method="POST" id="draft" action="/story/new">
      <div class="field">
        <label class="label" for="storyTitle">Story Title:</label>
        <div class="control">
          <input class="input" type="text" name="storyTitle" id="story-title" autocomplete="off">
        </div>
      </div>
      <div class="field">
        <label class="label" for="description">Description:</label>
        <div class="control">
          <input class="input" type="text" name="description" autocomplete="off">
        </div>
      </div>
      <div class="field">
        <label class="label" for="chapterTitle">Chapter Title:</label>
        <div class="control">
          <input class="input" type="text" name="chapterTitle" autocomplete="off">
        </div>
      </div>
      <div class="field">
        <label class="label" for="category">Category:</label>
        <div class="control">
          <div class="select">
            <select name="category">
              <option value="Free Prose">Free Prose</option>
              <option value="Poetry">Poetry</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label" for="genre">Genre:</label>
        <div class="control">
          <div class="select">
            <select name="genre">
              <option value="Fiction">Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Horror">Horror</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label" for="rating">Rating:</label>
        <div class="control">
          <div class="select">
            <select name="rating">
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
        <label class="label" for="chapterText">Chapter body:</label>
        <div class="control">
          <textarea class="textarea has-fixed-size" rows="10" id="text-editor" name="chapterText"
            autocomplete="off"></textarea>
        </div>
      </div>
      <div class="notification">
      </div>
      <footer>
        <div>
          <p>Letter count: <span id="letter-counter">0</span></p>
          <p>Word count: <span id="word-counter">0</span></p>
        </div>
        <div class="action-buttons">
          <button id="save-story">Save</button>
          <button id="publish">Publish</button>
          <button id="discard-story">Discard</button>
        </div>
      </footer>
    </form>
  </main>
</template>

<script>
export default {
  name: 'edit'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@use '../mq' as mq

</style>
