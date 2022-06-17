const express = require("express");
const app = express();
const fs = require('fs');
import Contenedor from "./index"

app.get("/", (req, res) => {
  res.send("<h1 style='color: blue'>Bienvenidos al servidor express</h1>");
});

const productos = new Contenedor("./products.json");

app.get("/api/productos", (req, res) => {
  let arr = productos.getAll();
  res.send(`${arr}`);
});

app.get("/api/productos/:id", (req, res) => {
  const id = req.params.id;
  res.json(productos.getbyid(id));
});


const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto 8080`);
});
