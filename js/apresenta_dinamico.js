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
