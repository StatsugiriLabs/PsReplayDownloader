// Constants
const TRUE_IDENTIFIER = "1";
const FALSE_IDENTIFIER = "0";
const SELECT_ALL_TYPE = "SELECT_ALL";
const DESELECT_ALL_TYPE = "DESELECT_ALL";
const PS_REPLAY_DOWNLOADER_IDENTIFIER = "PS_REPLAY_DOWNLOADER#";

(() => {
    addCheckboxes();
    chrome.runtime.onMessage.addListener(function (request, _, _) {
        if (request.type === SELECT_ALL_TYPE) {
            console.log("Msg received to select all replays");
            var replayCheckboxes = document.querySelectorAll(
                "input.replayCheckbox"
            );
            replayCheckboxes.forEach(function (replayCheckbox, _) {
                if (replayCheckbox.checked == false) {
                    replayCheckbox.click();
                }
            });
        }
        if (request.type === DESELECT_ALL_TYPE) {
            console.log("Msg received to deselect all replays");
            var replayCheckboxes = document.querySelectorAll(
                "input.replayCheckbox"
            );
            replayCheckboxes.forEach(function (replayCheckbox, _) {
                if (replayCheckbox.checked == true) {
                    replayCheckbox.click();
                }
            });
        }
    });
})();

async function addCheckboxes() {
    const replays = document.querySelectorAll("ul.linklist li");

    replays.forEach(function (replay, _) {
        // Instantiate checkboxes for replays only (ie. ignore buttons)
        if (replay.innerHTML.includes("href")) {
            let replayCheckbox = document.createElement("INPUT");
            replayCheckbox.setAttribute("type", "checkbox");
            replayCheckbox.setAttribute("class", "replayCheckbox");
            replayCheckbox.setAttribute(
                "style",
                "checkbox; float:right; margin-left: 10px; width: 20px; height: 20px"
            );

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
                    chrome.storage.local.set({
                        [PS_REPLAY_DOWNLOADER_IDENTIFIER + replayUrl]:
                            FALSE_IDENTIFIER,
                    });
                }
            });
            replay.prepend(replayCheckbox);
        }
    });
}
