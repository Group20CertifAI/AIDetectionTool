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
    res.sendFile(__dirname + '/signup.html');
}
);

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
}
);

app.post('/logout', (req, res) => {
    res.send('Logout');
}
);

app.post('/forgot-password', (req, res) => {
    res.send('Forgot Password');
}
);

app.post('/reset-password', (req, res) => {
    res.send('Reset Password');
}
);

//home page
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/home.html');
}
);

//profile page
app.get('/profile', (req, res) => {
    res.sendFile(__dirname + '/profile.html');
}
);

//settings page
app.get('/settings', (req, res) => {
    res.sendFile(__dirname + '/settings.html');
}
);

//text detection page
app.get('/text-detection', (req, res) => {
    res.sendFile(__dirname + '/text-detection.html');
}
);

//image detection page
app.get('/image-detection', (req, res) => {
    res.sendFile(__dirname + '/image-detection.html');
}
);


//audio detection page
app.get('/audio-detection', (req, res) => {
    res.sendFile(__dirname + '/audio-detection.html');
}
);


