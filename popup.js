const PS_REPLAY_SEARCH_BASE_URL =
    "https://replay.pokemonshowdown.com/search/?user=";
// Identifer for PsReplayDownloader-specific storage keys

// Open replay search session for user given username and private replay option
function startSession() {
    // Get username field input
    const username = document.getElementById("usernameField").value;
    // Check if replays requested are private
    const privateOption = document.getElementById("privateCheckbox").checked;
    // Open session in new tab
    const replayUrl = PS_REPLAY_SEARCH_BASE_URL + username;
    window.open(privateOption ? replayUrl + "&private" : replayUrl);
}

function initListeners() {
    document
        .getElementById("startSessionBtn")
        .addEventListener("click", startSession);
}

initListeners();
