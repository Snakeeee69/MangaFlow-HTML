function getUsuarioActual() {
  const session = JSON.parse(localStorage.getItem("mangaFlow_session")) || JSON.parse(localStorage.getItem("activeUser")) || JSON.parse(localStorage.getItem("usuarioLogueado"));
  if (session && !session.isGuest) {
    return {
      nombre: session.nombre || session.username || "Usuario",
      esInvitado: false,
      puntos: session.puntos || 4750
    };
  }
  return { nombre: "Invitado", esInvitado: true, puntos: 0 };
}

function obtenerCarrito() {
  const guardado = localStorage.getItem("cart") || localStorage.getItem("mangaFlow_cart");
  return guardado ? JSON.parse(guardado) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("cart", JSON.stringify(carrito));
  
  if (typeof actualizarContadorCarrito === 'function') {
    actualizarContadorCarrito();
  }
  actualizarBadgesInternos();
}

function actualizarBadgesInternos() {
  const carrito = obtenerCarrito();
  const totalItems = carrito.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const badgeNav = document.getElementById('cart-count');
  const badgeHeader = document.getElementById('cart-badge-count');
  
  if (badgeNav) badgeNav.textContent = totalItems;
  if (badgeHeader) badgeHeader.textContent = totalItems;
}

function formatearCLP(monto) {
  return '$' + Math.round(monto).toLocaleString('es-CL');
}

let puntosAplicar = 0;

function renderizarCarrito() {
  const wrapper = document.getElementById('cart-content-wrapper');
  if (!wrapper) return;

  const carrito = obtenerCarrito();
  const usuarioActual = getUsuarioActual();
  actualizarBadgesInternos();

  if (usuarioActual.esInvitado) {
    wrapper.innerHTML = `
      <div class="text-center py-5 my-5">
        <i class="fa-solid fa-bag-shopping display-1 text-secondary mb-3" style="opacity: 0.5;"></i>
        <h2 class="text-white fw-bold mb-2 fs-3">Inicia sesión para comprar</h2>
        <p class="text-secondary mb-4">Los invitados no pueden realizar compras en la tienda.</p>
        <a href="../login.html" class="btn px-4 py-2 rounded-3 fw-semibold text-white" style="background-color: #a100ff;">Iniciar sesión</a>
      </div>
    `;
    return;
  }

  if (carrito.length === 0) {
    wrapper.innerHTML = `
      <div class="text-center py-5 my-5">
        <div class="mb-3">
          <i class="fa-solid fa-cart-shopping display-3 text-secondary" style="color: #4a4b5d !important;"></i>
        </div>
        <h2 class="text-white fw-bold mb-2 fs-3">Tu carrito está vacío</h2>
        <p class="text-secondary mb-4 small">Agrega mangas desde el catálogo para continuar</p>
        <a href="../catalogo/catalogo.html" class="btn px-4 py-2 rounded-3 fw-semibold text-white" style="background-color: #a100ff;">Ir al catálogo</a>
      </div>
    `;
    return;
  }

  const subtotalBruto = carrito.reduce((acc, item) => acc + (item.precio * (item.quantity || 1)), 0);
  const maxPuntosCanjeables = Math.min(usuarioActual.puntos, subtotalBruto);

  wrapper.innerHTML = `
    <div class="row g-4">
      
      <div class="col-lg-8 space-y-3">
        ${carrito.map(item => `
          <div class="cart-item-card p-3 rounded-4 d-flex align-items-center gap-3 mb-3" style="background-color: #12131f; border: 1px solid rgba(255,255,255,0.03);">
            <img src="../${item.imagen}" alt="${item.titulo}" class="rounded-3 shrink-0" style="width: 52px; height: 72px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/52x72/3b1754/ffffff?text=Manga';" />
            
            <div class="flex-grow-1 min-w-0">
              <h6 class="text-white fw-semibold mb-1 text-truncate">${item.titulo}</h6>
              <p class="text-secondary small mb-0">${item.demografia || 'Manga'} · Formato Físico</p>
              
              <div class="d-flex align-items-center mt-2 gap-2">
                <button class="btn btn-sm btn-outline-secondary px-2 py-0" onclick="modificarCantidad(${item.id}, -1)">-</button>
                <span class="text-white small fw-bold">${item.quantity || 1}</span>
                <button class="btn btn-sm btn-outline-secondary px-2 py-0" onclick="modificarCantidad(${item.id}, 1)">+</button>
              </div>
            </div>

            <div class="text-end shrink-0">
              <p class="text-white fw-bold mb-1">${formatearCLP(item.precio * (item.quantity || 1))}</p>
              <button onclick="eliminarDelCarrito(${item.id})" class="btn btn-link text-secondary p-0 text-decoration-none hover-danger mt-1" title="Eliminar producto">
                <i class="fa-regular fa-trash-can small text-danger"></i>
              </button>
            </div>
          </div>
        `).join('')}
      </div>

      
      <div class="col-lg-4">
        <div class="p-4 rounded-4 sticky-top" style="background-color: #12131f; border: 1px solid rgba(255,255,255,0.03); top: 90px;">
          <h5 class="text-white fw-semibold mb-4 fs-6">Resumen del pedido</h5>

          <div class="d-flex justify-content-between text-secondary small mb-3">
            <span>Subtotal (${carrito.reduce((acc, item) => acc + (item.quantity || 1), 0)} items)</span>
            <span class="text-white fw-medium">${formatearCLP(subtotalBruto)}</span>
          </div>

          
          <div class="border-top border-secondary border-opacity-20 pt-3 mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="d-flex align-items-center gap-2">
                <i class="fa-solid fa-star small" style="color: #c026d3;"></i>
                <span class="text-white small fw-medium">Usar puntos</span>
              </div>
              <span class="text-secondary extra-small">Disponibles: ${usuarioActual.puntos.toLocaleString('es-CL')}</span>
            </div>

            <input type="range" id="puntos-slider" min="0" max="${maxPuntosCanjeables}" step="100" value="${puntosAplicar}" class="w-100 custom-range mb-2" oninput="actualizarDescuentoPuntos(this.value, ${subtotalBruto})" />

            <div class="d-flex justify-content-between text-secondary" style="font-size: 0.75rem;">
              <span>0 pts</span>
              <span id="label-descuento-puntos" style="color: #c026d3;" class="fw-semibold">
                ${puntosAplicar > 0 ? `-${formatearCLP(puntosAplicar)}` : 'Sin descuento'}
              </span>
              <span>${maxPuntosCanjeables.toLocaleString('es-CL')} pts</span>
            </div>
          </div>

          
          <div id="desglose-totales" class="border-top border-secondary border-opacity-20 pt-3 mb-4 space-y-2">
            
          </div>

          <button onclick="simularPago()" class="btn w-100 py-3 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2 text-white" style="background-color: #a100ff; border: none;">
            <i class="fa-solid fa-bag-shopping"></i> Pagar ahora (simulado)
          </button>
        </div>
      </div>
    </div>
  `;

  recalcularTotales(subtotalBruto);
}

