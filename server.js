const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load env
dotenv.config({ path: './config.env' })

const app = express();

// Profile routes
app.use('/api/v1/profile', require('./routes/profile')); 

//Handle Production
if(process.env.NODE_ENV === 'production') {
    // Set up static folder
    app.use(express.static(__dirname + '/public/'))

    // Handle SPA
    app.get(/.*/, (req,res) => res.sendFile(__dirname + '/public/index.html'))
}

// Dev logging
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server listening on ${process.env.NODE_ENV}  mode on ${port}`)
})