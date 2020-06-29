const express = require('express');
const app = express();
const productRoute = require('./router');
const PORT = Number(process.env.PORT || 4000);

const dbConfig = require('./config/Db');
//for handling incoming data
const bodyParser = require('body-parser');
//db ref
const mongoose = require('mongoose');
//cors => cross Origin resource sharing effect
const cors = require('cors');

//config of body-parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
//db connections
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.DB, { useNewUrlParser: true}).then(
    (res) => {
        console.log('database succesfully connected');
    },
    (err) => {
        console.log(err);
    }
);

app.set('view engine', 'pug');
app.set('views', './views');

//config cors
app.use(cors());
app.use('/', productRoute);

app.listen(PORT, ()=> {
    console.log(`server is running in http://localhost:${PORT}`);
});
