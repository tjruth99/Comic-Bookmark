// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
var db = admin.firestore();

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
  const userID = req.body.userID;
  const user = req.body.username;

  if(userID == null){
    console.log("addUserToDatabase userID null");
  }
  
  // Add a new document in usernames collection
  db.collection("usernames").doc(user).set({
    userID: userID
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });

  // Add a new document to users collection
  db.collection("users").doc(userID).set({
    username: user,
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });

  // Add subCollection to users collection
  db.collection("users").doc(userID).collection("Reading");

  console.log('User added to username and users db');
});

// Function: startReading
// parameters:
//    userID: random string for given user
//    seriesName: name of the series to add to the user's document
// Adds a new map to the array "Reading" in the given userID document
// The field should be seriesName and the value should be 1
exports.startReading = functions.https.onRequest((req, res) => {
  const userID = req.body.userID;
  const seriesName = req.body.seriesName;

  db.collection("users").doc(userID).collection("Reading").doc(seriesName).set({
    seriesName: seriesName,
    currentIssue: 1
  }).catch(function(error) {
    console.error("Error writing into subCollection: ", error);
  });

  console.log('Started series ' + seriesName);
});

// Function: nextIssue
// parameters:
//    userID: random string for given user
//    seriesName: name of the series to add to the user's document
// Goes to "Reading" field in the user's document and increments the current issue for the given seriesName
exports.nextIssue = functions.https.onRequest((req, res) => {
  const userID = req.body.userID;
  const seriesName = req.body.seriesName;

  db.collection("users").doc(userID).collection("Reading").doc(seriesName).update({
    //try to increment issue
    currentIssue: admin.firestore.FieldValue.increment(1)
  }).catch(function(error) {
    console.error("Error incrementing issue ", error);
  });

});

// Function: prevIssue
// parameters:
//    userID: random string for given user
//    seriesName: name of the series to add to the user's document
// Goes to "Reading" field in the user's document and decrements the current issue for the given seriesName
exports.prevIssue = functions.https.onRequest((req, res) => {
  const userID = req.body.userID;
  const seriesName = req.body.seriesName;

  db.collection("users").doc(userID).collection("Reading").doc(seriesName).update({
    //try to increment issue
    currentIssue: admin.firestore.FieldValue.increment(-1)
  }).catch(function(error) {
    console.error("Error decrementing issue ", error);
  });
  
});
