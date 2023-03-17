const PS_REPLAY_SEARCH_BASE_URL =
    "https://replay.pokemonshowdown.com/search/?user=";
const PS_REPLAY_SEARCH_API_URL =
    "https://replay.pokemonshowdown.com/search.json?user=";
const PS_REPLAY_BASE_URL = "https://replay.pokemonshowdown.com/";
const ACCESS_DENIED_ERR = "ERROR: access denied";

// Open replay search session for user given username and private replay option
function startSession() {
    const username = document.getElementById("usernameField").value;
    const privateOption = document.getElementById("privateCheckbox").checked;
    const replayUrl = PS_REPLAY_SEARCH_BASE_URL + username;
    // Open session in new tab
    window.open(privateOption ? replayUrl + "&private" : replayUrl);
}

async function getAllReplays() {
    const username = document.getElementById("usernameField").value;
    const privateOption = document.getElementById("privateCheckbox").checked;
    const replayUrl = PS_REPLAY_SEARCH_API_URL + username;
    // Make GET request to replay server
    let getReplaysResponse = await fetch(
        privateOption ? replayUrl + "&private" : replayUrl
    );
    if (getReplaysResponse.ok) {
        // Response can be either object or string unfortunately
        let replaysJson = await getReplaysResponse.json();
        // Handle error for private replay permissions
        if (replaysJson == ACCESS_DENIED_ERR) {
            alert(`Log in to access private replays for '${username}'.`);
        } else if (replaysJson === undefined || replaysJson.length == 0) {
            alert(`Cannot find replays for '${username}.`);
        } else {
            console.log(`Exporting ${replaysJson.length} replays...`);
            exportReplaysToCsv(replaysJson, privateOption);
        }
    } else {
        alert(
            "Network Error, please try again later." + getReplaysResponse.status
        );
    }
}

function exportReplaysToCsv(replaysJson, privateOption) {
    console.log(replaysJson);
    var replayList = [["replay_url"]];
    replaysJson.forEach(function (replay) {
        replayList.push([
            privateOption
                ? PS_REPLAY_BASE_URL + replay.id + "pw"
                : PS_REPLAY_BASE_URL + replay.id,
        ]);
    });
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
        .addEventListener("click", getAllReplays);
}

initListeners();
