// const { getAuth } = require("firebase-admin/auth");
import {getAuth} from "firebase-admin/auth"
const admin = require("firebase-admin");
const credentials = require("../../AccountKey.json");

const firebase = admin.initializeApp({
    credential: admin.credential.cert(credentials),
  });

const auth = getAuth(firebase);

export default auth;