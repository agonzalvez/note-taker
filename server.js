const express = require('express');
const path = require('path');
const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.post('/api/notes', (req, res) => {
    var notes;
    var note = req.body;
    fs.readFile('db/db.json', 'utf8', (error, data) => {
        error ? console.error(error) : notes = JSON.parse(data);
        //console.log(notes);
        notes.push(note);
        fs.writeFile('db/db.json', JSON.stringify(notes), (err) =>
            err ? console.error(err) : res.json(notes)
        );
    }
    );
});

app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname,'./db/db.json'), (err, data) => {
        if(err) {
            res.status(500);
        }
        res.json(JSON.parse(data));
    });
});


app.delete('/api/notes/:id', (req, res) => {
    var notes;
    fs.readFile('db/db.json', 'utf8', (error, data) => {
        error ? console.error(error) : notes = JSON.parse(data);
        notes.splice(req.params.id, 1);
        fs.writeFile('db/db.json', JSON.stringify(notes), (err) =>
            err ? console.error(err) : res.json(notes)
        );
    }
    );
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));