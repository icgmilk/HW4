const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/fruits.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

app.get('/:fruit/:year', (req, res) => {
    const fruit = req.params.fruit;
    const year = req.params.year;

    const query = `SELECT Date, TotalAveragePrice FROM ${fruit.charAt(0).toUpperCase() + fruit.slice(1)} WHERE Date LIKE ?`;
    db.all(query, [`${year}%`], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

module.exports = app;
