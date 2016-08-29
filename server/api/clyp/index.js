"use strict";

//import jwt from "express-jwt";
import fetch from "node-fetch";
import path from 'path';
import mime from 'mime';
import models from "./clyp.model";
import express from "express";
import HttpsProxyAgent from "https-proxy-agent";
import FormData from "form-data";
import multer from "multer";
import fs from "fs";
import mkdirp from "mkdirp";
import formurlencoded from "form-urlencoded";

// this could also be in a ../routes dir, and perhaps it should be..

/*
const authCheck = jwt({
  secret: new Buffer("DebkoDB6ekEkd46oBQquWtPfa75RPmnASl2JnNp3Og_9m4yoTHibU7wNH3sIUcf_", "base64"),
  audience: "VyjR69cmKwBwU7GOP6bYI2szWgCS1qB2"
});
*/

const router = express.Router();
const agent = new HttpsProxyAgent("http://naproxy.gm.com:80");

const errorHandler = (res, err = null, status = 500) => {
  return res.status(status).json(err);
};

const uploadPath = "./server/tmp/uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, path.basename(file.originalname));
  }
});

const upload = multer({ storage: storage });


const removeFile = (file) => {
  fs.stat(file, (err, stats) => {
    if (err) {
      throw err;
    } else {
      fs.unlink(file, (err) => {
        if (err) {
          throw err;
        }
      });
    }
  });
};


mkdirp.sync(uploadPath);

//const access_token = "Bearer sVe4GUP7vqOuRxWLkStCcFcPEY9y42nmnGwXnSGL9h7wN4bMq5ORLW2UDy2sayMLVIBBvmt5sg7JDuEbYAivgVttrlyvO8T2s_2UmduKL6YC_o6i9P2hvYOY_XcHmsM2BAXRbnzI153241eITHBk1F3UPvbo-n2LDgRRSK_spE7HZTvMmhi9uw---uNjabuzQvtrFdVoFTnBlFUyXKi1UnIt0aJObUo_V0gVxQYoLS5S8jo6A3hJZOuSmlFXTEg9XcPbNusJgTBVyD5YbyqOTh2NxbURUrgz_8YKYU6iYHI_YPnpvDOuqN7OW9BjGZhwGt_eadLLWqT7zPmGHWX5OjMhLH1wmTAiEu4mNpU0Qm0";

// LOAD TRACKS
router.get('/tracks', (req, res, next) => {
  models.Clyp.find({})
    .then((clyps) => {
      //if (!clyps) {
      //  return errorHandler(res, { err: err }, 404);
      //}
      return res.status(200).json(clyps);
    })
    .catch((err) => {
      return errorHandler(res, { err: err }, 500);
    });
});

// UPLOAD TRACK
router.post('/upload', upload.single('audioFile'), (req, res, next) => {
  const form = new FormData();
  form.append("audioFile", fs.createReadStream(req.file.path));
  const settings = {
    //agent: agent,
    method: 'POST',
    body: form
  };

  fetch('https://upload.clyp.it/upload', settings)
    .then((response) => {
      removeFile(req.file.path);
      return response.json();
    })
    .then((track) => {
      const clyp = new models.Clyp(track);
      clyp.save()
        .then(() => {
          return res.status(200).json(clyp);
        })
        .catch((err) => {
          return errorHandler(res, { err: err}, 400);
        });
    })
    .catch((error) => {
      throw(error);
    });
});

router.delete('/tracks/:id', (req, res, next) => {
  const settings = {
    agent: agent,
    method: 'DELETE',
    body: req.body
  };

  fetch('https://api.clyp.it/', settings)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      throw(error);
    });
});


// LOGIN
router.post('/login', (req, res, next) => {
  let user = req.body;
  const settings = {
    method: 'POST',
    headers: {
      "Authorization": "Basic MjkzMTE5Og==",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formurlencoded(user)
  };

  fetch('https://api.clyp.it/oauth2/token', settings)
    .then((response) => {
      return response.json();
    })
    .then((savedUser) => {
      user = {
        email: user.username,
        access_token: savedUser.access_token,
        token_type: savedUser.token_type,
        expires_in: savedUser.expires_in,
        refresh_token: savedUser.refresh_token
      };
      models.User.update({ email: user.email }, user, { upsert: true })
        .then(() => {
          return res.status(200).json(user);
        })
        .catch((err) => {
          return errorHandler(res, { err: err}, 400);
        });
    })
    .catch((error) => {
      throw(error);
    });
});




export default router;
