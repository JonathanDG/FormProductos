const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'catalogo.json');

app.use(cors());
app.use(bodyParser.json());

// Crear el archivo si no existe
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, '[]', 'utf8');
}

// Ruta para guardar producto
app.post('/guardar-producto', (req, res) => {
  const nuevoProducto = req.body;

  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ mensaje: 'Error leyendo el archivo' });

    let productos = [];

    try {
      productos = JSON.parse(data);
    } catch {
      return res.status(500).json({ mensaje: 'Error al parsear JSON' });
    }

    productos.push(nuevoProducto);

    fs.writeFile(FILE_PATH, JSON.stringify(productos, null, 2), (err) => {
      if (err) return res.status(500).json({ mensaje: 'Error al guardar producto' });

      res.json({ mensaje: 'Producto guardado exitosamente' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
