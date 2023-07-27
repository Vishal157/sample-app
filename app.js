const express = require("express")
const app = express()
const path = require("path")
let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sample'
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
  });

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/templates'))

app.get('/edit.html', (req,res) => {
    res.render('edit')
})
app.get('/index.html', async (req,res) => {
    connection.query('SELECT * FROM Invoice', (error, results) => {
        if (error) throw error  
        res.render('index' , results)
    })
})
app.get('/invoice.html', (req, res) => {
    res.render('invoice')
})
app.get('/model.html', (req, res) => {
    res.render('model')
})
app.get('/new.html', (req, res) => {
    res.render('new')
})
app.get('*', (req,res) => {
    res.render('index')
})

app.listen(3000, () => {
    console.log("Running on port 3000...")
})

