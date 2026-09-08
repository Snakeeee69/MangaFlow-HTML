document.addEventListener('DOMContentLoaded', () => {
    const mangasData = {
        "Ivrea": [
            { title: "One Piece", 
                genres: "Aventura · Acción · Shōnen", 
                desc: "Monkey D. Luffy sueña con convertirse en el Rey de los Piratas. Con su cuerpo de...", 
                priceF: "9.990", 
                priceD: "3.990", 
                tag: "NUEVO", 
                cat: "SHŌNEN", 
                img: "../images/catalogo/One_Piece_01.jpg" 
            },
            { title: "Demon Slayer", 
                genres: "Acción · Sobrenatural · Shōnen", 
                desc: "Tanjiro Kamado se convierte en cazador de demonios para vengar a su familia y salvar...", 
                priceF: "9.990", 
                priceD: "3.990", 
                tag: "NUEVO", 
                cat: "SHŌNEN", 
                img: "../images/catalogo/Demon_Slayer_01.jpg" 
            },
            { title: "Spy x Family", 
                genres: "Comedia · Espionaje · Shōnen", 
                desc: "El espía Loid Forger debe crear una familia falsa para completar una misión. Sin saber...", 
                priceF: "9.990", 
                priceD: "3.990", 
                tag: "", 
                cat: "SHŌNEN", 
                img: "../images/catalogo/Spy_x_family_1.png" 
            },
            { title: "Yofukashi no Uta", 
                genres: "Romance · Sobrenatural · Shōnen", 
                desc: "Kou Yamori sale a caminar de noche incapaz de dormir y conoce a Nazuna...", 
                priceF: "9.990", 
                priceD: "3.990", 
                tag: "NUEVO", 
                cat: "SHŌNEN", 
                img: "../images/catalogo/yofukashi_no_uta.jpg" 
            },
            { title: "Kaguya-sama - Love Is War", 
                genres: "Romance · Comedia · Seinen", 
                desc: "Kaguya Shinomiya y Miyuki Shirogane son los estudiantes más brillantes de su escuel...", 
                priceF: "9.990", 
                priceD: "3.990", 
                tag: "NUEVO", 
                cat: "SEINEN", 
                img: "../images/catalogo/Kaguya_sama_arg_01.jpg" 
            }
        ],
        "Norma": [
            { title: "Attack on Titan", 
                genres: "Acción · Drama · Shōnen", 
                desc: "La humanidad vive aterrorizada dentro de muros gigantescos que la protegen de los...", 
                priceF: "10.990", 
                priceD: "4.490", 
                tag: "", 
                cat: "SHŌNEN", 
                img: "../images/catalogo/ataque_a_los_titanes_1.jpg" 
            },
            { title: "KonoSuba", 
                genres: "Comedia · Fantasy · Shōnen", 
                desc: "Kazuma Satou muere en un accidente ridículo y es enviado a un mundo de...", 
                priceF: "9.490", 
                priceD: "3.990", 
                tag: "", 
                cat: "SHŌNEN", 
                img: "../images/catalogo/Konosuba_arg_01.jpg"
            },
            { title: "Mato Seihei no Slave", 
                genres: "Acción · Fantasy · Seinen", 
                desc: "Yuuki Wakura es arrastrado al mundo de Mato, una dimensión peligrosa llena de...", 
                priceF: "10.490", 
                priceD: "4.290", 
                tag: "NUEVO", 
                cat: "SEINEN", 
                img: "../images/catalogo/Demon_slave_01.jpg" 
            }
        ],
        "Panini": [
            { title: "Naruto", 
                genres: "Acción · Aventura · Shōnen", 
                desc: "Naruto Uzumaki, un joven ninja con el zorro de nueve colas sellado en su interior, luch...", 
                priceF: "8.990", 
                priceD: "3.490", 
                tag: "", 
                cat: "SHŌNEN", 
                img: "../images/catalogo/naruto_tomo_1.png" 
            },
            { title: "Jujutsu Kaisen", 
                genres: "Acción · Sobrenatural · Shōnen", 
                desc: "Yuji Itadori ingiere un dedo del maldito Ryomen Sukuna para salvar a sus...", 
                priceF: "10.490", 
                priceD: "4.290", 
                tag: "NUEVO", 
                cat: "SHŌNEN", 
                img: "../images/catalogo/xJujutsu_kaisen_arg_01.jpg" 
            },
            { title: "Atom: The Beginning", 
                genres: "Ciencia Ficción · Aventura · Shōnen", 
                desc: "Precuela del clásico Astro Boy de Osamu Tezuka. Los jóvenes científicos Tenma y...", 
                priceF: "9.990", 
                priceD: "3.990", 
                tag: "", 
                cat: "SHŌNEN", 
                img: "../images/catalogo/Atom_the_beginning_1.png" 
            },
            { title: "Berserk", 
                genres: "Dark Fantasy · Acción · Seinen", 
                desc: "Guts, el guerrero de la espada negra, recorre un mundo medieval oscuro...", 
                priceF: "14.990", 
                priceD: "5.490", 
                tag: "", 
                cat: "SEINEN", 
                img: "../images/catalogo/Berserk.png" 
            },
            { title: "Las Quintillizas", 
                genres: "Romance · Comedia · Shōnen", 
                desc: "Fuutarou Uesugi es contratado como tutor de cinco quintillizas idénticas pero muy...", 
                priceF: "9.990", 
                priceD: "3.990", 
                tag: "NUEVO", 
                cat: "SHŌNEN", 
                img: "../images/catalogo/Las_quintillizas_1.png" 
            },
            { title: "Bakemonogatari", 
                genres: "Sobrenatural · Misterio · Seinen", 
                desc: "Koyomi Araragi, un estudiante de secundaria que sobrevivió un ataque...", 
                priceF: "10.990", 
                priceD: "4.490", 
                tag: "", 
                cat: "SEINEN", 
                img: "../images/catalogo/Bakemonogatari_1.png" 
            }
        ],
        "Planeta": [
            { title: "Vinland Saga", 
                genres: "Histórico · Acción · Seinen", 
                desc: "Thorfinn, hijo de un legendario guerrero vikingo, busca venganza contra Askeladd...", 
                priceF: "12.990", 
                priceD: "4.990", 
                tag: "", 
                cat: "SEINEN", 
                img: "../images/mangas/vinland_saga.png" 
            }
        ]
    };

    const mangasGrid = document.getElementById('mangas-grid');
    const resultsTitle = document.getElementById('results-title');
    const editorialCards = document.querySelectorAll('.editorial-card');

    const renderMangas = (publisher) => {
        const obras = mangasData[publisher] || [];
        
        resultsTitle.textContent = `Obras disponibles (${obras.length})`;
        mangasGrid.innerHTML = '';

        obras.forEach(manga => {
            const tagHtml = manga.tag ? `<span class="tag-nuevo">${manga.tag}</span>` : '';
            
            const cardHTML = `
                <div class="col">
                    <div class="manga-card-editorial p-2">
                        <div class="manga-img-container rounded-3 mb-3">
                            ${tagHtml}
                            <button class="btn-heart"><i class="fa-regular fa-heart"></i></button>
                            <img src="${manga.img}" alt="${manga.title}" onerror="this.src='https://via.placeholder.com/300x420/1a1c29/d178ff?text=No+Image'; this.onerror=null;" />
                            <div class="tag-category-overlay">
                                <strong>${manga.title}</strong><br>
                                <span style="font-size:0.65rem; color:#a1a1aa;">${manga.cat}</span>
                            </div>
                        </div>
                        <div class="px-2 d-flex flex-column flex-grow-1">
                            <h6 class="text-white fw-bold mb-1 text-truncate" title="${manga.title}">${manga.title}</h6>
                            <p class="text-secondary mb-2" style="font-size: 0.7rem;">${manga.genres}</p>
                            <p class="text-secondary mb-3" style="font-size: 0.75rem; line-height: 1.3; flex-grow: 1;">${manga.desc}</p>
                            
                            <div class="d-flex justify-content-between align-items-end mt-auto">
                                <div>
                                    <h6 class="text-white fw-bold mb-0">$${manga.priceF}</h6>
                                    <span class="text-secondary" style="font-size: 0.65rem;">Digital: $${manga.priceD}</span>
                                </div>
                                <div class="d-flex gap-2">
                                    <button class="btn btn-sm text-secondary p-1 hover-purple"><i class="fa-solid fa-book-open"></i></button>
                                    <button class="btn btn-sm text-secondary p-1 hover-purple"><i class="fa-solid fa-cart-shopping" style="color: #d178ff;"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            mangasGrid.insertAdjacentHTML('beforeend', cardHTML);
        });
    };

    editorialCards.forEach(card => {
        card.addEventListener('click', () => {
            editorialCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            const selectedPublisher = card.getAttribute('data-publisher');
            renderMangas(selectedPublisher);
        });
    });

    renderMangas('Ivrea');
});