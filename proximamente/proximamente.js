document.addEventListener('DOMContentLoaded', () => {
  let peticiones = [
    {
      id: 'p1',
      titulo: 'Chainsaw Man',
      descripcion: 'El manga de Tatsuki Fujimoto sobre Denji y sus aventuras como cazador de demonios. Sería increíble tenerlo en físico.',
      autor: 'Carlos M.',
      votos: 47,
      yaVote: false,
      fecha: '2026-05-10',
    },
    {
      id: 'p2',
      titulo: 'Blue Lock',
      descripcion: 'Manga de fútbol con una premisa única: 300 delanteros encerrados compitiendo por un cupo en la selección japonesa.',
      autor: 'Valentina R.',
      votos: 34,
      yaVote: false,
      fecha: '2026-05-18',
    },
    {
      id: 'p3',
      titulo: 'Dungeon Meshi',
      descripcion: 'Delicious in Dungeon, el manga de cocina y fantasía que se convirtió en anime. Los tomos físicos son hermosos.',
      autor: 'Tomás G.',
      votos: 29,
      yaVote: false,
      fecha: '2026-06-01',
    },
  ];

  const peticionesContainer = document.getElementById('peticiones-list');
  const peticionesCount = document.getElementById('peticiones-count');
  const formPeticion = document.getElementById('form-peticion');
  const inputTitulo = document.getElementById('titulo');
  const inputDescripcion = document.getElementById('descripcion');
  const errorTitulo = document.getElementById('error-titulo');
  const alertExito = document.getElementById('alert-exito');

  function renderPeticiones() {
    peticionesCount.textContent = `${peticiones.length} peticiones`;
    
    // Ordenar por número de votos descendente
    const ordenadas = [...peticiones].sort((a, b) => b.votos - a.votos);

    peticionesContainer.innerHTML = ordenadas.map((p, index) => `
      <div class="p-3 rounded-3 d-flex align-items-start gap-3" style="background-color: #12131f; border: 1px solid rgba(255, 255, 255, 0.05);">
        <span class="text-secondary fw-bold small" style="width: 24px;">#${index + 1}</span>

        <button
          onclick="votarPeticion('${p.id}')"
          class="btn d-flex flex-column align-items-center justify-content-center p-2 rounded-3 border-0 transition-all"
          style="background-color: ${p.yaVote ? 'rgba(192, 38, 211, 0.15)' : 'rgba(255, 255, 255, 0.05)'}; color: ${p.yaVote ? '#c026d3' : '#676767'}; min-width: 44px;"
        >
          <i class="fa-solid fa-chevron-up fs-6"></i>
          <span class="fw-bold extra-small mt-1">${p.votos}</span>
        </button>

        <div class="flex-grow-1">
          <p class="text-white fw-semibold small mb-1">${p.titulo}</p>
          ${p.descripcion ? `<p class="text-secondary extra-small leading-relaxed mb-2">${p.descripcion}</p>` : ''}
          <div class="d-flex align-items-center gap-3">
            <span class="text-secondary opacity-50" style="font-size: 0.7rem;">por ${p.autor}</span>
            <span class="text-secondary opacity-50" style="font-size: 0.7rem;">${p.fecha}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  window.votarPeticion = function(id) {
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
  };

  formPeticion.addEventListener('submit', (e) => {
    e.preventDefault();
    const tituloVal = inputTitulo.value.trim();
    const descripcionVal = inputDescripcion.value.trim();

    if (!tituloVal) {
      errorTitulo.textContent = 'El título es obligatorio.';
      errorTitulo.classList.remove('d-none');
      return;
    }

    errorTitulo.classList.add('d-none');

    const nueva = {
      id: `p-${Date.now()}`,
      titulo: tituloVal,
      descripcion: descripcionVal,
      autor: 'Tú',
      votos: 1,
      yaVote: true,
      fecha: new Date().toISOString().split('T')[0]
    };

    peticiones.unshift(nueva);
    renderPeticiones();

    inputTitulo.value = '';
    inputDescripcion.value = '';

    alertExito.classList.remove('d-none');
    alertExito.classList.add('d-flex');

    setTimeout(() => {
      alertExito.classList.add('d-none');
      alertExito.classList.remove('d-flex');
    }, 3500);
  });

  inputTitulo.addEventListener('input', () => {
    if (inputTitulo.value.trim()) {
      errorTitulo.classList.add('d-none');
    }
  });

  renderPeticiones();
});