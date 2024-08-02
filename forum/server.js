const express = require("express");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
const methodOverride = require("method-override");
require("dotenv").config();

app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// 요청.body로 user data 쉽게 뽑기 가능
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

app.use(passport.initialize());
app.use(
  session({
    secret: "암호화에 쓸 비번",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

app.use(passport.session());

//
//
//
let db;
const url = process.env.DB_URL;
new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB연결성공");
    db = client.db("forum"); // db이름
    app.listen(process.env.PORT, () => {
      console.log("http://localhost:8080 에서 서버 실행중");
    });
  })
  .catch((err) => {
    console.log(err);
  });

function checkLogin(요청, 응답, next) {
  if (!요청.user) {
    응답.send("로그인하세요");
  }
}

app.get(
  "/user/:userid",
  (req, res, next) => {
    console.log("path: " + req.path);
    console.log(req.baseUrl);
    console.log(req.originalUrl);

    let who = req.params.userid;
    res.locals.rdata = "Look for user: " + who;
    next();
  },
  (req, res) => {
    let msg = "<h1>Hello World!<h1>";
    msg += res.locals.rdata;
    res.send(msg);
  }
);

app.get("/", (요청, 응답) => {
  응답.sendFile(__dirname + "/index.html");
});

app.get("/news", (요청, 응답) => {
  db.collection("post").insertOne({ title: "어쩌구" });
  응답.send("오늘 비옴");
});

app.get("/list", async (요청, 응답) => {
  let result = await db.collection("post").find().toArray();
  // 응답.send(result[0].title);
  응답.render("list.ejs", { 글목록: result });
});

app.get("/time", async (요청, 응답) => {
  let time = new Date();
  응답.render("time.ejs", { 시간: time });
});

app.get("/about", (요청, 응답) => {
  응답.sendFile(__dirname + "/myself.html");
});

app.get("/write", (요청, 응답) => {
  응답.render("write.ejs");
});

app.post("/add", async (요청, 응답) => {
  await db
    .collection("post")
    .insertOne({ title: 요청.body.title, content: 요청.body.content });
  응답.redirect("/list");

  console.log(요청.body.title);
  console.log(요청.body.content);
});

app.post("/add", async (요청, 응답) => {
  try {
    console.log(요청.body);
    if (요청.body.title == "") {
      응답.send("제목안적었는데");
    } else {
      await db
        .collection("post")
        .insertOne({ title: 요청.body.title, content: 요청.body.content });
      응답.redirect("/list");
    }
  } catch (e) {
    console.log(e);
    응답.status(500).send("서버에러남");
  }
});

app.get("/detail/:id", async (요청, 응답) => {
  try {
    let result = await db
      .collection("post")
      .findOne({ _id: new ObjectId(요청.params.id) });
    if (result == null) {
      응답.status(404).send("이상한 url 입력함");
    } else {
      응답.render("detail.ejs", { result: result });
    }
  } catch (e) {
    console.log(e);
    응답.status(404).send("이상한 url 입력함");
  }
});

app.get("/edit/:id", async (요청, 응답) => {
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(요청.params.id) });
  응답.render("edit.ejs", { result: result });
});

app.put("/edit", async (요청, 응답) => {
  // await db
  //   .collection("post")
  //   .updateMany({ _id: { $gt: 1 } }, { $set: { like: 1 } });

  try {
    await db
      .collection("post")
      .updateOne(
        { _id: new ObjectId(요청.body.id) },
        { $set: { title: 요청.body.title, content: 요청.body.content } }
      );
    응답.redirect("/list");
  } catch (e) {
    console.log(e);
  }
});

// app.post("/abc", async (요청, 응답) => {
//   console.log("안녕");
//   console.log(요청.body);
// });

// app.get("/abc/:id", async (요청, 응답) => {
//   console.log(요청.params);
// });

// app.get("/abc", async (요청, 응답) => {
//   console.log(요청.query);
// });

app.post("/delete", async (요청, 응답) => {
  await db.collection("post").deleteOne({ _id: new ObjectId(요청.body.id) });
});

app.delete("/delete", async (요청, 응답) => {
  await db
    .collection("post")
    .deleteOne({ _id: new ObjectId(요청.query.docid) });
  응답.send("삭제완료");
});

app.get("/list/:id", async (요청, 응답) => {
  let result = await db
    .collection("post")
    .find()
    .skip((요청.params.id - 1) * 5)
    .limit(5)
    .toArray();
  응답.render("list.ejs", { 글목록: result });
});

app.get("/list/next/:id", async (요청, 응답) => {
  let result = await db
    .collection("post")
    .find({ _id: { $gt: new ObjectId(요청.params.id) } })
    .limit(5)
    .toArray();
  응답.render("list.ejs", { 글목록: result });
});

passport.use(
  new LocalStrategy(async (입력한아이디, 입력한비번, cb) => {
    let result = await db
      .collection("user")
      .findOne({ username: 입력한아이디 });
    if (!result) {
      return cb(null, false, { message: "아이디 DB에 없음" });
    }
    if (result.password == 입력한비번) {
      return cb(null, result);
    } else {
      return cb(null, false, { message: "비번불일치" });
    }
  })
);

passport.serializeUser((user, done) => {
  console.log(user);
  process.nextTick(() => {
    done(null, { username: user.username });
  });
});

passport.deserializeUser((user, done) => {
  process.nextTick(() => {
    done(null);
  });
});

app.get("/login", async (요청, 응답) => {
  응답.render("login.ejs");
});

app.post("/login", async (요청, 응답, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) return 응답.status(500).json(error);
    if (!user) return 응답.status(500).json(info.message);
  })(요청, 응답, next);
});
