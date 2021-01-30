function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }

  res.render("login");
}

module.exports = function(app) {
  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/", (req, res) => {
    res.render("login");
  });

  app.get("/signup", (req, res) => {
    res.render("signUp");
  });

  app.get("/profile", isAuthenticated, (req, res) => {
    res.render("userProfile");
  });

  app.get("/api/book/:bookId", (req, res) => {
    const selected = req.params.bookId;

    for (let i = 0; i < bookId.length; i++) {
      if (selected === bookId[i].routeName) {
        return res.json(bookId[i]);
      }
    }
    res.render("bookPage");
  });

  app.get("/book", (req, res) => {
    res.render("bookPage");
  });
};
