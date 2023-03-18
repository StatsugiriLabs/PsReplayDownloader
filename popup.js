const PS_REPLAY_SEARCH_BASE_URL =
    "https://replay.pokemonshowdown.com/search/?user=";
const PS_REPLAY_SEARCH_API_URL =
    "https://replay.pokemonshowdown.com/search.json?user=";
const PS_REPLAY_BASE_URL = "https://replay.pokemonshowdown.com/";
const ACCESS_DENIED_ERR = "ERROR: access denied";
const MAX_PAGINATED_RESULTS = 50;

// Open replay search session for user given username and private replay option
function startSession() {
    const username = document.getElementById("usernameField").value;
    const privateOption = document.getElementById("privateCheckbox").checked;
    const replayUrl = PS_REPLAY_SEARCH_BASE_URL + username;
    // Open session in new tab
    window.open(privateOption ? replayUrl + "&private" : replayUrl);
}

async function downloadAllReplays() {
    const username = document.getElementById("usernameField").value;
    const privateOption = document.getElementById("privateCheckbox").checked;
    const replayUrl = privateOption
        ? PS_REPLAY_SEARCH_API_URL + username + "&private"
        : PS_REPLAY_SEARCH_API_URL + username;
    // Check if username returns a valid response for first page
    let getReplaysResponse = await fetch(replayUrl);
    if (getReplaysResponse.ok) {
        // Response can be either object or string unfortunately
        let replaysJson = await getReplaysResponse.json();
        // Handle error for private replay permissions
        if (replaysJson == ACCESS_DENIED_ERR) {
            alert(`Log in to access private replays for '${username}'.`);
        }
        if (replaysJson === undefined || replaysJson.length == 0) {
            alert(`Cannot find replays for '${username}.`);
        }
        exportReplaysToCsv(replayUrl, privateOption);
    } else {
        alert(
            "Network Error, please try again later." + getReplaysResponse.status
        );
    }
}

async function exportReplaysToCsv(replayUrl, privateOption) {
    var replayList = [];
    var currPage = 1;

    let getReplaysResponse = await fetch(replayUrl + `&page=${currPage}`);
    while (getReplaysResponse.ok) {
        let replaysJson = await getReplaysResponse.json();
        // MAX_PAGINATED_RESULT+1 result is duplicated with next page's first result
        replayList = [
            ...replayList,
            ...replaysJson
                .map((replay) =>
                    privateOption
                        ? [PS_REPLAY_BASE_URL + replay.id + "pw"]
                        : [PS_REPLAY_BASE_URL + replay.id]
                )
                .slice(0, MAX_PAGINATED_RESULTS),
        ];
        // If response is not MAX_PAGINATED_RESULTS+1, reached end of replays
        if (
            replaysJson === undefined ||
            replaysJson.length != MAX_PAGINATED_RESULTS + 1
        ) {
            break;
        }
        // Otherwise, increment to next page
        currPage++;
        getReplaysResponse = await fetch(replayUrl + `&page=${currPage}`);
    }
    console.log(`Exporting ${replayList.length} replays...`);

    replayList.unshift(["replay_url"]);
    let csvContent =
        "data:text/csv;charset=utf-8," +
        replayList.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
}

function initListeners() {
    document
        .getElementById("startSessionBtn")
        .addEventListener("click", startSession);
    document
        .getElementById("downloadAllBtn")
        .addEventListener("click", downloadAllReplays);
}

initListeners();
