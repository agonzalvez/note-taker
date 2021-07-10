const express = require('express');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3001;

const fs = require('fs');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
});