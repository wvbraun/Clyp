"use strict";


import mongoose from "mongoose";

/*
Playlist schema
const schema = mongoose.Schema({
  Title: String,
  PlaylistId: String,
  PlaylistUploadToken: String,
  AudioFiles: Array,
  Modifiable: Boolean,
  ContentAdministrator: Boolean,
  FeatureSubmissionEligibility: String
});
*/

/*
const schema = mongoose.Schema({
  ListenCount: Number,
  CommentCount: Number,
  FavoriteCount: Number,
  Status: String,
  CommentsEnabled: Boolean,
  Category: String,
  User: {
    FirstName: String,
    UserId: String,
    ProfilePictureUrl: String,
    PublicProfileUrl: String
  },
  AudioFileId: String,
  Title: String,
  Duration: Number,
  Url: String,
  Mp3Url: String,
  SecureMp3Url: String,
  OggUrl: String,
  SecureOggUrl: String,
  DateCreated: String
});
*/

const clypSchema = mongoose.Schema({
  Status: String,
  CommentsEnabled: Boolean,
  Category: String,
  PlaylistId: String,
  PlaylistUploadToken: String,
  AudioFileId: String,
  Title: String,
  Duration: Number,
  Url: String,
  Mp3Url: String,
  SecureMp3Url: String,
  OggUrl: String,
  SecureOggUrl: String,
  DateCreated: String
});

const userSchema = mongoose.Schema({
  email: String,
  access_token: String,
  token_type: String,
  expires_in: Number,
  refresh_token: String
});

const Clyp = mongoose.model("Clyp", clypSchema);
const User = mongoose.model("User", userSchema);


//const schema = mongoose.Schema({
//  tracks: [trackSchema]
//});

//export default mongoose.model("Clyp", schema);
export default {
  Clyp: Clyp,
  User: User
};
