document.addEventListener('DOMContentLoaded', () => {
  renderizarBiblioteca();
});

function renderizarBiblioteca() {
  const container = document.getElementById('biblioteca-container');
  if (!container) return;

  const usuario = obtenerUsuarioActual();

  // Si no está logueado: no se muestra contenido y bloquea el acceso
  if (!usuario) {
    container.innerHTML = `
      <div class="login-card text-center mx-auto my-5">
        <i class="fa-solid fa-lock text-white fs-1 mb-3" style="color: #c026d3 !important;"></i>
        <h3 class="fw-bold mb-2 text-white">Acceso restringido</h3>
        <p class="text-secondary small mb-4">Debes iniciar sesión para acceder a tu biblioteca digital, historial de lectura y lista de deseos.</p>
        <a href="login.html" class="btn-mf-primary text-decoration-none d-inline-block">
          <i class="fa-solid fa-right-to-bracket me-2"></i>Iniciar sesión
        </a>
      </div>
    `;
    return;
  }

  // Si está logueado: renderiza la biblioteca
  container.innerHTML = `
    <h1 class="fw-bold mb-2 text-white">Mi Biblioteca Digital</h1>
    <p class="text-secondary mb-4">Bienvenido, ${usuario.nombre}. Aquí están tus tomos comprados.</p>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col">
        <div class="card-panel p-3">
          <h5 class="text-white fw-bold">One Piece - Tomo 1</h5>
          <p class="text-secondary small">Digital · Lectura disponible</p>
          <button class="btn-mf-primary btn-sm w-100 mt-2">Leer ahora</button>
        </div>
      </div>
    </div>
  `;
}