var config = {};

config.oAuthClientID =
  "1035749046165-ifgs23r0nc294fqapl2mbbfnqpmv3vbe.apps.googleusercontent.com";
config.oAuthclientSecret = "4DU5kv4Aq_tCwEemRwWxJXd_";
config.oAuthCallbackUrl = "http://127.0.0.1:8080/auth/google/callback";
config.port = 8888;
config.scopes = [
  "https://www.googleapis.com/auth/photoslibrary.readonly",
  "profile"
];
config.photosToLoad = 150;
config.searchPageSize = 100;
config.albumPageSize = 50;
config.apiEndpoint = "https://photoslibrary.googleapis.com";

module.exports = config;