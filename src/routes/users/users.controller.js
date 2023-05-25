require("dotenv").config();
const axios = require("axios");
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const appFire = initializeApp(firebaseConfig);
const auth = getAuth(appFire);

async function httpSignUp(req, res) {
  try {
    const { email, password } = req.body;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    res.send(user);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
  }
}

async function httpLogin(req, res) {
  try {
    const { email, password } = req.body;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // res.send("logged In");
    res.redirect("/")
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // console.log({ errorCode, errorMessage });

    req.flash(`error_msg`, `Login failed check email or password`);
    res.redirect('/users/login');
  }
}

async function renderLogin(req,res){
  try{
    res.render("login.hbs")
  }catch(e){
    console.log(e)
    
  }
}

async function protected(req,res){
  try{
// This route is protected and will only be accessible if the user is authenticated
const user = req.user; // Access the authenticated user object

res.send(`Protected route accessed successfully by user: ${user.email}`);
  }catch(e){
    console.log(e)
  }
}


async function logout(req,res){
  auth.signOut()
    .then(() => {
      // res.send("Logged out successfully");
      res.redirect("/users/login")
    })
    .catch((error) => {
      console.log("Logout error:", error);
      res.status(500).send("Failed to logout");
    });
}


function isAuthenticated(req, res, next) {
  const user = auth.currentUser; // Get the current user from Firebase Authentication

  if (user) {
    req.user = user; // Attach the user object to the request for further use in the route handlers
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    res.status(401).redirect("/users/login"); // User is not authenticated, send 401 Unauthorized status
  }
}

module.exports = { httpLogin, httpSignUp ,logout, renderLogin ,protected,isAuthenticated};
