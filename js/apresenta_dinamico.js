document.addEventListener("DOMContentLoaded", async () => {
    // Obtém o parâmetro 'genre' da URL
    const params = new URL(window.location).searchParams;
    const genre = params.get("genre");

    // Exibe o nome do gênero na página
    const genreTitle = document.getElementById("genre-title");
    genreTitle.textContent = genre ? `Músicas de ${genre.charAt(0).toUpperCase() + genre.slice(1)}` : "Todas as Músicas";

    // Função para carregar e filtrar o JSON das músicas
    async function loadAndDisplayMusic() {
        try {
            const response = await fetch("/json/musicas.json");
            const musics = await response.json();

            const filteredMusics = genre
                ? musics.filter(music => music.categoria.toLowerCase() === genre.toLowerCase())
                : musics; // Se não houver gênero, mostra todas as músicas

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

            document.getElementById("ordenar-titulo").addEventListener("click", sortMusicsAlphabetically);
            
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

    // Função para criar Swiper com base no gênero
    function createSwiperByGenre(genre) {
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
            funk: [
                {
                    nome: "MC HARIEL",
                    imagem: "https://sobrefunk.com/wp-content/uploads/2020/12/hariel-poltrona-01.jpg",
                    link: "/tempaltes/musicas/musicas_geral.html?genre=funk"
                },
                {
                    nome: "MC DALESTE",
                    imagem: "https://s2.sscdn.co/uploadfile/letras/fotos/b/5/b/e/b5bee534a2a3f46dc858556d6fdb4fbf.jpg",
                    link: "#"
                },
                {
                    nome: "MC GUIME",
                    imagem: "https://portalpopline.com.br/wp-content/uploads/2022/10/MC-Guime-Foto-julianapeduttifotografia-Divulgacao.jpg",
                    link: "#"
                }
            ],
            pagode: [
                {
                    nome: "TURMA DO PAGODE",
                    imagem: "https://akamai.sscdn.co/uploadfile/letras/albuns/b/3/0/0/228381441134930.jpg",
                    link: "/tempaltes/musicas/musicas_geral.html?genre=pagode"
                },
                {
                    nome: "PÉRICLES",
                    imagem: "https://lorena.r7.com/public/assets/img/galeria-imagens/lorena64df938ee1f0f.webp",
                    link: "#"
                },
                {
                    nome: "THIAGUINHO",
                    imagem: "https://www.joaoalberto.com/wp-content/uploads/2017/01/12/thiaguinho-tardezinha.jpg",
                    link: "#"
                }
            ],
            rap: [
                {
                    nome: "RACIONAIS",
                    imagem: "https://wallpapercave.com/wp/wp2220583.jpg",
                    link: "/tempaltes/musicas/musicas_geral.html?genre=rap"
                },
                {
                    nome: "MV BILL",
                    imagem: "https://web.portalsucesso.com.br/wp-content/uploads/2023/07/mv-bill-capa-1.png",
                    link: "#"
                },
                {
                    nome: "LEALL",
                    imagem: "https://midias.correiobraziliense.com.br/_midias/jpg/2023/12/13/2aljncx17mnyjttmh5jkamwzcyj581q3gvptn6ej3n1sujt1lqdwpuulbknayj8j2gju4jpngiqvrclrwhawreprw3g6y__gn2nwhgaqfb0fb31wxad1xypscpig7yvrmijfq4fbyaappfo9qmec0w-33259890.jpeg",
                    link: "#"
                }
            ]
        };

        const swiperWrapper = document.querySelector("#swiper-bands .swiper-wrapper");
        swiperWrapper.innerHTML = ''; 

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
        });
        
       
    }

    await loadAndDisplayMusic();
    if (genre) {
        createSwiperByGenre(genre);
    } 
document.getElementById("ordenar-titulo").addEventListener("click", sortMusicsAlphabetically);
});


