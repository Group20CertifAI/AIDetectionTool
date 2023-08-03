const express = require('express');
const app = express();
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

app.post('/results', (req, res) => {
    res.sendFile(__dirname + '/public/results.html');
}
);

