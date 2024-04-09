//inicializando un servidor con Express
const express = require("express");
const app = express();
const path = require("path");

// Arreglo usuarios alojado en el servidor
const usuarios = [ "Juan", "Jocelyn", "Astrid", "Maria", "Ignacia", "Javier", "Brian"];

//Configurar el servidor para servir archivos estáticos desde la carpeta 'assets'
app.use(express.static(path.join(__dirname, "assets")));

// JSON con un arreglo de nombres alojado en el servidor
app.get("/abracadabra/usuarios", (req, res) => {
  //Muestra los datos del arreglo usuarios
  res.send(usuarios);
});

// Middleware
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
const usuario = req.params.usuario;
// Verifica que el usuario escrito como parámetro existe en el arreglo alojado en el servidor
usuarios.includes(usuario)
  // Si el nombre se encuentra en el arreglo, ejecuta next()
  ? next()
  // Si el nombre no se encuentra en el arreglo, hará una pregunta
  :res.send(
    "<center><h1 style=color:blue>¿Quién eres? 🤔 </h1><br><img src=/who.jpeg /></center>"
  );
});

// Si el usuario existe en el arreglo de nombres, permite el paso a la ruta GET
app.get("/abracadabra/juego/:usuario", (req, res) => {
  // Muestra la pagina del juego Abracadabra
  res.sendFile(__dirname + "/index.html");
});

// Devolver la foto del conejo o de Voldemort
app.get("/abracadabra/conejo/:numero", (req, res) => {
  const n = Math.floor(Math.random() * (5 - 1)) + 1;

  const numero = req.params.numero;

  if (numero == n) {
    res.send(
        "<center><h1 style=color:green>Hoy estás de suerte &#128526 </h1><br><img src=/conejito.jpg /></center>")
  } else {
    res.send(
        "<center><h1 style=color:red>Buena suerte para la próxima... </h1><br><img src=/voldemort.jpg /></center>")
  }
});

//Crear un servidor con Express en el puerto 3000
app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});

// Rutas genéricas
app.get("*", (req, res) => {
  res.send(
    "<center><h1 style=color:red>Esta página no existe... 👻 </h1><br><iframe src=https://giphy.com/embed/2A75RyXVzzSI2bx4Gj width= 480 height= 480 frameBorder=0 class=giphy-embed allowFullScreen></iframe><p><a href= https://giphy.com/gifs/hallmarkecards-cute-hallmark-shoebox-2A75RyXVzzSI2bx4Gj >via GIPHY</a></p></center>"
  );
});