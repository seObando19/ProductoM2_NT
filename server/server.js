const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.json({
        'mensaje': 'Proyecto Momento dso utilizando nodejs y mongo db'
    });
});
app.get('/database', (req, res) => {
    validarMongo().then(() => {
            res.json({
                "status": `ok`,
                "mensaje": `conectado a la BD`
            });
        })
        .catch(() => {
            res.json({
                "status": `error`,
                "mensaje": `No esta conectado a la base de datos`
            });
        });
});
app.get('/saludo/:nombre', function(req, res) {
    res.json({
        'data': `Hola ${req.params.nombre}`
    });
});

app.get('/edad/:edad', (req, res) => {

    if (Number(req.params.edad)) {
        if (req.params.edad >= 0 && req.params.edad <= 150) {
            if (Number(req.params.edad) >= 18) {
                fs.appendFile('./server/datos/edades.txt', `${(req.params.edad).toString()}-`, function(err) {
                    if (err) {
                        res.json({
                            "status": "error",
                            "message": "Lo sentimos, no eres mayor de edad"
                        });
                    } else {
                        res.json({
                            "status": "ok",
                            "message": "correcto, eres mayor de edad"
                        });
                    }
                });
            } else {
                res.json({
                    "status": "error",
                    "message": "no eres mayor de edad"
                });
            }
        } else {
            res.json({
                "status": "error",
                "message": "solo admiten valores entre el 0 y menores 150"
            });
        }
    }

});


mongoose.connect('mongodb://localhost:27017/momento2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err;
    console.log('Conectado a la DB');
});

const validarMongo = () => {
    return mongoose.connect('mongodb://localhost:27017/momento2', { useNewUrlParser: true, useUnifiedTopology: true });
}

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`servidor online en el puerto ${port}`);
});