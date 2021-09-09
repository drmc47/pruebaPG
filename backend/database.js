require('dotenv').config();
const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;
const mongoose = require("mongoose");


const uri = `mongodb+srv://NTF_Marketplace:eneefete1234@cluster0.s7ssg.mongodb.net/henry?retryWrites=true&w=majority`;
const db = mongoose.connection;

mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
})

db.once('open', _=> {
        console.log('Database is connected successfully');
})

db.on('error', err => {
        console.log(err);
})

