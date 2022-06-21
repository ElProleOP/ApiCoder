import express from "express";
const app = express();
import Contenedor from "./index.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1 style='color: blue'>Bienvenidos al servidor express</h1>");
});

const productos = new Contenedor("./products.json")

app.get("/api/productos", (req, res) => {
  const arr = productos.getAll();
  res.send(`${arr}`);
});

app.get("/api/productos/:id", (req, res) => {
  const id = req.params.id;
  res.send(`${productos.getbyid(id)}`);
});

app.post("api/productos", (req,res) =>{
  const prod = req.body.prod;
  prod = productos.save(prod);
  res.send(prod.id);
});

app.put("api/productos/:id", (req,res) =>{
  const id = req.params.id;
  const prod = productos.getbyid(id);
  const prodreemplazo = Object.assign(prod, req.body.prod);
  res.json({productoanterior: prod, productonuevo : prodreemplazo})
})

app.delete("api/productos/:id", (req,res)=>{
  const id = req.params.id;
  productos.deleteById(id);
  res.json({result: "Eliminado"})
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto 8080`);
});
