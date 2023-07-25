require('dotenv').config();
const express = require('express');
const firebase = require('firebase-admin');
const { spawn } = require('child_process');
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

app.use(express.static('public'))

app.get('/', (req, res) => {
// send index.html to start client side
    res.sendFile(__dirname + '/index.html');
});

app.get('/index.html', (req, res) => {
    // send index.html to start client side
        res.redirect('/');
    });

app.get('/signup.html', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
}
);

app.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    
    //sign user up in firebase auth and create a directory for them in firestore and storage
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
        res.redirect('/home');
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}
);


app.get('/login.html', (req, res) => {
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
app.post('/text-detection', (req, res) => {
    res.sendFile(__dirname + '/text-detection.html');
}
);

//image detection page
app.post('/image-detection', (req, res) => {
    res.sendFile(__dirname + '/image-detection.html');
}
);


//audio detection page
app.post('/audio-detection', (req, res) => {
    res.sendFile(__dirname + '/audio-detection.html');
}
);

app.get('results', (req, res) => {
    res.sendFile(__dirname + '/results.html');
}
);

