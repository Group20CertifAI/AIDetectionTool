require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const serviceAccount = require('./serviceAccountKey.json');

const { spawn } = require('child_process');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const fireadmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.firestore();

// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/index.html', (req, res) => {
    res.redirect("/");
});


app.get('/signup.html', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    admin.auth().createUser({
        email: email,
        password: password,
        disabled: false
    })
    .then(userRecord => {
        console.log('Successfully created new user:', userRecord.uid);
        db.collection('users').doc(userRecord.uid).set({
            email: email,
            created: new Date().toISOString()
        })
        .then(() => {
            console.log('User added to Firestore');
            res.status(200).send('Successfully created new user and added to Firestore: ' + userRecord.uid);
        })
        .catch((error) => {
            console.log('Error adding user to Firestore: ', error);
            res.status(400).send('Error adding user to Firestore: ' + error);
        })
    })
    .catch((error) => {
        console.log('Error creating new user:', error);
        res.status(400).send('Error creating new user: ' + error);
    });
});

app.get('/login.html', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/logout', (req, res) => {
    res.send('Logout');
});

app.post('/forgot-password', (req, res) => {
    res.send('Forgot Password');
});

app.post('/reset-password', (req, res) => {
    res.send('Reset Password');
});



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
    //use python script to detect ai generated text
    console.log(req.body.sentence);
    const pythonProcess = spawn('python3', ['./GPTZero-main/infer.py', req.body.sentence]);
    pythonProcess.stdout.on('data', (data) => {
      res.send(data.toString());
    });
    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    pythonProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      res.redirect('/results');
    });
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

app.get('/results', (req, res) => {
    res.sendFile(__dirname + '/results.html');
}
);

