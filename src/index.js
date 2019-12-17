require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json()); 
app.use(authRoutes);
//Enter mongodb info
const mongoUri = ''
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
});

mongoose.connection.on('connected', () =>{
    console.log('Connected to mongoDB')
});

mongoose.connection.on('error', (err) => {
    console.error('Error connection to mongo', err)
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email is ${req.user.email}`)
});

app.listen(3000, () => {
    console.log('Listening on 3000')
});