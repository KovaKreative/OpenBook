/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/user-queries');

const bcryptjs = require('bcryptjs');

router.post('/register', (req, res) => {
  const { userName, email, password } = req.body;
  const hash = bcryptjs.hashSync(password);

  userQueries.registerNewUser({ name: userName, email, hash })
    .then((user) => {
      console.log("Registration successful", user);
      req.session.email = user.email;
      req.session.userName = user.name;
      req.session.id = user.id;
      res.status(200).json({ success: true, user: { name: user.name, id: user.id } });
    })
    .catch((err) => {
      res.status(200).json({ success: false, err: err.toString() });
    });
});

router.get('/validate', (req, res) => {
  console.log(req.session);

  if (!req.session) {
    console.log("No sesssion cookie.");
    return res.status(200).json({ success: false });
  }

  userQueries.getUserByEmail(req.session.email)
    .then((user) => {
      if (!user) {
        return res.status(200).json({ success: false });
      }

      console.log("Login successful");
      return res.status(200).json({ success: true, user: { name: user.name, id: user.id } });
    })
    .catch(err => {
      console.log(err);
      res.status(200).json({ success: false });
    });

});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  userQueries.getUserByEmail(email)
    .then((user) => {
      console.log(user);
      let err = null;
      if (!user || !bcryptjs.compareSync(password, user.hash)) {
        err = "Invalid login or password.";
      }

      if (err) {
        console.log(err);
        return res.status(200).json({ success: false, err });
      }

      console.log("Login successful");
      req.session.email = user.email;
      req.session.name = user.name;
      req.session.id = user.id;
      res.status(200).json({ success: true, user: { name: user.name, id: user.id } });
    });
});

router.get('/logout', (req, res) => {
  req.session = null;
  res.json({ success: true });
});

module.exports = router;
