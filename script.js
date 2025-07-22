// Credenciales simuladas
const ADMIN_CREDENTIALS = {
  usuario: "admin",
  contrasena: "1234"
};

// Login
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const user = document.getElementById('adminUser').value.trim();
  const pass = document.getElementById('adminPass').value.trim();
  const alert = document.getElementById('loginAlert');

  if (user === ADMIN_CREDENTIALS.usuario && pass === ADMIN_CREDENTIALS.contrasena) {
    document.getElementById('loginSection').classList.add('hidden');
    document.getElementById('productSection').classList.remove('hidden');
  } else {
    alert.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Usuario o contraseña incorrectos.
      </div>`;
  }
});

// Subida de producto
document.getElementById('productForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const categoria = document.getElementById('categoria').value.trim();
  const precio = parseFloat(document.getElementById('precio').value);
  const descripcion = document.getElementById('descripcion').value.trim();
  const imagenes = document.getElementById('imagenes').files;
  const alert = document.getElementById('productAlert');

  // Validaciones
  if (!nombre || !categoria || !descripcion || isNaN(precio) || imagenes.length === 0) {
    alert.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Todos los campos son obligatorios.
      </div>`;
    return;
  }

  if (imagenes.length > 3) {
    alert.innerHTML = `
      <div class="alert alert-warning" role="alert">
        Solo puedes subir hasta 3 imágenes.
      </div>`;
    return;
  }

  // Simular ruta de imágenes como nombres (se asume que ya están subidas o se subirán)
  const imagenesArray = Array.from(imagenes).map(img => img.name);

  // Crear objeto del producto
  const producto = { nombre, categoria, precio, descripcion, imagenes: imagenesArray };

  // Enviar a backend
  fetch('https://formproductos.onrender.com/guardar-producto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  })
    .then(res => res.json())
    .then(data => {
      alert.innerHTML = `
        <div class="alert alert-success" role="alert">
          ${data.mensaje}
        </div>`;
      document.getElementById('productForm').reset();
    })
    .catch(err => {
      console.error(err);
      alert.innerHTML = `
        <div class="alert alert-danger" role="alert">
          Error al guardar el producto.
        </div>`;
    });
});