function modificarCantidad(id, cambio) {
  let carrito = obtenerCarrito();
  const index = carrito.findIndex(item => item.id === id);
  if (index !== -1) {
    carrito[index].quantity = (carrito[index].quantity || 1) + cambio;
    if (carrito[index].quantity <= 0) {
      carrito.splice(index, 1);
    }
    guardarCarrito(carrito);
    renderizarCarrito();
  }
}

function actualizarDescuentoPuntos(val, subtotalBruto) {
  puntosAplicar = Number(val);
  const label = document.getElementById('label-descuento-puntos');
  if (label) {
    label.textContent = puntosAplicar > 0 ? `-${formatearCLP(puntosAplicar)}` : 'Sin descuento';
  }
  recalcularTotales(subtotalBruto);
}

function recalcularTotales(subtotalBruto) {
  const descuentoPuntos = Math.min(puntosAplicar, subtotalBruto);
  const totalConDescuento = subtotalBruto - descuentoPuntos;
  const subtotalNeto = Math.round(totalConDescuento / 1.19);
  const iva = totalConDescuento - subtotalNeto;

  const contenedorTotales = document.getElementById('desglose-totales');
  if (!contenedorTotales) return;

  contenedorTotales.innerHTML = `
    ${descuentoPuntos > 0 ? `
      <div class="d-flex justify-content-between small text-secondary mb-2">
        <span>Descuento puntos</span>
        <span class="text-success">-${formatearCLP(descuentoPuntos)}</span>
      </div>
    ` : ''}
    <div class="d-flex justify-content-between small text-secondary mb-2">
      <span>Subtotal neto</span>
      <span class="text-white">${formatearCLP(subtotalNeto)}</span>
    </div>
    <div class="d-flex justify-content-between small text-secondary mb-2">
      <span>IVA (19%)</span>
      <span class="text-white">${formatearCLP(iva)}</span>
    </div>
    <div class="d-flex justify-content-between fw-bold fs-6 pt-2 border-top border-secondary border-opacity-20">
      <span class="text-white">Total</span>
      <span style="color: #c026d3;">${formatearCLP(totalConDescuento)}</span>
    </div>
  `;
}

function eliminarDelCarrito(id) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito(carrito);
  puntosAplicar = 0;
  renderizarCarrito();
}

function simularPago() {
  const carrito = obtenerCarrito();
  if (carrito.length === 0) return;

  const subtotalBruto = carrito.reduce((acc, item) => acc + (item.precio * (item.quantity || 1)), 0);
  const descuentoPuntos = Math.min(puntosAplicar, subtotalBruto);
  const totalConDescuento = subtotalBruto - descuentoPuntos;
  const subtotalNeto = Math.round(totalConDescuento / 1.19);
  const iva = totalConDescuento - subtotalNeto;

  const boletaItemsContainer = document.getElementById('boleta-items-container');
  if (boletaItemsContainer) {
    boletaItemsContainer.innerHTML = carrito.map(item => `
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="text-white fw-semibold small">${item.titulo} <span class="text-secondary fw-normal">(x${item.quantity || 1})</span></span>
        <span class="text-white fw-bold small">${formatearCLP(item.precio * (item.quantity || 1))}</span>
      </div>
    `).join('');
  }

  document.getElementById('boleta-subtotal-neto').textContent = formatearCLP(subtotalNeto);
  document.getElementById('boleta-iva').textContent = formatearCLP(iva);
  document.getElementById('boleta-total').textContent = formatearCLP(totalConDescuento);

  const fechaActual = new Date().toISOString().split('T')[0];
  const folioRandom = Math.floor(10000 + Math.random() * 90000);
  document.getElementById('boleta-folio').textContent = `N° MF-${folioRandom}`;
  document.getElementById('boleta-fecha').textContent = fechaActual;

  const modalElement = document.getElementById('boletaModal');
  if (modalElement) {
    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
  }
}

function cerrarBoleta() {
  guardarCarrito([]);
  puntosAplicar = 0;
  renderizarCarrito();
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarCarrito();
});