import { getUser } from "/src/scripts/services/getuser.js";
import { getUserEvents } from "/src/scripts/services/getevents.js";
import { getRepositories } from "/src/scripts/services/getrepositories.js";
import { user } from "/src/scripts/objects/user.js";
import { screen } from "/src/scripts/objects/screen.js";

document.getElementById("btn-search").addEventListener("click", () => {
    const userName = document.getElementById("input-search").value;
    if (validateEmptyInput(userName)) return;

    getUserData(userName);
    // getEvents(userName);
});

document.getElementById("input-search").addEventListener("keyup", (e) => {
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isKeyPressed = key === 13;

    if (isKeyPressed) {
        if (validateEmptyInput(userName)) return;
        getUserData(userName);
        // getEvents(userName);
    }
});

function validateEmptyInput(userName) {
    if (userName.length === 0) {
        alert("Preencha o campo com o nome do usuário do GitHub");
        return true;
    }
}

async function getUserData(userName) {
    const userResponse = await getUser(userName);
    console.log(userResponse);

    if (userResponse.message === "Not Found") {
        screen.renderNotFound();
        return;
    }

    const repositoriesResponse = await getRepositories(userName);
    console.log(repositoriesResponse);

    const eventsResponse = await getUserEvents(userName);
    console.log(eventsResponse);

    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse);
    user.setEvents(eventsResponse);

    screen.renderUser(user);
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
