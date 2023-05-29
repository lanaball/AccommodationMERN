const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User.js');

// express app
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);


// middleware
app.use(express.json());
app.use(cors());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });


// routes ---------
app.get('/', (req, res, next) => {
    res.json({ mssg: 'test ok we work ok we work we work we work' })
});



// -------- register -------
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userDoc = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.status(200).json(userDoc)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// -------- login -------
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        // res.json('found');
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            res.json('password ok');
        } else {
            res.json('pass no ok')
        }
    } else {
        res.json('not found');
    }
})


// connect to MongoDB and listen to requests
mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to mongodb and listening on port:      ' + process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })