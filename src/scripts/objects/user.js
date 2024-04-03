const user = {
    avatarUrl: "",
    name: "",
    bio: "",
    userName: "",
    repositories: [],
    eventsUrl: [],
    setInfo(gitHubUser) {
        this.avatarUrl = gitHubUser.avatar_url;
        this.name = gitHubUser.name;
        this.bio = gitHubUser.bio;
        this.userName = gitHubUser.login;
        this.followers = gitHubUser.followers;
        this.following = gitHubUser.following;
    },
    setRepositories(repositories) {
        this.repositories = repositories;
    },
    setEvents(gitHubUserEvents) {
        this.eventsUrl = gitHubUserEvents.events_url;
    },
};

export { user };
