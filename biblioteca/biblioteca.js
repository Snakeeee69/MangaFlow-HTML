const paginasOnePiece = [
  '../caps/pagina1.png',
  '../caps/pagina2.png',
  '../caps/pagina3.png',
  '../caps/pagina4.png',
  '../caps/pagina5.png',
  '../caps/pagina6.png'
];

let paginaActualIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  renderizarBiblioteca();
  inicializarTecladoLector();
});

function obtenerUsuario() {
  if (typeof obtenerUsuarioActual === 'function') {
    return obtenerUsuarioActual();
  }
  return JSON.parse(localStorage.getItem('usuarioLogueado')) || { nombre: 'Usuario Demostración', email: 'demo@duoc.cl' };
}

function renderizarBiblioteca() {
  const container = document.getElementById('biblioteca-container');
  if (!container) return;

  const usuario = obtenerUsuario();

  if (!usuario) {
    container.innerHTML = `
      <div class="login-card text-center mx-auto my-5 p-5 rounded-4" style="background: #12131f; max-width: 500px; border: 1px solid #3b1754;">
        <i class="fa-solid fa-lock text-white fs-1 mb-3" style="color: #c026d3 !important;"></i>
        <h3 class="fw-bold mb-2 text-white">Acceso restringido</h3>
        <p class="text-secondary small mb-4">Debes iniciar sesión para acceder a tu biblioteca digital, historial de lectura y tomos adquiridos.</p>
        <a href="../login.html" class="btn px-4 py-2 text-white fw-bold d-inline-block" style="background: #c800ff; border-radius: 8px; text-decoration: none;">
          <i class="fa-solid fa-right-to-bracket me-2"></i>Iniciar sesión
        </a>
      </div>
    `;
    return;
  }

  const svgFallback = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='280' viewBox='0 0 200 280'><rect width='100%' height='100%' fill='%23231238'/><text x='50%' y='45%' fill='%23d178ff' font-size='18' font-weight='bold' font-family='sans-serif' text-anchor='middle'>One Piece</text><text x='50%' y='55%' fill='%23ffffff' font-size='14' font-family='sans-serif' text-anchor='middle'>Tomo 1</text></svg>";

  container.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
      <div>
        <h2 class="fw-bold text-white mb-1"><i class="fa-solid fa-book-open text-accent me-2" style="color: #d178ff;"></i>Mi Biblioteca Digital</h2>
        <p class="text-secondary small mb-0">Bienvenido/a, <span class="text-white fw-semibold">${usuario.nombre}</span>. Aquí están tus tomos digitales disponibles para lectura.</p>
      </div>
      <span class="badge px-3 py-2 rounded-3" style="background-color: #231238; color: #d178ff; border: 1px solid #3b1754;">
        <i class="fa-solid fa-bookmark me-1"></i>1 Obra en colección
      </span>
    </div>

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      <div class="col">
        <div class="card-panel p-3 text-center h-100 d-flex flex-column justify-content-between" style="background: #12131f; border: 1px solid #28153b; border-radius: 12px;">
          <div>
            <div class="position-relative mb-3 overflow-hidden rounded">
              <img 
                src="../images/one_piece_%23001.jpg" 
                class="img-fluid rounded shadow w-100" 
                style="height: 280px; object-fit: cover;" 
                onerror="this.onerror=null; this.src='../images/one_piece_001.jpg'; this.onerror=function(){this.src='${svgFallback}';};" 
                alt="One Piece - Tomo 1" 
              />
              <span class="position-absolute top-0 end-0 badge bg-success m-2 px-2 py-1">Digital Adquirido</span>
            </div>
            <h5 class="text-white fw-bold mb-1">One Piece - Tomo 1</h5>
            <p class="text-secondary small mb-2">Romance Dawn · Eiichiro Oda</p>
            <p class="text-secondary mb-3" style="font-size: 0.8rem;">6 Páginas de lectura en alta definición disponibles.</p>
          </div>
          <button class="btn w-100 fw-bold py-2 text-white" style="background-color: #c800ff; border: none; border-radius: 8px;" onclick="abrirLectorManga(0)">
            <i class="fa-solid fa-book-open-reader me-2"></i>Leer Ahora
          </button>
        </div>
      </div>
    </div>
  `;
}

function abrirLectorManga(indexInicial = 0) {
  paginaActualIndex = indexInicial;
  actualizarVistaPagina();
  const modalElem = document.getElementById('lectorMangaModal');
  if (modalElem && typeof bootstrap !== 'undefined') {
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElem);
    modalInstance.show();
  }
}

function cambiarPagina(delta) {
  const nuevaPagina = paginaActualIndex + delta;
  if (nuevaPagina >= 0 && nuevaPagina < paginasOnePiece.length) {
    paginaActualIndex = nuevaPagina;
    actualizarVistaPagina();
  }
}

function irAPagina(numPagina) {
  const index = numPagina - 1;
  if (index >= 0 && index < paginasOnePiece.length) {
    paginaActualIndex = index;
    actualizarVistaPagina();
  }
}

function actualizarVistaPagina() {
  const imgElem = document.getElementById('mangaPageImg');
  const selectElem = document.getElementById('selectPage');
  const btnPrev = document.getElementById('btnPrevPage');
  const btnNext = document.getElementById('btnNextPage');

  if (imgElem) {
    imgElem.src = paginasOnePiece[paginaActualIndex];
  }
  if (selectElem) {
    selectElem.value = (paginaActualIndex + 1).toString();
  }
  if (btnPrev) {
    btnPrev.disabled = paginaActualIndex === 0;
  }
  if (btnNext) {
    btnNext.disabled = paginaActualIndex === paginasOnePiece.length - 1;
  }
}

function inicializarTecladoLector() {
  document.addEventListener('keydown', (e) => {
    const modalElem = document.getElementById('lectorMangaModal');
    if (modalElem && modalElem.classList.contains('show')) {
      if (e.key === 'ArrowLeft') {
        cambiarPagina(-1);
      } else if (e.key === 'ArrowRight') {
        cambiarPagina(1);
      }
    }
  });
}