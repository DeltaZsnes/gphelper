const express = require("express");
const http = require("http");
const passport = require("passport");
const GoogleOAuthStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const config = require("./config.js");

const app = express();
const server = http.Server(app);

var setupMiddleware = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new GoogleOAuthStrategy({
        clientID: config.oAuthClientID,
        clientSecret: config.oAuthclientSecret,
        callbackURL: config.oAuthCallbackUrl,
        // Set the correct profile URL that does not require any additional APIs
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
      },
      (token, refreshToken, profile, done) => done(null, {
        profile,
        token
      })
    )
  );

  const sessionMiddleware = session({
    resave: true,
    saveUninitialized: true,
    secret: "photo frame sample"
  });

  app.use(sessionMiddleware);
  app.use(passport.initialize());
  app.use(passport.session());
};

var setupEndpoint = () => {
  app.use("/start", express.static(__dirname + "/start"));

  app.get(
    "/auth/login",
    passport.authenticate("google", {
      scope: config.scopes,
      failureFlash: true,
      session: true
    })
  );

  app.get('/auth/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/start');
  });

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/start",
      failureFlash: true,
      session: true
    }),
    (req, res) => {
      res.redirect("/start");
    }
  );

  app.get("/auth/user", (req, res) => {
    if (req.user && req.isAuthenticated()) {
      res.json({
        user: req.user
      });
    } else {
      res.status(401).json({
        message: "401 (Unauthorized)"
      });
    }
  });
};

setupMiddleware();
setupEndpoint();

server.listen(config.port, () => {
  var baseUrl = "http://localhost:" + config.port;
  console.log(baseUrl + "/auth/login");
  console.log(baseUrl + "/auth/user");
  console.log(baseUrl + "/start");
});
