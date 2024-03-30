import { user } from "./services/user";
import { repositories } from "./services/repositories";

document.getElementById("btn-search").addEventListener("click", () => {
    const userName = document.getElementById("input-search").value;
    getUserProfile(userName);
});

document.getElementById("input-search").addEventListener("keyup", (e) => {
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isKeyPressed = key === 13;

    if (isKeyPressed) {
        getUserProfile(userName);
    }
});

function getUserProfile(userName) {
    user(userName).then((userData) => {
        let userInfo = `<div class="info">
            <img src= "${
                userData.avatar_url
            }" alt="Foto do perfil do usuário" />
            <div class="data">
                <h1>${userData.name ?? "Não possui nome cadastrado 😥"}</h1>
                <p>${userData.bio ?? "Não possui bio cadastrada 😥"}</p>
            </div>
        </div>`;

        document.querySelector(".profile-data").innerHTML = userInfo;
    });
}

function getUserRepositories(userName) {
    repositories(userName).then((reposData) => {
        let repositoriesItems = "";

        reposData.forEach((repo) => {
            repositoriesItems += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`;
        });
        document.querySelector(
            ".profile-data"
        ).innerHTML += `<div class="repositories section">
                            <h2>Repositórios</h2>
                            <ul>${repositoriesItems}</ul>
                        </div>`;
        getUserRepositories(userName);
    });
}

/*
Quest JavaScript Avançado - Desafio API Github
✨ LEIAM TODA A DESCRIÇÃO ANTES DE COMEÇAR A QUEST! ✨

Utilize seus conhecimentos adquiridos no módulo de JavaScript Avançado para enfrentá-lo da maneira mais brilhante possível! 💪

Faça o download do arquivo PDF, que está anexado aqui, e lá encontrará as instruções para este desafio! 📥

Após concluí-lo, envie o link do repositório público do GitHub onde você armazenou sua solução no canal quests-prontas!

Boa sorte, e que os desafios estejam ao seu alcance! 🚀

Links de apoio:

Buscando repositórios: Repositórios - GitHub Docs

Buscando eventos: Eventos - GitHub Docs

Lembrando que para buscar os 10 primeiros repositórios e eventos é necessário usar o parametro: `?per_page=${items}` onde items é quantidade que irá retornar

Exemplo para ser feito no fetch de eventos:

${baseUrl}/${userName}/events?per_page=${maxItems}*/
