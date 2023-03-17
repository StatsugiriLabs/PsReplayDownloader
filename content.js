// Constants
const CHECKBOX_STYLING =
    "checkbox; float:right; margin-left: 10px; width: 20px; height: 20px;";
const EXPORT_MENU_STYLING =
    "display: block; margin: 2px 0 8px; padding: 3px 7px 6px; border: 1px solid #bcd; background: #f8fbfd; border-radius: 4px; text-decoration: none; color: #369; text-shadow: #fff 0 -1px 0; box-shadow: 1px 1px 1px #d5d5d5; overflow: hidden; white-space: nowrap; text-align: left";
const TRUE_IDENTIFIER = "1";
const PS_REPLAY_DOWNLOADER_IDENTIFIER = "PS_REPLAY_DOWNLOADER#";

function initListeners() {
    // Listener for select all
    document
        .getElementById("selectAllCheckbox")
        .addEventListener("change", function () {
            if (this.checked) {
                selectAllReplays();
            } else {
                deselectAllReplays();
            }
        });
    // Listener for export
    document
        .getElementById("exportBtn")
        .addEventListener("click", exportReplays);
}

async function updateNumReplayDisplay() {
    var numReplays = 0;
    const allStorageReplays = await chrome.storage.local.get();
    for (const [key, val] of Object.entries(allStorageReplays)) {
        if (
            key.includes(PS_REPLAY_DOWNLOADER_IDENTIFIER) &&
            val == TRUE_IDENTIFIER
        ) {
            numReplays++;
        }
    }
    document.getElementById("numReplays").innerHTML = numReplays;
}

function createCheckbox() {
    let replayCheckbox = document.createElement("INPUT");
    replayCheckbox.setAttribute("type", "checkbox");
    replayCheckbox.setAttribute("class", "replayCheckbox");
    replayCheckbox.setAttribute("style", CHECKBOX_STYLING);
    return replayCheckbox;
}

function addExportMenu() {
    const exportMenu = document.createElement("li");
    const exportMenuHtml = `
        <div class="exportMenu" style="text-align:center;margin:0 auto;width:50%;text-align:left">
            <p style="margin-top:10px;margin-bottom:2px;font-size:80%;font-style:italic;color:#888888">Select from the 50 most recent replays.</p>
            <p style="margin-top:2px;margin-bottom:2px;font-size:80%;font-style:italic;color:#888888">Check right box to select / deselect all.</p>
            <p style="margin-top:2px;margin-bottom:2px;font-size:80%;font-style:italic;color:#888888">Do not navigate away from the page</p>
            <p style="margin-top:2px;margin-bottom:2px;font-size:80%;font-style:italic;color:#888888">as the menu may not properly load.</p>
            <p style="margin-top:2px;margin-bottom:4px;font-size:80%;font-style:italic;color:#888888">Start a new search session instead.</p>
            <p style="margin-bottom:10px;"><span id="numReplays">0</span> replays currently selected.</p>        
            <div style="margin-bottom:10px;">
                <label for="exportFormat">Format:</label>
                <select name="exportFormat" id="exportFormat">
                    <option value="text">Text (Copy to Clipboard)</option>
                    <option value="csv">CSV Download</option>
                </select>
            </div>
            <button type="button" style="margin-bottom:10px;" id="exportBtn"><b>Export</b></button>
        </div>
    `;
    exportMenu.innerHTML = exportMenuHtml;
    exportMenu.setAttribute("style", EXPORT_MENU_STYLING);

    // Add menu to top of replays
    const replayList = document.querySelector("ul.linklist");
    if (replayList != null) {
        replayList.prepend(exportMenu);
    }

    // Add select all checkbox
    const replayCheckbox = createCheckbox();
    replayCheckbox.setAttribute("id", "selectAllCheckbox");
    if (replayList != null) {
        replayList.prepend(replayCheckbox);
    }
}

function addCheckboxes() {
    const replays = document.querySelectorAll("ul.linklist li");

    replays.forEach(function (replay, _) {
        // Instantiate checkboxes for replays only (ie. ignore buttons)
        if (replay.innerHTML.includes("href")) {
            const replayCheckbox = createCheckbox();

            // Add or remove entry from storage
            replayCheckbox.addEventListener("change", function () {
                var replayUrl = this.nextSibling.href;
                if (this.checked) {
                    console.log(
                        "Adding replay (%s) to download list",
                        replayUrl
                    );
                    chrome.storage.local.set({
                        [PS_REPLAY_DOWNLOADER_IDENTIFIER + replayUrl]:
                            TRUE_IDENTIFIER,
                    });
                } else {
                    console.log(
                        "Removing replay (%s) to download list",
                        replayUrl
                    );
                    chrome.storage.local.remove(
                        PS_REPLAY_DOWNLOADER_IDENTIFIER + replayUrl
                    );
                }
                // Update UI
                updateNumReplayDisplay();
            });
            replay.prepend(replayCheckbox);
        }
    });
}

// Clear replays from local storage
async function clearReplays() {
    console.log("Clearing stored replays...");
    const allStorageReplays = await chrome.storage.local.get();
    for (const [key, _] of Object.entries(allStorageReplays)) {
        if (key.includes(PS_REPLAY_DOWNLOADER_IDENTIFIER)) {
            chrome.storage.local.remove(key);
        }
    }
}

// Send message to content script to select all replays on DOM
function selectAllReplays() {
    console.log("Selecting all replays...");
    var replayCheckboxes = document.querySelectorAll("input.replayCheckbox");
    replayCheckboxes.forEach(function (replayCheckbox, _) {
        if (replayCheckbox.checked == false) {
            replayCheckbox.click();
        }
    });
}

// Send message to content script to deselect all replays on DOM
function deselectAllReplays() {
    console.log("Deselecting all replays...");
    clearReplays();
    var replayCheckboxes = document.querySelectorAll("input.replayCheckbox");
    replayCheckboxes.forEach(function (replayCheckbox, _) {
        if (replayCheckbox.checked == true) {
            replayCheckbox.click();
        }
    });
}

// Export selected replays in storage to CSV
async function exportReplays() {
    console.log("Fetching stored replays...");
    var replayList = [];
    const allStorageReplays = await chrome.storage.local.get();
    for (const [key, val] of Object.entries(allStorageReplays)) {
        if (
            key.includes(PS_REPLAY_DOWNLOADER_IDENTIFIER) &&
            val == TRUE_IDENTIFIER
        ) {
            const replayKeyArr = key.split("#");
            replayList.push([replayKeyArr[1]]);
        }
    }
    // Sort replay by reverse-chronological
    replayList.sort().reverse();
    console.log("Exporting %s replays...", replayList.length);

    const exportFormat = document.getElementById("exportFormat");
    switch (exportFormat.value) {
        case "text":
            console.log("Exporting to Text...");
            const replayListStr = replayList.join("\n");
            navigator.clipboard.writeText(replayListStr);
            break;
        case "csv":
            console.log("Exporting to CSV...");
            replayList.unshift(["replay_url"]);
            let csvContent =
                "data:text/csv;charset=utf-8," +
                replayList.map((e) => e.join(",")).join("\n");
            const encodedUri = encodeURI(csvContent);
            window.open(encodedUri);
            break;
        default:
            alert("Please select a valid option.");
            break;
    }
}

function initReplayMenu() {
    clearReplays();
    addCheckboxes();
    addExportMenu();
    initListeners();
}

window.onload = initReplayMenu;
