var config = {};

config.oAuthClientID = "1035749046165-0kuglb2thnbrira2a2ce43g7m80ar3s8.apps.googleusercontent.com";
config.oAuthclientSecret = "E_EedQMqugi-iWOaWEGkrsKU";
config.oAuthCallbackUrl = "https://us-central1-gphelper-a21db.cloudfunctions.net/app/auth/callback";
config.scopes = [
  "https://www.googleapis.com/auth/photoslibrary.readonly",
  "profile"
];
config.photosToLoad = 150;
config.searchPageSize = 100;
config.albumPageSize = 50;
config.apiEndpoint = "https://photoslibrary.googleapis.com";

module.exports = config;
