const db = require("../models");
const router = require("express").Router();
const passport = require("../config/passport");

router.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.json({
    email: req.user.email,
    id: req.user.id
  });
});

router.post("/api/signup", (req, res) => {
  db.userProfile
    .create({
      email: req.body.email,
      password: req.body.password,
      // eslint-disable-next-line camelcase
      first_name: req.body.first_name,
      // eslint-disable-next-line camelcase
      last_name: req.body.last_name
    })
    .then(() => {
      res.redirect(307, "/api/login");
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/api/user_data", (req, res) => {
  if (!req.user) {
    res.json({});
  } else {
    res.json({
      email: req.user.email,
      id: req.user.id,
      // eslint-disable-next-line camelcase
      first_name: req.user.first_name,
      // eslint-disable-next-line camelcase
      last_name: req.user.last_name
    });
  }
});

router.post("/api/bookList", (req, res) => {
  db.bookList
    .create({
      // eslint-disable-next-line camelcase
      google_book_id: req.body.google_book_id,
      completed: req.body.completed,
      ranking: req.body.ranking,
      userProfileId: req.body.userProfileId
    })
    .then(() => {
      res.send("ok");
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

router.post("/api/comment", (req, res) => {
  db.user_comment
    .create({
      googleBookId: req.body.googleBookId,
      text: req.body.text,
      displayed: req.body.displayed,
      liked: req.body.liked,
      disliked: req.body.disliked
    })
    .then(() => {
      res.send("ok");
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

const { Op } = require("sequelize");
router.get("/api/check/:userId/:googleId", (req, res) => {
  db.bookList
    .findAll({
      where: {
        [Op.and]: [
          { userprofileid: req.params.userId },
          // eslint-disable-next-line camelcase
          { google_book_id: req.params.googleId }
        ]
      }
    })
    .then(isExist => {
      res.json(isExist);
    });
});

router.get("/api/bookList/:userid", (req, res) => {
  db.bookList
    .findAll({
      where: {
        userProfileId: req.params.userid
      }
    })
    .then(Data => {
      const aa = JSON.stringify(Data);
      const list = JSON.parse(aa);

      res.json(list);
    });
});

router.put("/api/bookList/:id/:isCompleted", (req, res) => {
  db.bookList
    .update(
      { completed: req.params.isCompleted },

      {
        where: {
          // eslint-disable-next-line camelcase
          google_book_id: req.params.id
        }
      }
    )
    .then(data => {
      res.json(data);
    });
});

router.delete("/api/bookList/:id/:userProfileId", (req, res) => {
  db.bookList
    .destroy({
      where: {
        // eslint-disable-next-line camelcase
        google_book_id: req.params.id,
        userProfileId: req.params.userProfileId
      }
    })
    .then(book => {
      res.json(book);
    });
});

router.put("/api/rank/:id", (req, res) => {
  db.bookList
    .update(
      { ranking: req.body.ranking },

      {
        where: {
          google_book_id: req.params.id,
          userProfileId: req.body.userProfileId
        }
      }
    )
    .then(data => {
      res.json(data);
    });
});

module.exports = router;
