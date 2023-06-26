DROP TABLE IF EXISTS bookmarks CASCADE;
CREATE TABLE bookmarks (
  id SERIAL PRIMARY KEY NOT NULL,
  story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);