// Obtener usuario activo
function obtenerUsuarioActual() {
  return JSON.parse(localStorage.getItem('mangaFlow_session')) || 
         JSON.parse(localStorage.getItem('activeUser')) || 
         JSON.parse(localStorage.getItem('usuarioLogueado'));
}

// Obtener puntos del usuario actual o 0 si no existe
function obtenerPuntosIniciales() {
  const usuario = obtenerUsuarioActual();
  return usuario ? (usuario.puntos || 0) : 0;
}

let puntosUsuario = obtenerPuntosIniciales();

const recompensas = [
  {
    id: "r1",
    nombre: "Marcapáginas Coleccionable",
    costoPuntos: 750,
    stock: 50,
    tipo: "merch",
    descripcion: "Marcapáginas metálico con diseño exclusivo de MangaFlow. Ediciones de One Piece, Naruto y más.",
    imagen: "../images/recompensas/MarcaPaginas.jpg"
  },
  {
    id: "r2",
    nombre: "Portavasos Magnético",
    costoPuntos: 1250,
    stock: 30,
    tipo: "merch",
    descripcion: "Set de 4 portavasos magnéticos con ilustraciones de personajes icónicos del manga.",
    imagen: "../images/recompensas/PortavasosMagnetico.jpg"
  },
  {
    id: "r3",
    nombre: "Póster A2 Exclusivo",
    costoPuntos: 2000,
    stock: 20,
    tipo: "merch",
    descripcion: "Póster de alta calidad A2 con arte exclusivo de MangaFlow. Disponible en diseños de Berserk...",
    imagen: "../images/recompensas/poster.jpeg"
  },
  {
    id: "r4",
    nombre: "Tote Bag MangaFlow",
    costoPuntos: 3000,
    stock: 15,
    tipo: "merch",
    descripcion: "Bolsa de tela exclusiva con el logo de MangaFlow y diseños de mangas seleccionados.",
    imagen: "../images/recompensas/tote_bag_g.png"
  },
  {
    id: "r5",
    nombre: "Manga Digital",
    costoPuntos: 5000,
    stock: 999,
    tipo: "manga",
    descripcion: "Elige cualquier tomo digital de nuestra colección. Acceso inmediato en tu Biblioteca.",
    imagen: "../images/recompensas/3_mangas_digitales.jpg"
  },
  {
    id: "r6",
    nombre: "3 Mangas Digitales",
    costoPuntos: 8000,
    stock: 999,
    tipo: "manga",
    descripcion: "Elige 3 tomos digitales de cualquier serie disponible en MangaFlow. Acceso inmediato en tu Biblioteca.",
    imagen: "../images/recompensas/3_mangas_digitales.jpg"
  },
  {
    id: "r7",
    nombre: "Manga Físico",
    costoPuntos: 12500,
    stock: 10,
    tipo: "manga",
    descripcion: "Selecciona cualquier manga físico de nuestra colección. Sujeto a disponibilidad de stock.",
    imagen: "../images/recompensas/manga_fisico_2.jpeg"
  },
  {
    id: "r8",
    nombre: "Manga Edición Deluxe o Tapa Dura",
    costoPuntos: 25000,
    stock: 5,
    tipo: "edicion-especial",
    descripcion: "Canjea por una edición especial deluxe o tapa dura de nuestra colección premium. La joya de cualquier colección.",
    imagen: "../images/recompensas/Manga_tapadura.png"
  }
];

const mangasDisponibles = [
  { id: "m1", titulo: "Demon Slayer", tomos: [1, 2, 3, 4, 5] },
  { id: "m2", titulo: "Kaguya-sama: Love is War", tomos: [1, 2, 3] },
  { id: "m3", titulo: "One Piece", tomos: [1, 2, 3, 4, 5, 6] },
  { id: "m4", titulo: "Jujutsu Kaisen", tomos: [1, 2, 3] },
  { id: "m5", titulo: "Berserk", tomos: [1, 2] }
];

const ESTADOS_CERTIFICACION = [
  { value: 'nuevo', label: 'Nuevo', puntos: 800, color: 'text-success' },
  { value: 'muy-bueno', label: 'Muy bueno', puntos: 600, color: 'text-info' },
  { value: 'bueno', label: 'Bueno', puntos: 400, color: 'text-warning' },
  { value: 'regular', label: 'Regular', puntos: 150, color: 'text-orange' },
  { value: 'rechazado', label: 'Rechazado', puntos: 0, color: 'text-danger' }
];

let estadoSeleccionado = 'bueno';
let historialCertificaciones = [];

document.addEventListener("DOMContentLoaded", () => {
  puntosUsuario = obtenerPuntosIniciales();
  actualizarVistaPuntos();
  renderRecompensas();
  initFormularioCertificacion();
  renderHistorial();
});

