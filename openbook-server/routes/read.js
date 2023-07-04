const express = require('express');
const router = express.Router();
const storyQueries = require('../db/queries/story-queries');
const helperQueries = require('../db/queries/helper-queries');
const contributionQueries = require('../db/queries/contribution-read-queries');

// renders page for root chapters
router.get("/:storyId", (req, res) => {
  console.log("Story requested");
  const storyId = req.params.storyId;
  const getRootChapterPromise = storyQueries.getRootChapter(storyId);
  const getChildrenChaptersPromise = storyQueries.getChildrenChapters(storyId);

  Promise.all([getRootChapterPromise, getChildrenChaptersPromise])
    .then(data => {
      const [rootChapter, childrenChapters] = data;

      if (!rootChapter) {
        return res.json({ success: false, err: "Unable to fetch story." });
      }

      return res.json({ success: true, story: { rootChapter, childrenChapters } });

    })
    .catch(err => {
      console.error(err);
      return res.json({ success: false, err: "Unable to fetch story." });
    });
});

// // renders page for chapters
// router.get("/:storyId/chapter/:contributionId", (req, res) => {
//   const storyId = req.params.storyId;
//   const contributionId = req.params.contributionId;
//   const getRootChapterPromise = storyQueries.getChapterData(contributionId);
//   const getChildrenChaptersPromise = storyQueries.getChildrenChapters(storyId);

//   Promise.all([getRootChapterPromise, getChildrenChaptersPromise])
//     .then(data => {
//       const [rootChapter, childrenChapters] = data;
//       const templateVars = { rootChapter, childrenChapters, userName: req.session.userName };
//       return res.render('read', templateVars);
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(404).render('error_page', { message: err, userName: req.session.userName });
//     });
// });

// // renders page for contributions
// router.get("/:storyId/contributions", (req, res) => {
//   const storyId = req.params.storyId;
//   const getStoryStatusPromise = storyQueries.getStoryStatus(storyId);
//   const getContributionsByIdPromise = storyQueries.getContributionsById(storyId);
//   const getUserUpvotesPromise = helperQueries.getUserUpvotes(req.session.userID);
//   const getWinnersByStoryIdPromise = storyQueries.getWinnersByStoryId(storyId);

//   Promise.all([getStoryStatusPromise, getContributionsByIdPromise, getUserUpvotesPromise, getWinnersByStoryIdPromise])
//     .then(data => {
//       const [storyStatus, contributions, upVoteArray, winnersArray] = data;

//       // parses upVoteArray to more manageable data to access
//       const upvotes = [];
//       upVoteArray.forEach(c => {
//         upvotes.push(c.contribution_id);
//       });

//       const winners = [];
//       winnersArray.forEach(w => {
//         winners.push(w.child_id);
//       });

//       const templateVars = { contributions, storyId, storyStatus, userName: req.session.userName, upvotes, winners };
//       console.log(templateVars);
//       return res.render('contributions', templateVars);
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(404).render('error_page', { message: err, userName: req.session.userName });
//     });
// });

module.exports = router;
