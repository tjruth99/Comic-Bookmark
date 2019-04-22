// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.test = functions.https.onRequest((req, res) => {
  console.log("Test Function");
  res.send("Test Function");
});

// Function: addUserToDatabase
// parameters:
//    userID: random string for given user
//    username:  user given name for their account
// Add a new document to the users collection with a key of userID and a field username
exports.addUserToDatabase = functions.https.onRequest((req, res) => {

});

// Function: startReading
// parameters:
//    userID: random string for given user
//    seriesName: name of the series to add to the user's document
// Adds a new map to the array "Reading" in the given userID document
// The field should be seriesName and the value should be 1
exports.startReading = functions.https.onRequest((req, res) => {

});

// Function: nextIssue
// parameters:
//    userID: random string for given user
//    seriesName: name of the series to add to the user's document
// Goes to "Reading" field in the user's document and increments the current issue for the given seriesName
exports.nextIssue = functions.https.onRequest((req, res) => {

});

// Function: prevIssue
// parameters:
//    userID: random string for given user
//    seriesName: name of the series to add to the user's document
// Goes to "Reading" field in the user's document and decrements the current issue for the given seriesName
exports.prevIssue = functions.https.onRequest((req, res) => {

});
