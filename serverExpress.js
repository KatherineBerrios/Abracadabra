//inicializando un servidor con Express
const express = require("express");
const app = express();
const path = require("path");

//Configurar el servidor para servir archivos estáticos desde la carpeta 'assets'
app.use(express.static(path.join(__dirname, "assets")));

// JSON con un arreglo de nombres alojado en el servidor
app.get("/abracadabra/usuarios", (req, res) => {
  const usuario = {
    usuarios: [ "Juan", "Jocelyn", "Astrid", "Maria", "Ignacia", "Javier", "Brian"] };
  res.send(usuario);
});

// Middleware
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
  // Validaciones
  // const Auth = req.header("Authorization");
  // console.log(Auth);

const usuario = req.params.usuario;
  usuario
    ? // Si la constante es verdadera, ejecuta next()
      next()
    : // Si la constante no es verdadera, hará una pregunta
      res.send("<center><img src=/who.jpeg /></center>");
});

app.get("/abracadabra/juego/:usuario", (req, res) => {
  // Paso 5
  const usuario = req.params.usuario;
  usuario
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
    "<center><h1 style=color:red>Esta página no existe... ☹ </h1><br><iframe src=https://giphy.com/embed/2A75RyXVzzSI2bx4Gj width= 480 height= 480 frameBorder=0 class=giphy-embed allowFullScreen></iframe><p><a href= https://giphy.com/gifs/hallmarkecards-cute-hallmark-shoebox-2A75RyXVzzSI2bx4Gj >via GIPHY</a></p></center>"
  );
});