// Arreglo de Novedades
const novedades = [
  { id: 1, titulo: "Demon Slayer #1", precio: 8990, demografia: "SHŌNEN", imagen: "images/novedades/Demon_Slayer_01.jpg" },
  { id: 2, titulo: "Kaguya-sama: Love is War #1", precio: 9490, demografia: "SEINEN", imagen: "images/novedades/Kaguya_sama_arg_01.jpg" },
  { id: 3, titulo: "Las Quintillizas #1", precio: 9990, demografia: "SHŌNEN", imagen: "images/novedades/Las_quintillizas_1.png" },
  { id: 4, titulo: "One Piece #1", precio: 8990, demografia: "SHŌNEN", imagen: "images/novedades/One_Piece_01.jpg" },
  { id: 5, titulo: "Jujutsu Kaisen #1", precio: 8990, demografia: "SHŌNEN", imagen: "images/novedades/xJujutsu_kaisen_arg_01.jpg" },
  { id: 6, titulo: "Call of the Night #1", precio: 8590, demografia: "SHŌNEN", imagen: "images/novedades/yofukashi_no_uta.jpg" }
];

// Arreglo de Más Populares
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
  // Configurar carrusel hero
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

  // Renderizar sección de novedades
  const novedadesGrid = document.getElementById("novedades-grid");
  if (novedadesGrid) {
    const relativePrefix = isSubfolder() ? "../" : "";
    novedadesGrid.innerHTML = novedades.map(item => `
      <div class="col">
        <div class="product-card h-100 p-2 d-flex flex-column justify-content-between">
          <a href="${relativePrefix}detalle-manga.html?id=${item.id}" class="text-decoration-none">
            <img src="${relativePrefix}${item.imagen}" alt="${item.titulo}" class="img-fluid rounded-3 mb-2 w-100" style="height: 220px; object-fit: cover;" onerror="this.onerror=null; this.src='https://via.placeholder.com/220x300?text=Sin+Imagen';" />
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

  // Renderizar sección de populares
  const popularesGrid = document.getElementById("populares-grid");
  if (popularesGrid) {
    const relativePrefix = isSubfolder() ? "../" : "";
    popularesGrid.innerHTML = populares.map(item => `
      <div class="col">
        <div class="product-card h-100 p-3 d-flex flex-column justify-content-between">
          <a href="${relativePrefix}detalle-manga.html?id=${item.id}" class="text-decoration-none">
            <img src="${relativePrefix}${item.imagen}" alt="${item.titulo}" class="img-fluid rounded-3 mb-3 w-100" style="height: 260px; object-fit: cover;" onerror="this.onerror=null; this.src='https://via.placeholder.com/260x350?text=Sin+Imagen';" />
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

  // Inicializar estado global
  checkUserSession();
  actualizarContadorCarrito();
});

// Comprobar la sesión actual del usuario
function checkUserSession() {
  const session = JSON.parse(localStorage.getItem("mangaFlow_session")) || JSON.parse(sessionStorage.getItem("mangaFlow_session"));

  const userBadge = document.getElementById("user-badge");
  const userActionBtn = document.getElementById("user-action-btn");

  if (session && !session.isGuest && session.email) {
    const userName = session.nombre || session.email.split("@")[0];
    
    if (userBadge) {
      userBadge.textContent = userName;
      userBadge.classList.add("bg-primary", "text-white");
    }

    if (userActionBtn) {
      userActionBtn.href = isSubfolder() ? "../perfil.html" : "./perfil.html";
      userActionBtn.title = "Mi Cuenta";
      userActionBtn.innerHTML = '<i class="fa-solid fa-user"></i>';
    }

    bypassLoginIfAuthenticated();
  } else {
    if (userBadge) {
      userBadge.textContent = "Invitado";
      userBadge.classList.remove("bg-primary", "text-white");
    }
    if (userActionBtn) {
      userActionBtn.href = isSubfolder() ? "../login.html" : "./login.html";
      userActionBtn.title = "Iniciar Sesión";
      userActionBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>';
    }
  }
}

// Redirigir fuera de login si ya está autenticado como usuario registrado
function bypassLoginIfAuthenticated() {
  const currentPath = window.location.pathname;
  if (currentPath.endsWith("login.html")) {
    const targetPath = isSubfolder() ? "../perfil.html" : "./perfil.html";
    window.location.href = targetPath;
  }
}

// Detecta si la ruta actual está en una subcarpeta
function isSubfolder() {
  return window.location.pathname.includes("/catalogo/") || 
         window.location.pathname.includes("/puntos/") || 
         window.location.pathname.includes("/editoriales/") || 
         window.location.pathname.includes("/biblioteca/");
}

// Agregar producto al carrito por ID
function agregarAlCarrito(productId) {
  const todosLosProductos = [...novedades, ...populares];
  const producto = todosLosProductos.find(p => p.id === productId);

  if (!producto) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || JSON.parse(localStorage.getItem("mangaFlow_cart")) || [];
  const index = cart.findIndex(item => item.id === productId);

  if (index !== -1) {
    cart[index].quantity = (cart[index].quantity || 1) + 1;
  } else {
    cart.push({ ...producto, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  actualizarContadorCarrito();
}

// Actualizar el número mostrado en la insignia del carrito
function actualizarContadorCarrito() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) {
    const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    cartCountEl.textContent = totalItems;
  }
}

// Iniciar sesión (para invocar desde login.html)
function loginUser(userData, remember = true) {
  if (remember) {
    localStorage.setItem("mangaFlow_session", JSON.stringify(userData));
  } else {
    sessionStorage.setItem("mangaFlow_session", JSON.stringify(userData));
  }
  window.location.href = isSubfolder() ? "../index.html" : "./index.html";
}

// Cerrar sesión
function logoutUser() {
  localStorage.removeItem("mangaFlow_session");
  sessionStorage.removeItem("mangaFlow_session");
  localStorage.removeItem("activeUser");
  window.location.href = isSubfolder() ? "../login.html" : "./login.html";
}