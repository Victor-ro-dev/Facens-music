document.addEventListener("DOMContentLoaded", async () => {
    // Obtém o parâmetro 'genre' da URL
    const params = new URL(window.location).searchParams;
    const genre = params.get("genre");
    
    // Exibe o nome do gênero na página
    const genreTitle = document.getElementById("genre-title");
    genreTitle.textContent = `Músicas de ${genre}`;

    // Função para carregar e filtrar o JSON das músicas
    async function loadAndDisplayMusic() {
        try {
            // Carrega o JSON de músicas
            const response = await fetch("/json/musicas.json");
            const musics = await response.json();

            // Filtra as músicas pela categoria do gênero
            const filteredMusics = musics.filter(music => music.categoria.toLowerCase() === genre.toLowerCase());
            
            // Adiciona os cards das músicas filtradas
            const musicContainer = document.getElementById("music-container");
            filteredMusics.forEach(music => {
                const card = document.createElement("div");
                card.classList.add("music-card");
                
                // Estrutura do card com imagem, título, e outras informações
                card.innerHTML = `
                    <img src="${music.capa}" alt="${music.titulo}" class="cover">
                    <div class="details">
                        <h2>${music.titulo}</h2>
                        <p><strong>Autor:</strong> ${music.autor}</p>
                        <p><strong>Álbum:</strong> ${music.album}</p>
                        <p><strong>Duração:</strong> ${music.duracao}</p>
                        <p><strong>Resenha:</strong> ${music.resenha}</p>
                        <p><strong>Score:</strong> ${music.score} / 5</p>
                    </div>
                `;
                musicContainer.appendChild(card);
            });
        } catch (error) {
            console.error("Erro ao carregar o JSON das músicas:", error);
        }
    }

    // Carrega e exibe as músicas filtradas
    loadAndDisplayMusic();
});

