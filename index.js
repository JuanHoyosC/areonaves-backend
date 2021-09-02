require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();


//middleware
app.use(cors());
app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/admin.route'));
app.use('/api/areonave', require('./routes/areonave.route'));


app.listen('3000', () => {
    console.log('server corriendo en el puerto 3000')
})