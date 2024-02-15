const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
//postgres imports and settings
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
});

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.json({info: 'Node.js, Express and Postgres API'})
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});