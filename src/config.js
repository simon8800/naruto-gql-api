const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGOURL

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`));