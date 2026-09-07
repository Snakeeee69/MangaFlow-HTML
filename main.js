// Arreglo de Novedades (6 imágenes exactas de /images/novedades)
const novedades = [
  { id: 1, titulo: "Demon Slayer #1", precio: 8990, demografia: "SHŌNEN", imagen: "images/novedades/Demon_Slayer_01.jpg" },
  { id: 2, titulo: "Kaguya-sama: Love is War #1", precio: 9490, demografia: "SEINEN", imagen: "images/novedades/Kaguya_sama_arg_01.jpg" },
  { id: 3, titulo: "Las Quintillizas #1", precio: 9990, demografia: "SHŌNEN", imagen: "images/novedades/Las_quintillizas_1.png" },
  { id: 4, titulo: "One Piece #1", precio: 8990, demografia: "SHŌNEN", imagen: "images/novedades/One_Piece_01.jpg" },
  { id: 5, titulo: "Jujutsu Kaisen #1", precio: 8990, demografia: "SHŌNEN", imagen: "images/novedades/xJujutsu_kaisen_arg_01.jpg" },
  { id: 6, titulo: "Call of the Night #1", precio: 8590, demografia: "SHŌNEN", imagen: "images/novedades/yofukashi_no_uta.jpg" }
];

// Arreglo de Más Populares (8 imágenes exactas de /images/mas_populares)
const populares = [
  { id: 101, titulo: "Ataque a los Titanes #1", precio: 9490, demografia: "SHŌNEN", imagen: "images/mas_populares/ataque_a_los_titanes_1.jpg" },
  { id: 102, titulo: "Atom: The Beginning #1", precio: 8990, demografia: "SEINEN", imagen: "images/mas_populares/Atom_the_beginning_1.png" },
  { id: 103, titulo: "Berserk #1", precio: 11990, demografia: "SEINEN", imagen: "images/mas_populares/Berserk.png" },
  { id: 104, titulo: "Demon Slayer #1", precio: 8990, demografia: "SHŌNEN", imagen: "images/mas_populares/Demon_Slayer_01.jpg" },
  { id: 105, titulo: "Naruto #1", precio: 8590, demografia: "SHŌNEN", imagen: "images/mas_populares/naruto_tomo_1.png" },
  { id: 106, titulo: "One Piece #1", precio: 8990, demografia: "SHŌNEN", imagen: "images/mas_populares/One_Piece_01_p.jpg" },
  { id: 107, titulo: "Spy x Family #1", precio: 8590, demografia: "SHŌNEN", imagen: "images/mas_populares/Spy_x_family_1.png" },
  { id: 108, titulo: "Jujutsu Kaisen #1", precio: 8990, demografia: "SHŌNEN", imagen: "images/mas_populares/xJujutsu_kaisen_arg_01.jpg" }
];

document.addEventListener("DOMContentLoaded", () => {
  // Sincronizar miniaturas del carrusel con la transición activa de Bootstrap
  const heroCarousel = document.getElementById("heroCarousel");
  if (heroCarousel) {
    heroCarousel.addEventListener("slide.bs.carousel", (event) => {
      const thumbs = heroCarousel.querySelectorAll(".nav-thumb");
      thumbs.forEach((thumb, index) => {
        if (index === event.to) {
          thumb.classList.add("active");
        } else {
          thumb.classList.remove("active");
        }
      });
    });
  }

  // Renderizar Novedades
  const novedadesGrid = document.getElementById("novedades-grid");
  if (novedadesGrid) {
    novedadesGrid.innerHTML = novedades.map(item => `
      <div class="col">
        <div class="product-card h-100 p-2 d-flex flex-column justify-content-between">
          <a href="detalle-manga.html?id=${item.id}" class="text-decoration-none">
            <img src="${item.imagen}" alt="${item.titulo}" class="img-fluid rounded-3 mb-2 w-100" style="height: 220px; object-fit: cover;" />
            <span class="badge bg-dark text-secondary mb-1" style="font-size: 0.65rem;">${item.demografia}</span>
            <h6 class="text-white fw-bold mb-1 fs-6 text-truncate">${item.titulo}</h6>
          </a>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <span class="text-white fw-bold small">$${item.precio.toLocaleString("es-CL")}</span>
            <button class="btn btn-sm text-white p-1" style="background-color: #c800ff; border-radius: 6px;" onclick="agregarAlCarrito(${item.id})">
              <i class="fa-solid fa-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Renderizar Populares
  const popularesGrid = document.getElementById("populares-grid");
  if (popularesGrid) {
    popularesGrid.innerHTML = populares.map(item => `
      <div class="col">
        <div class="product-card h-100 p-3 d-flex flex-column justify-content-between">
          <a href="detalle-manga.html?id=${item.id}" class="text-decoration-none">
            <img src="${item.imagen}" alt="${item.titulo}" class="img-fluid rounded-3 mb-3 w-100" style="height: 260px; object-fit: cover;" />
            <span class="badge bg-dark text-secondary mb-1" style="font-size: 0.7rem;">${item.demografia}</span>
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
});

function agregarAlCarrito(id) {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    let count = parseInt(cartCount.innerText) || 0;
    cartCount.innerText = count + 1;
  }
}

// Comprueba si hay un usuario logueado en localStorage
function obtenerUsuarioActual() {
  return JSON.parse(localStorage.getItem('usuarioLogueado')) || null;
}

//funciones login
function agregarAlCarrito(productoId) {
  const usuario = obtenerUsuarioActual();

  if (!usuario) {
    alert("Debes iniciar sesión para agregar productos al carrito.");
    window.location.href = "./login.html";
    return;
  }

  //funcion carrito
  console.log("Producto agregado al carrito:", productoId);
}

// Obtiene el estado de la sesión
function obtenerUsuarioActual() {
  return JSON.parse(localStorage.getItem('usuarioLogueado')) || null;
}

// Cierra sesión
function cerrarSesion() {
  localStorage.removeItem('usuarioLogueado');
  window.location.reload();
}

// Bloqueo al añadir productos si no hay sesión
function agregarAlCarrito(productoId) {
  const usuario = obtenerUsuarioActual();

  if (!usuario) {
    alert("Debes iniciar sesión para agregar productos al carrito.");
    window.location.href = "login.html";
    return;
  }

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.push(productoId);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContadorCarrito();
  alert("Producto agregado al carrito");
}

function actualizarContadorCarrito() {
  const badge = document.getElementById('cart-count');
  if (badge) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    badge.textContent = carrito.length;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  actualizarContadorCarrito();
});