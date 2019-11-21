const express = require("express");
const config = require("./config");
const passport = require("passport");
const GoogleOAuthStrategy = require("passport-google-oauth20").Strategy;

const run = async () => {
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
    
    console.log("http://localhost:" + config.port);        
}

run();