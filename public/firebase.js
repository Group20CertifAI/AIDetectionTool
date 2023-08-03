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

// Get all elements
const loginButtons = document.getElementsByClassName('login');
const signupButtons = document.getElementsByClassName('signup');
const signoutButtons = document.getElementsByClassName('signout');
const userInfo = document.getElementById('user-info');

// Function to display or hide elements
const displayElements = (elements, display) => {
  Array.from(elements).forEach(element => {
    element.style.display = display;
  });
}

// Auth state listener to get user info and update UI accordingly
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    displayElements(loginButtons, 'none');
    displayElements(signupButtons, 'none');
    displayElements(signoutButtons, 'block');
    userInfo.textContent = `Signed in as ${user.email}`;
  } else {
    // No user is signed in.
    displayElements(loginButtons, 'block');
    displayElements(signupButtons, 'block');
    displayElements(signoutButtons, 'none');
    userInfo.textContent = '';
  }
});

// Function to sign out
const signOut = async (event) => {
  event.preventDefault();
  try {
    await firebase.auth().signOut();
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

// Add event listeners to sign out buttons
Array.from(signoutButtons).forEach(button => {
  button.addEventListener('click', signOut);
});
