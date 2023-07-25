const express = require('express');
const router = express.Router();
const writeQueries = require('../db/queries/write-queries');

router.use((req, res, next) => {
  if (!req.session.email) {
    return res.redirect('/login');
  }
  next();
});

// router.get('/new', (req, res) => {
//   const templateVars = { userName: req.session.userName };
//   res.render('new_story', templateVars);
// });

router.post('/new', (req, res) => {
  const data = req.body;
  const draftID = data.id;
  
  const chapter = {
    title: data.chapter,
    body: data.body,
    published: data.publish
  };

  const story = {
    title: data.title,
    description: data.description,
    category: data.category,
    genre: data.genre,
    rating: data.rating
  };

  if (!draftID) {
    return writeQueries.saveNewStory(req.session.email, chapter, story)
      .then(id => {
        return res.json({ success: true, id: String(id) })
      })
      .catch((err) => {
        console.log(err);
        return res.json({ success: false, err })
      });
    }
    
    writeQueries.saveExistingStory(draftID, req.session.email, chapter, story)
    .then(() => {
      return res.json({ success: true })
    })
    .catch(() => {
      return res.json({ success: false, err })
    });

});

router.post('/discard/', (req, res) => {

  writeQueries.deleteStory(req.session.draftId)
    .then(() => {
      req.session.draftId = null;
      res.redirect('/read');
    });

});

module.exports = router;
