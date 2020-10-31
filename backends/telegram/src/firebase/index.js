"use strict";
var _a;
exports.__esModule = true;
exports.admin = exports.firestore = void 0;
var admin = require("firebase-admin");
exports.admin = admin;
var serviceAccount = require((_a = process.env.GOOGLE_APPLICATION_CREDENTIALS) !== null && _a !== void 0 ? _a : '');
var app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var firestore = admin.firestore(app);
exports.firestore = firestore;
