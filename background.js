chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.name === "sendpopup") {
        console.log("received the message from the popup page");
    }
});
