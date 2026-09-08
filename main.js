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

// Comprobar la sesión actual del usuario (Sincronización global)
function checkUserSession() {
  const sessionData = JSON.parse(localStorage.getItem("mangaFlow_session")) || JSON.parse(localStorage.getItem("activeUser")) || JSON.parse(localStorage.getItem("usuarioLogueado"));

  const userBadge = document.getElementById("user-badge");
  const userActionBtn = document.getElementById("user-action-btn");
  const navAccountLink = document.getElementById("nav-account-link");

  const relativePrefix = isSubfolder() ? "../" : "./";

  if (sessionData && !sessionData.isGuest) {
    const displayName = sessionData.nombre || sessionData.username || (sessionData.email ? sessionData.email.split("@")[0] : "Usuario");

    if (userBadge) {
      userBadge.textContent = displayName;
      userBadge.style.backgroundColor = "#3b1754";
      userBadge.style.color = "#d178ff";
    }

    if (userActionBtn) {
      userActionBtn.title = "Cerrar Sesión";
      userActionBtn.className = "btn btn-dark border-0 p-2 text-danger";
      userActionBtn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i>';
      userActionBtn.onclick = logoutUser;
    }

    if (navAccountLink) {
      navAccountLink.href = `${relativePrefix}cuenta/cuenta.html`;
    }

    bypassLoginIfAuthenticated();
  } else {
    if (userBadge) {
      userBadge.textContent = "Invitado";
      userBadge.style.backgroundColor = "#231238";
      userBadge.style.color = "#d178ff";
    }

    if (userActionBtn) {
      userActionBtn.title = "Iniciar Sesión";
      userActionBtn.className = "btn btn-dark border-0 p-2 text-secondary";
      userActionBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>';
      userActionBtn.onclick = function() {
        window.location.href = `${relativePrefix}login.html`;
      };
    }

    if (navAccountLink) {
      navAccountLink.href = `${relativePrefix}login.html`;
    }
  }
}

// Redirigir si intenta entrar a login estando ya autenticado
function bypassLoginIfAuthenticated() {
  const currentPath = window.location.pathname;
  if (currentPath.endsWith("login.html")) {
    const targetPath = isSubfolder() ? "../cuenta/cuenta.html" : "./cuenta/cuenta.html";
    window.location.href = targetPath;
  }
}

// Detecta si la ruta actual está en una subcarpeta
function isSubfolder() {
  return window.location.pathname.includes("/catalogo/") || 
         window.location.pathname.includes("/puntos/") || 
         window.location.pathname.includes("/editoriales/") || 
         window.location.pathname.includes("/biblioteca/") ||
         window.location.pathname.includes("/cuenta/");
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

// Cerrar sesión limpiando todas las claves de usuario
function logoutUser() {
  localStorage.removeItem("mangaFlow_session");
  localStorage.removeItem("activeUser");
  localStorage.removeItem("usuarioLogueado");
  localStorage.removeItem("currentUser");
  sessionStorage.clear();
  const relativePrefix = isSubfolder() ? "../" : "./";
  window.location.href = `${relativePrefix}index.html`;
}