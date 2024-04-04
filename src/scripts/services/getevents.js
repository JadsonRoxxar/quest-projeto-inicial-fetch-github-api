import { baseUrl, maxItems } from "/src/scripts/variables.js";

async function getUserEvents(userName) {
    const response = await fetch(
        `${baseUrl}/${userName}/events?per_page=${maxItems}`
    );

    return await response.json();
}

export { getUserEvents };
