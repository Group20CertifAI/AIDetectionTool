const express = require('express');
// const bodyParser = require('body-parser');




const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
const port = process.env.PORT || 3000;



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


app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});



app.get('/login', (req, res) => {
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
    res.sendFile(__dirname + '/public/results.html');
}
);

