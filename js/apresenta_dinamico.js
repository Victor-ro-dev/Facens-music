document.addEventListener("DOMContentLoaded", async () => {
    // Obtém o parâmetro 'genre' da URL
    const params = new URL(window.location).searchParams;
    const genre = params.get("genre");

    // Exibe o nome do gênero na página
    const genreTitle = document.getElementById("genre-title");
    genreTitle.textContent = genre ? `Músicas de ${genre}` : "Todas as Músicas";

    // Função para carregar e filtrar o JSON das músicas
    async function loadAndDisplayMusic() {
        try {
            // Carrega o JSON de músicas
            const response = await fetch("/json/musicas.json");
            const musics = await response.json();

            // Filtra as músicas pela categoria do gênero, se definido
            const filteredMusics = genre 
                ? musics.filter(music => music.categoria.toLowerCase() === genre.toLowerCase())
                : musics; // Se não houver gênero, mostra todas as músicas

            // Adiciona os cards das músicas filtradas
            const musicContainer = document.getElementById("music-container");
            musicContainer.innerHTML = ''; // Limpa o container antes de adicionar novas músicas

            filteredMusics.forEach(music => {
                const card = document.createElement("div");
                card.className = 'card bg-dark text-white mb-5 mt-5';
                card.style.width = '300px';

                // Estrutura do card com imagem, título, e outras informações
                card.innerHTML = `
                    <img src="${music.capa}" class="card-img-top" alt="${music.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${music.titulo}</h5>
                        <p class="card-text"><strong>Autor:</strong> ${music.autor}</p>
                        <p class="card-text"><strong>Álbum:</strong> ${music.album}</p>
                        <p class="card-text"><strong>Categoria:</strong> ${music.categoria}</p>
                        <p class="card-text"><strong>Duração:</strong> ${music.duracao}</p>
                        <p class="card-text"><strong>Resenha:</strong> ${music.resenha}</p>
                        <p class="card-text"><strong>Score:</strong> ${music.score} / 5</p>
                    </div>
                `;
                musicContainer.appendChild(card);
            });
        } catch (error) {
            console.error("Erro ao carregar o JSON das músicas:", error);
        }
    }

    // Função para ordenar músicas em ordem alfabética
    function sortMusicsAlphabetically() {
        const musicContainer = document.getElementById("music-container");
        const cards = Array.from(musicContainer.children);

        // Ordena os cards pelo título
        cards.sort((a, b) => {
            const titleA = a.querySelector('.card-title').textContent.toLowerCase();
            const titleB = b.querySelector('.card-title').textContent.toLowerCase();
            return titleA.localeCompare(titleB);
        });

        // Limpa o container e adiciona os cards ordenados
        musicContainer.innerHTML = '';
        cards.forEach(card => musicContainer.appendChild(card));
    }

    // Carrega e exibe as músicas filtradas pela categoria
    await loadAndDisplayMusic();

    // Adiciona o evento de click para o botão de ordenar
    document.getElementById("ordenar-titulo").addEventListener("click", sortMusicsAlphabetically);
});

document.addEventListener("DOMContentLoaded", () => {
    // Função para criar Swiper com base no gênero
    function createSwiperByGenre(genre) {
        // Dados de exemplo das bandas
        const bandsData = {
            rock: [
                {
                    nome: "METÁLICA",
                    imagem: "https://wallpaperset.com/w/full/7/9/f/144683.jpg",
                    link: "/tempaltes/musicas/musicas_geral.html?genre=rock"
                },
                {
                    nome: "GUNS N´ ROSES",
                    imagem: "https://wallpapercave.com/wp/wp1883296.png",
                    link: "#"
                },
                {
                    nome: "LINKIN PARK",
                    imagem: "https://images7.alphacoders.com/542/thumb-1920-542373.png",
                    link: "#"
                }
            ],
            pagode: [
                {
                    nome: "TURMA DO PAGODE",
                    imagem: "https://via.placeholder.com/300x200?text=Turma+do+Pagode",
                    link: "/tempaltes/musicas/musicas_geral.html?genre=pagode"
                },
                {
                    nome: "EXALTASAMBA",
                    imagem: "https://via.placeholder.com/300x200?text=Exaltasamba",
                    link: "#"
                },
                {
                    nome: "SOUZA",
                    imagem: "https://via.placeholder.com/300x200?text=Souza",
                    link: "#"
                }
            ],
            hiphop: [
                {
                    nome: "TURMA DO PAGODE",
                    imagem: "https://via.placeholder.com/300x200?text=Turma+do+Pagode",
                    link: "/tempaltes/musicas/musicas_geral.html?genre=hip-hop"
                },
                {
                    nome: "EXALTASAMBA",
                    imagem: "https://via.placeholder.com/300x200?text=Exaltasamba",
                    link: "#"
                },
                {
                    nome: "SOUZA",
                    imagem: "https://via.placeholder.com/300x200?text=Souza",
                    link: "#"
                }
            ],
            funk: [
                {
                    nome: "TURMA DO PAGODE",
                    imagem: "https://via.placeholder.com/300x200?text=Turma+do+Pagode",
                    link: "/tempaltes/musicas/musicas_geral.html?genre=funk"
                },
                {
                    nome: "EXALTASAMBA",
                    imagem: "https://via.placeholder.com/300x200?text=Exaltasamba",
                    link: "#"
                },
                {
                    nome: "SOUZA",
                    imagem: "https://via.placeholder.com/300x200?text=Souza",
                    link: "#"
                }
            ]

        };

        const swiperWrapper = document.querySelector("#swiper-bands .swiper-wrapper");
        swiperWrapper.innerHTML = ''; // Limpa o conteúdo existente

        // Verifica se o gênero existe nos dados
        if (bandsData[genre]) {
            bandsData[genre].forEach(band => {
                const slide = document.createElement("div");
                slide.className = "swiper-slide";
                slide.innerHTML = `
                    <h1>${band.nome}</h1>
                    <div class="picture">
                        <a href="${band.link}"><img src="${band.imagem}" alt="${band.nome}"></a>
                    </div>
                `;
                swiperWrapper.appendChild(slide);
            });
        } else {
            console.error(`Gênero '${genre}' não encontrado!`);
        }

        // Inicializa o Swiper
        var swiper = new Swiper(".swiper-container", {
            effect: "coverflow",
            centeredSlides: true,
            slidesPerView: "auto",
            coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 350,
                modifier: 1,
                slideShadows: true
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            // Desabilitando o arrasto com o mouse
            grabCursor: false,
            touchRatio: 0 // Configurando para não permitir arrastar
        });
    }

    // Exemplo de uso da função
    createSwiperByGenre('rock'); // Substitua 'rock' pelo gênero desejado
});

