const functions = require('firebase-functions');
const express = require("express");
const passport = require("passport");
const GoogleOAuthStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const path = require("path");
const config = require("./config.js");

const app = express();

const setupMiddleware = () => {
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

const setupEndpoint = () => {
  app.use("/start", express.static(path.join(__dirname, "/start")));

  app.get("/", (req, res) => {
      res.redirect("app/start");
  });

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

module.exports = {
  "app": functions.https.onRequest(app)
}

//https://us-central1-gphelper-a21db.cloudfunctions.net/app/start/