function actualizarVistaPuntos() {
  const elem = document.getElementById("puntos-usuario");
  if (elem) {
    elem.innerText = puntosUsuario.toLocaleString("es-CL");
  }
}

function cambiarTab(tab) {
  const btnRecompensas = document.getElementById("tab-recompensas");
  const btnIntercambio = document.getElementById("tab-intercambio");
  const secRecompensas = document.getElementById("sec-recompensas");
  const secIntercambio = document.getElementById("sec-intercambio");

  if (tab === 'recompensas') {
    btnRecompensas.className = "btn btn-sm px-4 py-2 rounded-2 fw-semibold text-white bg-magenta border-0";
    btnIntercambio.className = "btn btn-sm px-4 py-2 rounded-2 fw-semibold text-secondary border-0";
    secRecompensas.classList.remove("d-none");
    secIntercambio.classList.add("d-none");
  } else {
    btnIntercambio.className = "btn btn-sm px-4 py-2 rounded-2 fw-semibold text-white bg-magenta border-0";
    btnRecompensas.className = "btn btn-sm px-4 py-2 rounded-2 fw-semibold text-secondary border-0";
    secIntercambio.classList.remove("d-none");
    secRecompensas.classList.add("d-none");
  }
}

function renderRecompensas() {
  const container = document.getElementById("sec-recompensas");
  if (!container) return;

  const usuario = obtenerUsuarioActual();

  container.innerHTML = recompensas.map(r => {
    const puedeCanjear = usuario && !usuario.isGuest && puntosUsuario >= r.costoPuntos && r.stock > 0;
    const badgeColor = r.tipo === 'edicion-especial' ? 'bg-warning text-dark' : r.tipo === 'manga' ? 'bg-primary' : 'bg-purple';
    const badgeTexto = r.tipo === 'edicion-especial' ? 'Premium' : r.tipo === 'manga' ? 'Manga' : 'Merch';

    return `
      <div class="col">
        <div class="card-panel h-100 overflow-hidden d-flex flex-column justify-content-between p-0">
          <div>
            <div style="height: 160px; overflow: hidden;" class="position-relative">
              <img src="${r.imagen}" alt="${r.nombre}" class="w-100 h-100" style="object-fit: cover;" onerror="this.onerror=null; this.src='../images/logo/logoMangaFlow.png';" />
              <span class="badge position-absolute top-0 end-0 m-2 ${badgeColor}">${badgeTexto}</span>
            </div>
            <div class="p-3">
              <h6 class="text-white fw-bold mb-1">${r.nombre}</h6>
              <p class="text-secondary mb-3 line-clamp-2" style="font-size: 0.8rem;">${r.descripcion}</p>
            </div>
          </div>
          <div class="p-3 pt-0">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div>
                <span class="fw-bold fs-6" style="color: #d178ff;">${r.costoPuntos.toLocaleString("es-CL")} pts</span>
                <div class="text-secondary" style="font-size: 0.7rem;">Stock: ${r.stock}</div>
              </div>
              <button class="btn btn-sm px-3 py-1 text-white fw-semibold" style="background-color: #c800ff; border-radius: 8px;"
                ${!puedeCanjear ? 'disabled' : ''} onclick="canjear('${r.nombre}', ${r.costoPuntos})">
                <i class="fa-solid fa-gift me-1"></i> Canjear
              </button>
            </div>
            ${(!usuario || usuario.isGuest) ? `
              <p class="text-danger m-0" style="font-size: 0.7rem;">Inicia sesión para canjear</p>
            ` : !puedeCanjear && puntosUsuario < r.costoPuntos ? `
              <p class="text-secondary m-0" style="font-size: 0.7rem;">Te faltan ${(r.costoPuntos - puntosUsuario).toLocaleString("es-CL")} pts</p>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function canjear(nombre, costo) {
  const usuario = obtenerUsuarioActual();

  if (!usuario || usuario.isGuest) {
    alert("Debes iniciar sesión para acumular y canjear puntos.");
    window.location.href = "../login.html";
    return;
  }

  if (puntosUsuario >= costo) {
    puntosUsuario -= costo;
    usuario.puntos = puntosUsuario;
    
    // Sincronizar en todas las llaves posibles
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
    localStorage.setItem('mangaFlow_session', JSON.stringify(usuario));
    localStorage.setItem('activeUser', JSON.stringify(usuario));

    actualizarVistaPuntos();
    renderRecompensas();

    const alerta = document.getElementById("alerta-canje");
    const mensaje = document.getElementById("mensaje-canje");
    if (alerta && mensaje) {
      mensaje.innerText = `¡Canjeaste: ${nombre}! Se agregará a tu cuenta.`;
      alerta.classList.remove("d-none");

      setTimeout(() => {
        alerta.classList.add("d-none");
      }, 4000);
    }
  }
}

function initFormularioCertificacion() {
  const selectManga = document.getElementById("select-manga");
  if (selectManga) {
    selectManga.innerHTML = `<option value="">Selecciona una serie</option>` + mangasDisponibles.map(m => `<option value="${m.id}">${m.titulo}</option>`).join("");
  }

  const contEstados = document.getElementById("contenedor-estados");
  if (contEstados) {
    contEstados.innerHTML = ESTADOS_CERTIFICACION.map(e => `
      <label class="d-flex align-items-center justify-content-between p-2 rounded-3 border border-secondary border-opacity-20 style-option cursor-pointer">
        <div class="d-flex align-items-center gap-2">
          <input type="radio" name="estado" value="${e.value}" ${e.value === 'bueno' ? 'checked' : ''} onchange="estadoSeleccionado = '${e.value}'" class="form-check-input" />
          <span class="text-white small">${e.label}</span>
        </div>
        <span class="small fw-bold ${e.color}">${e.puntos > 0 ? '+' + e.puntos + ' pts' : '<i class="fa-solid fa-circle-xmark"></i>'}</span>
      </label>
    `).join("");
  }
}

function cargarTomos() {
  const idManga = document.getElementById("select-manga").value;
  const selectTomo = document.getElementById("select-tomo");

  if (!idManga) {
    selectTomo.innerHTML = `<option value="">Selecciona primero una serie</option>`;
    selectTomo.disabled = true;
    return;
  }

  const manga = mangasDisponibles.find(m => m.id === idManga);
  selectTomo.innerHTML = `<option value="">Selecciona el tomo</option>` + manga.tomos.map(t => `<option value="${t}">Tomo ${t}</option>`).join("");
  selectTomo.disabled = false;
}

function procesarCertificacion(e) {
  e.preventDefault();

  const usuario = obtenerUsuarioActual();
  if (!usuario || usuario.isGuest) {
    alert("Debes iniciar sesión para entregar mangas y reclamar puntos.");
    window.location.href = "../login.html";
    return;
  }

  const idManga = document.getElementById("select-manga").value;
  const numTomo = document.getElementById("select-tomo").value;
  const mangaObj = mangasDisponibles.find(m => m.id === idManga);
  const estadoObj = ESTADOS_CERTIFICACION.find(est => est.value === estadoSeleccionado);

  if (!mangaObj || !numTomo) return;

  puntosUsuario += estadoObj.puntos;
  usuario.puntos = puntosUsuario;
  
  // Sincronización global del usuario
  localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
  localStorage.setItem('mangaFlow_session', JSON.stringify(usuario));
  localStorage.setItem('activeUser', JSON.stringify(usuario));

  actualizarVistaPuntos();
  renderRecompensas();

  historialCertificaciones.unshift({
    titulo: mangaObj.titulo,
    tomo: numTomo,
    estadoLabel: estadoObj.label,
    color: estadoObj.color,
    puntos: estadoObj.puntos,
    fecha: "Hoy"
  });

  renderHistorial();

  document.getElementById("form-certificacion").classList.add("d-none");
  document.getElementById("certificacion-exito").classList.remove("d-none");

  setTimeout(() => {
    document.getElementById("form-certificacion").reset();
    document.getElementById("select-tomo").disabled = true;
    document.getElementById("form-certificacion").classList.remove("d-none");
    document.getElementById("certificacion-exito").classList.add("d-none");
  }, 3000);
}

function renderHistorial() {
  const container = document.getElementById("historial-entregas");
  if (!container) return;

  if (historialCertificaciones.length === 0) {
    container.innerHTML = `
      <div class="card-panel p-5 text-center">
        <i class="fa-solid fa-box-open text-secondary fs-1 mb-2"></i>
        <p class="text-secondary small m-0">Aún no has entregado mangas usados</p>
      </div>
    `;
    return;
  }

  container.innerHTML = historialCertificaciones.map(item => `
    <div class="card-panel p-3 d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center gap-3">
        <i class="fa-solid fa-circle-check ${item.color} fs-5"></i>
        <div>
          <h6 class="text-white fw-bold mb-0">${item.titulo} — Tomo ${item.tomo}</h6>
          <span class="text-secondary" style="font-size: 0.75rem;">${item.estadoLabel} · ${item.fecha}</span>
        </div>
      </div>
      <span class="fw-bold ${item.color}">${item.puntos > 0 ? '+' + item.puntos : '—'}</span>
    </div>
  `).join("");
}