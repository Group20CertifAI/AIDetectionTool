// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmbhXwRTMiyXl_y1wrPnOY-mipeAMi8T0",
  authDomain: "certifai-8afc6.firebaseapp.com",
  projectId: "certifai-8afc6",
  storageBucket: "certifai-8afc6.appspot.com",
  messagingSenderId: "1073534950411",
  appId: "1:1073534950411:web:400de3999bd7730c353b0e",
  measurementId: "G-BXVF3JMY0N"
  };

// Initialize Firebase
const initializeFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

initializeFirebase();


const signOutButton = document.getElementById('signout');
const userInfo = document.getElementById('user-info');



signOutButton.addEventListener('click', async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.log('Error signing out:', error);
  }
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    signInForm.style.display = 'none';
    signOutButton.style.display = 'block';
    userInfo.textContent = `Signed in as ${user.email}`;
  } else {
    signInForm.style.display = 'block';
    signOutButton.style.display = 'none';
    userInfo.textContent = '';
  }
});
//   Auth state listener to get user info and update UI accordingly
firebase.auth().onAuthStateChanged((user) => {
var login = document.getElementById('login');
var signup = document.getElementById('signup');
var signout = document.getElementById('signout');

if (user) {
// User is signed in.
login.style.display = 'none';
signup.style.display = 'none';
signout.style.display = 'block';
} else {
// No user is signed in.
login.style.display = 'block';
signup.style.display = 'block';
signout.style.display = 'none';
}
});

document.getElementById('signout').addEventListener('click', (event) => {
event.preventDefault();
firebase.auth().signOut().then(() => {
console.log('User signed out');
}).catch((error) => {
console.error('Error signing out:', error);
});
});

