const TRUE_IDENTIFIER = "1";
const SELECT_ALL_TYPE = "SELECT_ALL";
const DESELECT_ALL_TYPE = "DESELECT_ALL";
const PS_REPLAY_SEARCH_BASE_URL =
    "https://replay.pokemonshowdown.com/search/?user=";
// Identifer for PsReplayDownloader-specific storage keys
const PS_REPLAY_DOWNLOADER_IDENTIFIER = "PS_REPLAY_DOWNLOADER#";

async function exportReplays() {
    console.log("Fetching stored replays...");
    var csvReplayRows = [];
    const allStorageReplays = await chrome.storage.local.get();
    for (const [key, val] of Object.entries(allStorageReplays)) {
        if (
            key.includes(PS_REPLAY_DOWNLOADER_IDENTIFIER) &&
            val == TRUE_IDENTIFIER
        ) {
            const replayKeyArr = key.split("#");
            csvReplayRows.push([replayKeyArr[1]]);
        }
    }
    console.log("Exporting %s replays...", csvReplayRows.length);

    // Export to CSV
    let csvContent =
        "data:text/csv;charset=utf-8," +
        csvReplayRows.map((e) => e.join(",")).join("\n");
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
}

async function clearReplays() {
    console.log("Clearing stored replays...");
    const allStorageReplays = await chrome.storage.local.get();
    for (const [key, val] of Object.entries(allStorageReplays)) {
        if (key.includes(PS_REPLAY_DOWNLOADER_IDENTIFIER)) {
            chrome.storage.local.remove(key);
        }
    }
}

function selectAllReplays() {
    console.log("Selecting all replays...");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: SELECT_ALL_TYPE });
    });
}

function deselectAllReplays() {
    console.log("Deselecting all replays...");
    clearReplays();
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: DESELECT_ALL_TYPE });
    });
}

function startSession() {
    // Get username field input
    const username = document.getElementById("usernameField").value;
    // Check if replays requested are private
    const privateOption = document.getElementById("privateCheckbox").checked;
    // Open session in new tab
    const replayUrl = PS_REPLAY_SEARCH_BASE_URL + username;
    window.open(privateOption ? replayUrl + "&private" : replayUrl);
}

document.getElementById("exportBtn").addEventListener("click", exportReplays);
document
    .getElementById("clearBtn")
    .addEventListener("click", deselectAllReplays);
document
    .getElementById("selectAllBtn")
    .addEventListener("click", selectAllReplays);
document
    .getElementById("startSessionBtn")
    .addEventListener("click", startSession);
