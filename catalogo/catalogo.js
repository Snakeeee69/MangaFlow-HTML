const catalogoMangas = [
  // --- MANGAS FÍSICOS ---
  { id: 1, titulo: "Ataque a los Titanes", precio: 9490, demografia: "Shōnen", generos: ["Acción", "Drama", "Fantasy"], esDigitalOnly: false, imagen: "../images/catalogo/ataque_a_los_titanes_1.jpg" },
  { id: 2, titulo: "Atom: The Beginning", precio: 8990, demografia: "Seinen", generos: ["Acción", "Histórico"], esDigitalOnly: false, imagen: "../images/catalogo/Atom_the_beginning_1.png" },
  { id: 4, titulo: "Berserk", precio: 11990, demografia: "Seinen", generos: ["Acción", "Horror", "Fantasy", "Drama"], esDigitalOnly: false, imagen: "../images/catalogo/Berserk.png" },
  { id: 6, titulo: "Demon Slayer", precio: 8990, demografia: "Shōnen", generos: ["Acción", "Aventura", "Fantasy"], esDigitalOnly: false, imagen: "../images/catalogo/Demon_Slayer_01.jpg" },
  { id: 8, titulo: "Kaguya-sama: Love is War", precio: 9490, demografia: "Seinen", generos: ["Romance", "Comedia", "Drama"], esDigitalOnly: false, imagen: "../images/catalogo/Kaguya_sama_arg_01.jpg" },
  { id: 10, titulo: "Las Quintillizas", precio: 9990, demografia: "Shōnen", generos: ["Romance", "Comedia"], esDigitalOnly: false, imagen: "../images/catalogo/Las_quintillizas_1.png" },
  { id: 11, titulo: "Naruto", precio: 8590, demografia: "Shōnen", generos: ["Acción", "Aventura"], esDigitalOnly: false, imagen: "../images/catalogo/naruto_tomo_1.png" },
  { id: 12, titulo: "One Piece", precio: 8990, demografia: "Shōnen", generos: ["Acción", "Aventura", "Fantasy"], esDigitalOnly: false, imagen: "../images/catalogo/One_Piece_01.jpg" },
  { id: 14, titulo: "Spy x Family", precio: 8590, demografia: "Shōnen", generos: ["Acción", "Comedia"], esDigitalOnly: false, imagen: "../images/catalogo/Spy_x_family_1.png" },
  { id: 15, titulo: "Vinland Saga", precio: 10990, demografia: "Seinen", generos: ["Acción", "Histórico", "Drama"], esDigitalOnly: false, imagen: "../images/catalogo/vinland_saga.png" },
  { id: 16, titulo: "Jujutsu Kaisen", precio: 8990, demografia: "Shōnen", generos: ["Acción", "Horror", "Fantasy"], esDigitalOnly: false, imagen: "../images/catalogo/xJujutsu_kaisen_arg_01.jpg" },
  { id: 17, titulo: "Call of the Night", precio: 8590, demografia: "Shōnen", generos: ["Romance", "Comedia", "Psicológico"], esDigitalOnly: false, imagen: "../images/catalogo/yofukashi_no_uta.jpg" },

  // --- MANGAS DIGITALES ---
  { id: 3, titulo: "Bakemonogatari", precio: 2300, demografia: "Seinen", generos: ["Romance", "Psicológico"], esDigitalOnly: true, proximamenteFisico: false, imagen: "../images/catalogo/Bakemonogatari_1.png" },
  { id: 5, titulo: "Demon Slave", precio: 2300, demografia: "Shōnen", generos: ["Acción", "Fantasy"], esDigitalOnly: true, proximamenteFisico: false, imagen: "../images/catalogo/Demon_slave_01.jpg" },
  { id: 7, titulo: "Frieren", precio: 2300, demografia: "Shōnen", generos: ["Aventura", "Fantasy", "Drama"], esDigitalOnly: true, proximamenteFisico: true, imagen: "../images/catalogo/Frieren_01.jpg" },
  { id: 9, titulo: "KonoSuba", precio: 2300, demografia: "Shōnen", generos: ["Comedia", "Fantasy", "Aventura"], esDigitalOnly: true, proximamenteFisico: false, imagen: "../images/catalogo/Konosuba_arg_01.jpg" },
  { id: 13, titulo: "Oshi no Ko", precio: 2300, demografia: "Seinen", generos: ["Drama", "Psicológico"], esDigitalOnly: true, proximamenteFisico: false, imagen: "../images/catalogo/Oshi_no_ko_arg_01.jpg" },
  { id: 18, titulo: "Akane-banashi", precio: 2300, demografia: "Shōnen", generos: ["Drama", "Comedia"], esDigitalOnly: true, proximamenteFisico: true, imagen: "../images/mangas_digitales/akane_banashi.jpg" },
  { id: 19, titulo: "Dandadan", precio: 2300, demografia: "Shōnen", generos: ["Acción", "Horror", "Comedia"], esDigitalOnly: true, proximamenteFisico: true, imagen: "../images/mangas_digitales/Dandadan.jpg" },
  { id: 20, titulo: "Hunter x Hunter", precio: 2300, demografia: "Shōnen", generos: ["Acción", "Aventura", "Fantasy"], esDigitalOnly: true, proximamenteFisico: false, imagen: "../images/mangas_digitales/hunter_x_hunter.jpg" },
  { id: 21, titulo: "RuriDragon", precio: 2300, demografia: "Shōnen", generos: ["Comedia", "Fantasy"], esDigitalOnly: true, proximamenteFisico: false, imagen: "../images/mangas_digitales/RuriDragon.jpg" },
  { id: 22, titulo: "Sakamoto Days", precio: 2300, demografia: "Shōnen", generos: ["Acción", "Comedia"], esDigitalOnly: true, proximamenteFisico: true, imagen: "../images/mangas_digitales/SAKAMOTO_DAYS.jpg" }
];

