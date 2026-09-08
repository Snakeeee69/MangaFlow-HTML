document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Verificación de Seguridad Crítica: 
    // Si el elemento 'editorial-title' no existe en esta página, abortamos la ejecución.
    // Esto evita que el script rompa el index.html u otras páginas si se importa accidentalmente.
    const editorialTitle = document.getElementById('editorial-title');
    if (!editorialTitle) {
        return; 
    }

    // 2. Base de datos estática
    const editorialesData = {
        "ivrea": {
            nombre: "Ivrea Argentina",
            pais: "Argentina",
            obrasCount: 7,
            logo: "../images/editoriales/ivrea_argentina.png",
            descripcion: "Una de las editoriales más importantes de manga en Latinoamérica. Con más de 25 años de experiencia, Ivrea ha traído al público hispanohablante series icónicas."
        },
        "panini": {
            nombre: "Panini Manga",
            pais: "México/España",
            obrasCount: 6,
            logo: "../images/editoriales/panini_manga.jpg",
            descripcion: "Editorial multinacional con fuerte presencia en el mercado latinoamericano. Panini Manga distribuye series de Shueisha y Kodansha."
        },
        "norma": {
            nombre: "Norma Editorial",
            pais: "España",
            obrasCount: 3,
            logo: "../images/editoriales/norma_editorial.png",
            descripcion: "Editorial española con larga trayectoria en el mundo del cómic y el manga. Sus ediciones en castellano neutro son apreciadas por coleccionistas."
        },
        "planeta": {
            nombre: "Planeta Comics",
            pais: "España",
            obrasCount: 1,
            logo: "../images/editoriales/planeta_comics.png",
            descripcion: "Sello editorial de Planeta DeAgostini especializado en cómics y manga. Reconocidos por sus ediciones de lujo y colecciones especiales."
        }
    };

    // 3. Leer el parámetro 'id' de la URL (ej: editorialDetalle.html?id=panini)
    const urlParams = new URLSearchParams(window.location.search);
    let idEditorial = urlParams.get('id');

    // Asignar Ivrea por defecto si no hay ID válido
    if (!idEditorial || !editorialesData[idEditorial]) {
        idEditorial = 'ivrea';
    }

    const editorial = editorialesData[idEditorial];

    // 4. Inyectar datos en el DOM de forma segura
    editorialTitle.textContent = editorial.nombre;
    
    const descElement = document.getElementById('editorial-desc');
    if (descElement) descElement.textContent = editorial.descripcion;
    
    const breadcrumbElement = document.getElementById('breadcrumb-editorial-name');
    if (breadcrumbElement) breadcrumbElement.textContent = editorial.nombre;
    
    const paisElement = document.getElementById('editorial-pais');
    if (paisElement) paisElement.textContent = editorial.pais;
    
    const contadorElement = document.getElementById('contador-obras');
    if (contadorElement) contadorElement.textContent = `Mostrando ${editorial.obrasCount} obras disponibles`;
    
    const logoElement = document.getElementById('editorial-logo');
    if (logoElement) {
        logoElement.src = editorial.logo;
        logoElement.alt = `Logo de ${editorial.nombre}`;
    }
});