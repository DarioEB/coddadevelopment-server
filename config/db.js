const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const connection = async () => {
    try {   
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Bases de datos conectada');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connection;