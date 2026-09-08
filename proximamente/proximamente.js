document.addEventListener('DOMContentLoaded', () => {
  // Datos iniciales
  let peticiones = [
    {
      id: 'p1',
      titulo: 'Chainsaw Man',
      descripcion: 'El manga de Tatsuki Fujimoto sobre Denji y sus aventuras como cazador de demonios. Seria increible tenerlo en fisico.',
      autor: 'Carlos M.',
      votos: 47,
      yaVote: false,
      fecha: '2026-05-10',
    },
    {
      id: 'p2',
      titulo: 'Blue Lock',
      descripcion: 'Manga de futbol con una premisa unica: 300 delanteros encerrados compitiendo por un cupo en la seleccion japonesa.',
      autor: 'Valentina R.',
      votos: 34,
      yaVote: false,
      fecha: '2026-05-18',
    },
    {
      id: 'p3',
      titulo: 'Dungeon Meshi',
      descripcion: 'Delicious in Dungeon, el manga de cocina y fantasia que se convirtio en anime. Los tomos fisicos son hermosos.',
      autor: 'Tomas G.',
      votos: 29,
      yaVote: false,
      fecha: '2026-06-01',
    },
  ];

  // Elementos del DOM
  const listaPeticiones = document.getElementById('lista-peticiones');
  const peticionesCount = document.getElementById('peticiones-count');
  const formPeticion = document.getElementById('form-peticion');
  const inputTitulo = document.getElementById('input-titulo');
  const inputDescripcion = document.getElementById('input-descripcion');
  const errorTitulo = document.getElementById('error-titulo');
  const mensajeExito = document.getElementById('mensaje-exito');

  // Renderizar la lista
  function renderPeticiones() {
    // Ordenar por votos descendente
    const ordenadas = [...peticiones].sort((a, b) => b.votos - a.votos);

    peticionesCount.textContent = `${peticiones.length} peticiones`;
    listaPeticiones.innerHTML = '';

    ordenadas.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'p-3 rounded-3 d-flex gap-3 align-items-start';
      card.style.backgroundColor = '#12131f';
      card.style.border = '1px solid rgba(255, 255, 255, 0.05)';

      const activeClass = p.yaVote
        ? 'style="background-color: rgba(192, 38, 211, 0.15); color: #c026d3; border: none;"'
        : 'style="background-color: rgba(255, 255, 255, 0.05); color: #676767; border: none;"';

      card.innerHTML = `
        <span class="text-secondary small fw-bold pt-1" style="width: 20px; shrink: 0;">#${i + 1}</span>

        <button
          type="button"
          class="btn btn-votar d-flex flex-column align-items-center p-2 rounded-2"
          data-id="${p.id}"
          ${activeClass}
        >
          <i class="fa-solid fa-chevron-up"></i>
          <span class="small fw-bold">${p.votos}</span>
        </button>

        <div class="flex-grow-1 min-w-0">
          <p class="text-white fw-semibold small mb-1">${escapeHtml(p.titulo)}</p>
          ${
            p.descripcion
              ? `<p class="text-secondary small mb-2" style="font-size: 0.75rem; line-height: 1.5;">${escapeHtml(p.descripcion)}</p>`
              : ''
          }
          <div class="d-flex align-items-center gap-3">
            <span class="text-secondary" style="font-size: 10px;">por ${escapeHtml(p.autor)}</span>
            <span class="text-secondary" style="font-size: 10px;">${p.fecha}</span>
          </div>
        </div>
      `;

      listaPeticiones.appendChild(card);
    });

    // Agregar listeners a los botones de voto
    document.querySelectorAll('.btn-votar').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        votar(id);
      });
    });
  }

  // Acción de votar
  function votar(id) {
    peticiones = peticiones.map(p => {
      if (p.id === id) {
        return {
          ...p,
          votos: p.yaVote ? p.votos - 1 : p.votos + 1,
          yaVote: !p.yaVote
        };
      }
      return p;
    });
    renderPeticiones();
  }

  // Sanitización simple
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Manejo de formulario
  formPeticion.addEventListener('submit', (e) => {
    e.preventDefault();
    const tituloVal = inputTitulo.value.trim();

    if (!tituloVal) {
      errorTitulo.textContent = 'El título es obligatorio.';
      errorTitulo.classList.remove('d-none');
      return;
    }

    errorTitulo.classList.add('d-none');

    const nueva = {
      id: `p-${Date.now()}`,
      titulo: tituloVal,
      descripcion: inputDescripcion.value.trim(),
      autor: 'Tú',
      votos: 1,
      yaVote: true,
      fecha: new Date().toISOString().split('T')[0],
    };

    peticiones.unshift(nueva);
    inputTitulo.value = '';
    inputDescripcion.value = '';

    renderPeticiones();

    mensajeExito.classList.remove('d-none');
    setTimeout(() => {
      mensajeExito.classList.add('d-none');
    }, 3500);
  });

  // Inicialización
  renderPeticiones();
});