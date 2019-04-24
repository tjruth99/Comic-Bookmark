// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

const cors = require('cors')({ origin: true });
//var express = require('express')
//var cors = require('cors')
//var app = express()
//app.use(cors())

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

/*
res.set('Access-Control-Allow-Origin', "*")
res.set('Access-Control-Allow-Methods', 'GET, POST')
res.status(200).send('smile');

*/

// Function: addUserToDatabase
// parameters:
//    userID: random string for given user
//    username:  user given name for their account
// Add a new document to the users collection with a key of userID and a field username
exports.addUserToDatabase = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const userID = req.body.userID;
    const user = req.body.username;

    console.log("userID: " + userID);
    console.log("user: " + user);

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
      username: user
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });

    // Add subCollection to users collection
    db.collection("users").doc(userID).collection("Reading");

    console.log('User added to username and users db');
  })
});

// Function: getUserFromID
// parameters:
//    userID
// Gets the username from users collection
exports.getUserFromID = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const userID = req.body.userID;
    
    if(userID == null){
      console.log("getUserFromID userID null");
    }

    //get username
    db.collection("users").doc(userID).get().then(doc => {
      res.send(doc.data().username.toString());
    }).catch(function(error){
      console.error("Error getting username from users collection: ", error);
      throw new Error(error.message);
    });
  
  })
});

// Function: getIDFromUser
// parameters:
//    username
// Gets the userID from usernames collection
exports.getIDFromUser = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const user = req.body.username;

    if(user == null){
      console.log("getUserFromID userID null");
    }

    db.collection("usernames").doc(user).get().then(doc => {
      res.send(doc.data().userID.toString());
    }).catch(function(error){
      console.error("Error getting userID from usernames collection: ", error);
      throw new Error(error.message);
    });

  })
});

// Function: startReading
// parameters:
//    userID: random string for given user
//    seriesName: name of the series to add to the user's document
// Adds a new map to the array "Reading" in the given userID document
// The field should be seriesName and the value should be 1
exports.startReading = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const userID = req.body.userID;
    const seriesName = req.body.seriesName;

    db.collection("users").doc(userID).collection("Reading").doc(seriesName).set({
      seriesName: seriesName,
      currentIssue: 1
    }).catch(function(error) {
      console.error("Error writing into subCollection: ", error);
    });

    console.log('Started series ' + seriesName);
  })
});

// Function: nextIssue
// parameters:
//    userID: random string for given user
//    seriesName: name of the series to add to the user's document
// Goes to "Reading" field in the user's document and increments the current issue for the given seriesName
exports.nextIssue = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const userID = req.body.userID;
    const seriesName = req.body.seriesName;

    db.collection("users").doc(userID).collection("Reading").doc(seriesName).update({
      //try to increment issue
      currentIssue: admin.firestore.FieldValue.increment(1)
    }).catch(function(error) {
      console.error("Error incrementing issue ", error);
    });
  })
});

// Function: prevIssue
// parameters:
//    userID: random string for given user
//    seriesName: name of the series to add to the user's document
// Goes to "Reading" field in the user's document and decrements the current issue for the given seriesName
exports.prevIssue = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const userID = req.body.userID;
    const seriesName = req.body.seriesName;

    db.collection("users").doc(userID).collection("Reading").doc(seriesName).update({
      //try to increment issue
      currentIssue: admin.firestore.FieldValue.increment(-1)
    }).catch(function(error) {
      console.error("Error decrementing issue ", error);
    });
  })
});

// Function: getIssueFromSeries
// parameters:
//    seriesName: name of the series
//    issueNumber: index of the issue to get from the series
// Gets the ith issue from the seriesName.
exports.getIssueFromSeries = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const seriesName = req.body.seriesName;
    const issueNumber = req.body.issueNumber;

    if(seriesName == null || issueNumber == null){
      console.log("getIssueFromSeries null err");
    }

    //should get the issue number index from issues
    db.collection("comics").doc(seriesName).get().then(doc => {
      res.send(doc.data().issues[issueNumber]);
    }).catch(function(error){
      console.error("Error getting indexed issue: ", error);
      throw new Error(error.message);
    });

  })
});

// Function: getUserReadings
// parameters:
//    userID
// Returns an array of objects that contain the seriesName, and current issue for each series that the given user is reading
exports.getIssueFromSeries = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
      const userID = req.body.userID;

  })
});