const DEMOGRAFIAS = ['Todas', 'Shōnen', 'Seinen', 'Shōjo', 'Josei'];
const GENEROS = ['Todos', 'Acción', 'Aventura', 'Romance', 'Horror', 'Comedia', 'Drama', 'Histórico', 'Fantasy', 'Psicológico'];

let formatoSel = 'todos';
let busqueda = '';
let demografiaSel = 'Todas';
let generoSel = 'Todos';

document.addEventListener("DOMContentLoaded", () => {
  renderFiltros();
  renderCatalogo();

  const inputBusqueda = document.getElementById("input-busqueda");
  inputBusqueda.addEventListener("input", (e) => {
    busqueda = e.target.value;
    renderCatalogo();
  });

  const btnLimpiar = document.getElementById("btn-limpiar");
  btnLimpiar.addEventListener("click", () => {
    formatoSel = 'todos';
    busqueda = '';
    demografiaSel = 'Todas';
    generoSel = 'Todos';
    inputBusqueda.value = '';
    actualizarEstadoTabs();
    renderFiltros();
    renderCatalogo();
  });
});

function cambiarTabFormato(formato) {
  formatoSel = formato;
  actualizarEstadoTabs();
  renderCatalogo();
}

function actualizarEstadoTabs() {
  const tabTodos = document.getElementById("tab-todos");
  const tabDigitales = document.getElementById("tab-digitales");

  if (formatoSel === 'todos') {
    tabTodos.className = "btn btn-sm px-3 py-2 rounded-2 fw-semibold text-white bg-magenta border-0";
    tabDigitales.className = "btn btn-sm px-3 py-2 rounded-2 fw-semibold text-secondary border-0";
  } else {
    tabDigitales.className = "btn btn-sm px-3 py-2 rounded-2 fw-semibold text-white bg-magenta border-0";
    tabTodos.className = "btn btn-sm px-3 py-2 rounded-2 fw-semibold text-secondary border-0";
  }
}

