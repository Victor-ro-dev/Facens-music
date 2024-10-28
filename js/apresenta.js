async function carregarMetalica() {
    try {
        const resposta = await fetch('/json/metalica.json'); 
        const musicas = await resposta.json();

        if (!Array.isArray(musicas)) {
            throw new TypeError('O JSON retornado não é um array');
        }

        const container = document.getElementById('musica-metalica');
        container.innerHTML = '';

        musicas.forEach(musica => {
            const card = document.createElement('div');
            card.className = 'card bg-dark text-white mb-4';
            card.style.width = '300px'; 

            card.innerHTML = `
                <img src="${musica.capa}" class="card-img-top" alt="${musica.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${musica.titulo}</h5>
                    <p class="card-text"><strong>Autor:</strong> ${musica.autor}</p>
                    <p class="card-text"><strong>Álbum:</strong> ${musica.album}</p>
                    <p class="card-text"><strong>Categoria:</strong> ${musica.categoria}</p>
                    <p class="card-text"><strong>Faixa:</strong> ${musica.faixa}</p>
                    <p class="card-text"><strong>Duração:</strong> ${musica.duracao}</p>
                    <p class="card-text"><strong>Resenha:</strong> ${musica.resenha}</p>
                    <p class="card-text"><strong>Score:</strong> ${musica.score}</p>
                </div>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar as músicas:', error);
    }
}

document.addEventListener('DOMContentLoaded', carregarMetalica);

async function carregarRacionais() {
    try {
        const resposta = await fetch('/json/racionais.json'); 
        const musicas = await resposta.json();

        if (!Array.isArray(musicas)) {
            throw new TypeError('O JSON retornado não é um array');
        }

        const container = document.getElementById('musica-racionais');
        container.innerHTML = '';

        musicas.forEach(musica => {
            const card = document.createElement('div');
            card.className = 'card bg-dark text-white mb-4';
            card.style.width = '300px'; 

            card.innerHTML = `
                <img src="${musica.capa}" class="card-img-top" alt="${musica.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${musica.titulo}</h5>
                    <p class="card-text"><strong>Autor:</strong> ${musica.autor}</p>
                    <p class="card-text"><strong>Álbum:</strong> ${musica.album}</p>
                    <p class="card-text"><strong>Categoria:</strong> ${musica.categoria}</p>
                    <p class="card-text"><strong>Faixa:</strong> ${musica.faixa}</p>
                    <p class="card-text"><strong>Duração:</strong> ${musica.duracao}</p>
                    <p class="card-text"><strong>Resenha:</strong> ${musica.resenha}</p>
                    <p class="card-text"><strong>Score:</strong> ${musica.score}</p>
                </div>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar as músicas:', error);
    }
}
document.addEventListener('DOMContentLoaded', carregarRacionais);

async function carregarHariel() {
    try {
        const resposta = await fetch('/json/mc_hariel.json'); 
        const musicas = await resposta.json();

        if (!Array.isArray(musicas)) {
            throw new TypeError('O JSON retornado não é um array');
        }

        const container = document.getElementById('musica-hariel');
        container.innerHTML = '';

        musicas.forEach(musica => {
            const card = document.createElement('div');
            card.className = 'card bg-dark text-white mb-4';
            card.style.width = '300px'; 

            card.innerHTML = `
                <img src="${musica.capa}" class="card-img-top" alt="${musica.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${musica.titulo}</h5>
                    <p class="card-text"><strong>Autor:</strong> ${musica.autor}</p>
                    <p class="card-text"><strong>Álbum:</strong> ${musica.album}</p>
                    <p class="card-text"><strong>Categoria:</strong> ${musica.categoria}</p>
                    <p class="card-text"><strong>Faixa:</strong> ${musica.faixa}</p>
                    <p class="card-text"><strong>Duração:</strong> ${musica.duracao}</p>
                    <p class="card-text"><strong>Resenha:</strong> ${musica.resenha}</p>
                    <p class="card-text"><strong>Score:</strong> ${musica.score}</p>
                </div>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar as músicas:', error);
    }
}

document.addEventListener('DOMContentLoaded', carregarHariel);

let todasAsMusicas = [];

async function carregarTodasAsMusicas() {
    const container = document.getElementById('todas-as-musicas');
    container.innerHTML = '';
    todasAsMusicas = [];

    try {

        await carregarMusicasPorArtista('/json/metalica.json', todasAsMusicas);
        await carregarMusicasPorArtista('/json/racionais.json', todasAsMusicas);
        await carregarMusicasPorArtista('/json/mc_hariel.json', todasAsMusicas);


        exibirMusicas(todasAsMusicas, container);

    } catch (error) {
        console.error('Erro ao carregar todas as músicas:', error);
    }
}

async function carregarMusicasPorArtista(url, musicasArray) {
    try {
        const resposta = await fetch(url);
        const musicas = await resposta.json();

        if (!Array.isArray(musicas)) {
            throw new TypeError('O JSON retornado não é um array');
        }

        musicasArray.push(...musicas);
    } catch (error) {
        console.error(`Erro ao carregar músicas de ${url}:`, error);
    }
}


function exibirMusicas(musicas, container) {
    container.innerHTML = '';

    musicas.forEach(musica => {
        const card = document.createElement('div');
        card.className = 'card bg-dark text-white mb-4';
        card.style.width = '300px';

        card.innerHTML = `
            <img src="${musica.capa}" class="card-img-top" alt="${musica.titulo}">
            <div class="card-body">
                <h5 class="card-title">${musica.titulo}</h5>
                <p class="card-text"><strong>Autor:</strong> ${musica.autor}</p>
                <p class="card-text"><strong>Álbum:</strong> ${musica.album}</p>
                <p class="card-text"><strong>Categoria:</strong> ${musica.categoria}</p>
                <p class="card-text"><strong>Faixa:</strong> ${musica.faixa}</p>
                <p class="card-text"><strong>Duração:</strong> ${musica.duracao}</p>
                <p class="card-text"><strong>Resenha:</strong> ${musica.resenha}</p>
                <p class="card-text"><strong>Score:</strong> ${musica.score}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

function ordenarMusicasPorTitulo() {
    todasAsMusicas.sort((a, b) => a.titulo.localeCompare(b.titulo));
    exibirMusicas(todasAsMusicas, document.getElementById('todas-as-musicas'));
}


document.getElementById('ordenar-titulo').addEventListener('click', ordenarMusicasPorTitulo);

document.addEventListener('DOMContentLoaded', carregarTodasAsMusicas);
