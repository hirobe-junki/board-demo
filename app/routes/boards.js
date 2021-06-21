const express = require("express");
const router = express.Router();
const db = require("../models/index");

const { Op } = require("sequelize");

const pnum = 10;

// ログインのチェック
const check = (req, res) => {
  if (!req.session.login) {
    req.session.back = "/boards";
    res.redirect("/users/login");
    return true;
  } else {
    return false;
  }
};

/* GET boards listing. */
router.get("/", (req, res, next) => {
  if (check(req, res)) {
    return;
  }
  let page = req.query.page;
  if (page) {
    page = page * 1;
  } else {
    page = 0;
  }
  db.Board.findAll({
    offset: page * pnum,
    limit: pnum,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: db.User,
        required: true,
      },
    ],
  }).then((boards) => {
    const data = {
      title: "Boards",
      login: req.session.login,
      content: boards,
      page: page,
    };
    res.render("boards/index", data);
  });
});

/* POST boards/add listing. */
router.post("/add", (req, res, next) => {
  if (check(req, res)) {
    return;
  }
  db.sequelize.sync().then(() => {
    db.Board.create({
      userId: req.session.login.id,
      message: req.body.msg,
    })
      .then((board) => {
        res.redirect("/boards");
      })
      .catch((err) => {
        res.redirect("/boards");
      });
  });
});

/* GET boards/home/:user/:id/:page listing. */
router.get("/home", (req, res, next) => {
  if (check(req, res)) {
    return;
  }
  if (!Object.keys(req.query).length) {
    res.redirect("/boards");
  }
  const userName = req.query.user;
  let id = req.query.id;
  id = id ? id * 1 : 0;
  let page = req.query.page;
  page = page ? page * 1 : 0;
  db.Board.findAll({
    where: {
      userId: id,
    },
    offset: page * pnum,
    limit: pnum,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: db.User,
        required: true,
      },
    ],
  }).then((boards) => {
    const data = {
      title: "Boards",
      login: req.session.login,
      userId: id,
      userName: userName,
      content: boards,
      page: page,
    };
    res.render("boards/home", data);
  });
});

module.exports = router;