function renderFiltros() {
  const containerDemo = document.getElementById("filter-demografia");
  const containerGen = document.getElementById("filter-genero");

  containerDemo.innerHTML = DEMOGRAFIAS.map(d => `
    <button class="btn btn-sm rounded-pill border-0 px-3 py-1 text-xs ${demografiaSel === d ? 'btn-magenta' : 'btn-filter-inactive'}" 
      onclick="seleccionarDemografia('${d}')">${d}</button>
  `).join("");

  containerGen.innerHTML = GENEROS.map(g => `
    <button class="btn btn-sm rounded-pill border-0 px-3 py-1 text-xs ${generoSel === g ? 'btn-magenta' : 'btn-filter-inactive'}" 
      onclick="seleccionarGenero('${g}')">${g}</button>
  `).join("");
}

function seleccionarDemografia(d) {
  demografiaSel = d;
  renderFiltros();
  renderCatalogo();
}

function seleccionarGenero(g) {
  generoSel = g;
  renderFiltros();
  renderCatalogo();
}

function renderCatalogo() {
  const grid = document.getElementById("catalogo-grid");
  const contador = document.getElementById("contador-obras");
  const noResults = document.getElementById("no-results");
  const btnLimpiar = document.getElementById("btn-limpiar");

  const filtrados = catalogoMangas.filter(m => {
    const matchFormato = formatoSel === 'todos' || (formatoSel === 'digitales' && m.esDigitalOnly);
    const matchBusqueda = m.titulo.toLowerCase().includes(busqueda.toLowerCase());
    const matchDemografia = demografiaSel === 'Todas' || m.demografia === demografiaSel;
    const matchGenero = generoSel === 'Todos' || m.generos.includes(generoSel);
    
    return matchFormato && matchBusqueda && matchDemografia && matchGenero;
  });

  if (busqueda || demografiaSel !== 'Todas' || generoSel !== 'Todos' || formatoSel !== 'todos') {
    btnLimpiar.classList.remove("d-none");
  } else {
    btnLimpiar.classList.add("d-none");
  }

  contador.innerText = `${filtrados.length} obras encontradas`;

  if (filtrados.length === 0) {
    grid.innerHTML = '';
    noResults.classList.remove("d-none");
  } else {
    noResults.classList.add("d-none");
    grid.innerHTML = filtrados.map(item => `
      <div class="col">
        <div class="product-card h-100 p-3 d-flex flex-column justify-content-between position-relative">
          <a href="../detalle-manga.html?id=${item.id}" class="text-decoration-none">
            <div class="position-relative">
              <img src="${item.imagen}" alt="${item.titulo}" class="img-fluid rounded-3 mb-2 w-100" style="height: 260px; object-fit: cover;" onerror="this.src='../images/logo/logoMangaFlow.png'" />
              ${item.esDigitalOnly ? `
                <div class="position-absolute top-0 end-0 m-2 d-flex flex-column align-items-end gap-1">
                  <span class="badge bg-info text-dark fw-bold">Solo Digital</span>
                  ${item.proximamenteFisico ? `
                    <span class="badge bg-danger text-white fw-bold" style="font-size: 0.6rem;">
                      <i class="fa-solid fa-fire me-1"></i>Prox. Físico
                    </span>
                  ` : ''}
                  <span class="badge bg-warning text-dark fw-bold" style="font-size: 0.6rem;">
                    <i class="fa-solid fa-ticket me-1"></i>Cupón $2.300 p/ Físico
                  </span>
                </div>
              ` : ''}
            </div>
            <div class="d-flex gap-1 mb-1 flex-wrap">
              <span class="badge bg-dark text-secondary" style="font-size: 0.65rem;">${item.demografia.toUpperCase()}</span>
              ${item.generos.slice(0, 2).map(g => `<span class="badge bg-secondary bg-opacity-20 text-light-50" style="font-size: 0.6rem;">${g}</span>`).join('')}
            </div>
            <h5 class="text-white fw-bold mb-2 fs-6 text-truncate">${item.titulo}</h5>
          </a>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <span class="text-white fw-bold fs-5">$${item.precio.toLocaleString("es-CL")}</span>
            <button class="btn text-white px-3 py-1" style="background-color: #c800ff; border-radius: 8px;" onclick="agregarAlCarrito(${item.id})">
              <i class="fa-solid fa-cart-plus me-1"></i> Agregar
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }
}

function agregarAlCarrito(id) {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    let count = parseInt(cartCount.innerText) || 0;
    cartCount.innerText = count + 1;
  }
}