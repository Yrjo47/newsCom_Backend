const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const mysql = require('mysql');
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'udjwkyvfzwkmhnnh',
    host: 'bdgqhpsyuk8yrmnepo8z-mysql.services.clever-cloud.com',
    password: 'l55ejIEDc2LSuTqXKSqM',
    database: 'bdgqhpsyuk8yrmnepo8z'
});

app.post('/feedback', (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const email = req.body.email;

    console.log(req.body);

    db.query('INSERT INTO feedback (name, address, email) VALUES (?, ?, ?)', [name, address, email], (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send('Values inserted');
        }
    }); 
});

app.get('/feedback', (req, res) => {
    db.query('SELECT * FROM feedback', (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/news', (req, res) => {
    db.query('SELECT * FROM news', (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/homeNews', (req, res) => {
    db.query('SELECT * FROM news ORDER BY id DESC LIMIT 3;', (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


app.listen(port, () => {
    console.log(`The app listening on port ${port}`);
});