const express = require("express");
const http = require("http");
const passport = require("passport");
const GoogleOAuthStrategy = require("passport-google-oauth20").Strategy;
const config = require("./config");

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
passport.use(
  new GoogleOAuthStrategy(
    {
      clientID: config.oAuthClientID,
      clientSecret: config.oAuthclientSecret,
      callbackURL: config.oAuthCallbackUrl,
      // Set the correct profile URL that does not require any additional APIs
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    (token, refreshToken, profile, done) => done(null, { profile, token })
  )
);

const app = express();

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: config.scopes,
    failureFlash: true,
    session: true
  })
);

const server = http.Server(app);
server.listen(config.port, () => {
  var baseUrl = "http://localhost:" + config.port;
  var authUrl = baseUrl + "/auth/google";
  console.log({ baseUrl, authUrl });
});
