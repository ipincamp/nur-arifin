const express = require("express");
const fs = require("fs");

const app = express(),
  hos = process.env.HOST || "http://localhost:8000",
  por = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/:one?/:two?/:tre?/:fou?", function (req, res, next) {
  const { one, two, tre, fou } = req.params,
    d = process.cwd() + "/public";
  function check(file) {
    if (fs.existsSync(file)) return true;
    return false;
  }
  if (one === "about") return res.render("pages/about");
  if (one === "blogs") {
    if (two) {
      const post = process.cwd() + "/views/posts/" + two + ".ejs";
      if (check(post)) return res.render("posts/" + two);
      return res.render("pages/blogs");
    }
    return res.render("pages/blogs");
  }
  if (one === "calls") return res.render("pages/calls");
  if (one === "files") {
    if (two === "assets") {
      if (tre === "ico") {
        const icon = d + "/assets/favicon.ico";
        if (check(icon)) return res.sendFile(icon);
        return res.render("pages/index");
      }
      if (tre === "img") {
        const img = d + "/assets/img/" + fou;
        if (check(img)) return res.sendFile(img);
        return res.render("pages/index");
      }
    }
    if (two === "script") {
      const script = d + "/js/scripts.js";
      if (check(script)) return res.sendFile(script);
      return res.render("pages/index");
    }
    if (two === "styles") {
      const style = d + "/css/styles.css";
      if (check(style)) return res.sendFile(style);
      return res.render("pages/index");
    }
  }
  return res.render("pages/index");
});

app.post("/calls", function (req, res) {
  return res.send(req.body);
});

app.listen(por, () => console.info(hos));
