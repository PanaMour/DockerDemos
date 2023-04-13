const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
    res.render('index', { inputText: '' });
});

app.post('/', upload.single('input_file'), (req, res) => {
    const filePath = req.file.path;
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading file');
        } else {
            res.render('index', { inputText: data });
            fs.unlink(filePath, (err) => {
                if (err) console.error(err);
            });
        }
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
