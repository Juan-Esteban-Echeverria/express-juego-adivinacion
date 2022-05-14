const express = require("express")
const app = express()

app.use(express.static(__dirname + "/assets"))

// "BASE DE DATOS" DE LOS JUGADORES
const jugadores = ["Juan", "Jocelyn", "Astrid", "Maria", "Ignacia", "Javier", "Brian"]

// RUTA DE VALIDACION DE USUARIOS
app.get("/abracadabra/juego/:usuario", (req, res, next) => {
    const esJugador = jugadores.find(jugador => jugador === req.params.usuario)
    if(!esJugador) return res.redirect("/who.jpeg")
    next()
})

// RUTA A LA PAGINA DEL JUEGO
app.get("/abracadabra/juego/:usuario", (req, res) => {
    res.sendFile(__dirname + "/assets/index.html")
})

// RUTA DE LA LISTA DE USUARIOS
app.get("/abracadabra/usuarios", (req, res) => {
    res.json({usuarios: jugadores})
})

// RUTA DE COINCIDENCIA DE NUMEROS 
app.get("/abracadabra/conejo/:n", (req, res) => {
    
    function random(min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }
    const numero = random(1, 4)
    const eleccion = req.params.n

    if(numero == eleccion) return res.redirect("/conejito.jpg")
    else return res.redirect("/voldemort.jpg")
})

// RUTA ALTERNATIVA DE PAGINA NO ENCONTRADA
app.get("*", (req, res) => {
    res.status(404).send("Esta pagina no existe")
})

// SERVIDOR EN EXPRESS
app.listen(3000, () => console.log("SERVER ON"))