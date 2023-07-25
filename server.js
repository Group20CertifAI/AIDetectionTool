require('dotenv').config();
const express = require('express');
const firebase = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const app = express();
const port = process.env.PORT || 3000;

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = firebase.firestore();

// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

app.get('/', (req, res) => {
// send index.html to start client side
    res.sendFile(__dirname + '/index.html');
});

app.get('/signup', (req, res) => {
    res.send('Signup');
}
);

app.get('/login', (req, res) => {
    res.send('Login');
}
);

app.get('/logout', (req, res) => {
    res.send('Logout');
}
);

app.get('/forgot-password', (req, res) => {
    res.send('Forgot Password');
}
);

app.get('/reset-password', (req, res) => {
    res.send('Reset Password');
}
);

//home page
app.get('/home', (req, res) => {
    res.send('Home');
}
);

//profile page
app.get('/profile', (req, res) => {
    res.send('Profile');
}
);

//settings page
app.get('/settings', (req, res) => {
    res.send('Settings');
}
);

//text detection page
app.get('/text-detection', (req, res) => {
    res.send('Text Detection');
}
);

//image detection page
app.get('/image-detection', (req, res) => {
    res.send('Image Detection');
}
);


//audio detection page
app.get('/audio-detection', (req, res) => {
    res.send('Audio Detection');
}
);


