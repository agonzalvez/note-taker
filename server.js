const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const apiRoutes = require('./routes/apiRoutes');
const indexRoutes = require('./routes/indexRoutes');

// const fs = require('fs');


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use('/api',apiRoutes);
app.use('/', indexRoutes);



app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
});