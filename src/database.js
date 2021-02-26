const mongoose = require('mongoose');

const {DB_HOST,DB_NAME} = process.env;

const DB_URI = `mongodb://${DB_HOST}/${DB_NAME}`;

mongoose.connect(DB_URI,{
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log('db is connected'))
.catch(err => console.log(err));