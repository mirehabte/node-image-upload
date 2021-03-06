const express = require('express')
const multer = require('multer')
const ejs = require('ejs')
const path = require('path')

// Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + 
        path.extname(file.originalname));
    }
})

// Init Upload
const upload = multer({
    storage: storage
}).single('myImage')

// Init App
const app = express();

// Init ejs
app.set('view engine', 'ejs')

// Public folder
app.use(express.static('./public'))

app.get('/', (req, res) => res.render('index'))
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            res.render('index', {
                msg: err
            });
        } else {
            console.log(req.file);
            res.send('test');
        }
    })
})

const port = 4000;

app.listen(port, () => console.log(`App started on port ${port}`));