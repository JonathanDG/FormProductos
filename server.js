import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

// PERMITIR ACCESO DESDE GITHUB PAGES
app.use(cors({
  origin: 'https://jonathandg.github.io'  // reemplaza por tu dominio real de GitHub Pages si es diferente
}));

app.use(express.json());

// Ruta para guardar producto
app.post('/guardar-producto', (req, res) => {
  const nuevoProducto = req.body;

  fs.readFile('./catalogo.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'No se pudo leer el archivo' });

    let productos = JSON.parse(data);
    productos.push(nuevoProducto);

    fs.writeFile('./catalogo.json', JSON.stringify(productos, null, 2), err => {
      if (err) return res.status(500).json({ error: 'No se pudo guardar el producto' });
      res.json({ mensaje: 'Producto guardado con éxito' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
