const screen = {
    userProfile: document.querySelector(".profile-data"),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                            <img src= "${
                                user.avatarUrl
                            }" alt="Foto do perfil do usuário" />
                            <div class="data">
                                <h1>${
                                    user.name ?? "Não possui nome cadastrado 😥"
                                }</h1>
                                <p>${
                                    user.bio ?? "Não possui bio cadastrada 😥"
                                }</p> <br>
                                <hr> <br>
                                <p>👥 Followers:${user.followers}</p>
                                <p>👤 Following:${user.following}</p> <br>
                                <hr> <br>
                            </div>
                        </div>`;

        let repositoriesItens = "";
        user.repositories.forEach((repo) => {
            repositoriesItens += `<li class="repo">
                                                    <a href="${
                                                        repo.html_url
                                                    }" target="_blank">
                                                        <h3>${repo.name}</h3>
                                                        <div class="info-repositories"  > 
                                                          
                                                          <p class="info-repo">🍴 ${
                                                              repo.forks
                                                          }</p>
                                                          
                                                          <p class="info-repo">⭐ ${
                                                              repo.stargazers_count
                                                          }</p>
                                                          
                                                          <p class="info-repo">👀 ${
                                                              repo.watchers
                                                          }</p>
                                                         
                                                          <p class="info-repo">👨‍💻 ${
                                                              repo.language ??
                                                              "?"
                                                          }</p>
                                                        </div>
                                                    </a>
                                                </li>`;
        });
        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                                <h2>Repositories </h2>
                                                                <ul>${repositoriesItens}</ul>
                                                            </div>`;
        } else {
            this.userProfile.innerHTML += ` <div class="repositories section">
                                                            <h2>Repositories </h2>
                                                            <h3>Nenhum repositório foi encontrado!</h3>
                                                          </div>`;
        }
        // let repositoriesItems = "";
        // user.repositories.forEach(
        //     (repo) =>
        //         (repositoriesItems += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`)
        // );

        // if (user.repositories.length > 0) {
        //     this.userProfile.innerHTML += `<div class="repositories section">
        //                                                     <h2>Repositórios</h2>
        //                                                     <ul>${repositoriesItems}</ul>
        //                                                     </div>`;
        // }

        let eventsItens = "";
        user.events.forEach((event) => {
            if (event.type === "CreateEvent" || event.type === "PushEvent") {
                if (event.payload.commits === undefined) {
                    eventsItens += `  <li><span>${event.repo.name}</span> - Ainda não possui commmits!</li>`;
                } else {
                    let lastCommit = event.payload.commits.length - 1;
                    eventsItens += `  <li>${event.repo.name} - ${event.payload.commits[lastCommit].message}</li>`;
                }
            }
        });
        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events section">
                                              <h2> Eventos </h2>
                                              <ul>${eventsItens}</ul>
                                          </div>`;
        } else {
            this.userProfile.innerHTML += ` <div class="events section">
                                          <h2> Eventos </h2><br>
                                          <h3>Nenhum evento foi encontrado!</h3>
                                        </div>`;
        }
        // let eventsItems = "";
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
    },
};

export { screen };
