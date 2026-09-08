document.addEventListener('DOMContentLoaded', () => {
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    currentUser = {
      nombre: 'Usuario Demo',
      correo: 'usuario@duoc.cl',
      rol: 'Cliente',
      puntos: 1250,
      rut: '12345678-9'
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  const accountName = document.getElementById('account-name');
  const accountEmail = document.getElementById('account-email');
  const accountRole = document.getElementById('account-role');
  const accountPoints = document.getElementById('account-points');
  const inputNombre = document.getElementById('input-nombre');
  const inputEmail = document.getElementById('input-email');
  const inputRut = document.getElementById('input-rut');
  const logoutBtn = document.getElementById('logout-btn');
  const profileForm = document.getElementById('profile-form');

  if (accountName) accountName.textContent = currentUser.nombre;
  if (accountEmail) accountEmail.textContent = currentUser.correo;
  if (accountRole) accountRole.textContent = currentUser.rol;
  if (accountPoints) accountPoints.textContent = `${currentUser.puntos.toLocaleString('es-CL')} pts`;

  if (inputNombre) inputNombre.value = currentUser.nombre;
  if (inputEmail) inputEmail.value = currentUser.correo;
  if (inputRut) inputRut.value = currentUser.rut;

  renderListaDeseados();

  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      currentUser.nombre = inputNombre.value;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (accountName) accountName.textContent = currentUser.nombre;
      sincronizarSesionUsuario();
      alert('Información del perfil actualizada correctamente.');
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      window.location.href = '../login.html';
    });
  }
});

function renderListaDeseados() {
  const container = document.getElementById('wishlist-container');
  if (!container) return;

  const wishlist = obtenerListaDeseados();

  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-4">
        <i class="fa-regular fa-heart text-secondary fs-2 mb-2"></i>
        <p class="text-secondary mb-0">No tienes mangas en tu lista de deseados.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = wishlist.map(manga => `
    <div class="col">
      <div class="p-3 rounded-3 d-flex gap-3 align-items-center" style="background-color: #0b0b12; border: 1px solid #231238;">
        <img src="${manga.imagen}" alt="${manga.titulo}" class="rounded-2" style="width: 60px; height: 80px; object-fit: cover;" onerror="this.src='../images/logo/logoMangaFlow.png'" />
        <div class="flex-grow-1 overflow-hidden">
          <h6 class="text-white fw-bold mb-1 text-truncate">${manga.titulo}</h6>
          <span class="text-accent fw-bold d-block mb-2" style="color: #d178ff;">$${manga.precio.toLocaleString('es-CL')}</span>
          <button class="btn btn-sm btn-outline-danger py-1 px-2 text-xs" onclick="eliminarDeDeseados(${manga.id})">
            <i class="fa-solid fa-trash me-1"></i> Quitar
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function eliminarDeDeseados(id) {
  let wishlist = obtenerListaDeseados();
  wishlist = wishlist.filter(item => item.id !== id);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  renderListaDeseados();
}