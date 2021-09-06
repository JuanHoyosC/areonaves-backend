require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();


//middleware
app.use(cors());
app.use(express.json());
app.set('port', process.env.PORT || 3000)


//rutas
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/areonave', require('./routes/areonave.route'));
app.use('/api/usuario', require('./routes/usuario.route'));
app.get('/', (req, res) => res.send('Hola'))

app.listen(app.get('port'), () => {
    console.log('server corriendo en el puerto', app.get('port'))
})