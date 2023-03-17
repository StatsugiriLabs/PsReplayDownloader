# PS Replay Downloader

![PS Replay Downloader](./images/assets/ps_replay_downloader_128.png)

PS Replay Downloader is an open-source Chrome Extension for
batch downloading [Pokémon Showdown](https://pokemonshowdown.com/) replays. Currently, it supports text and CSV exports.

Special thanks to [@cookiesamanda](https://twitter.com/cookiesamanda) for designing the logo.


## Installation
You can download the extension at the Chrome Extension store: https://tinyurl.com/PsReplayDownloader

Currently, it is compatible with Chromium-based browsers. There are no plans to migrate to other browsers (eg. Mozilla Firefox).

## Instructions

### Start a Download Session (Manual)

1. Open the Chrome Extension. Enter the username and toggle whether private replays are desired. Click `Start Session` to open the PS replay search menu.

    <img src="./images/readme/readme_1.png " width=50% height=50%>

2. Select the replays to download by toggling the checkbox beside the replay. Toggle the checkbox to select / deselect all replays. *If the checkboxes do not appear, please refresh the webpage or try searching your username again in the extension.*

    <img src="./images/readme/readme_2.png " width=50% height=50%>

3. Choose the export format from the dropdown menu. Click export when ready.
4. If you enjoy the extension, please consider donating to the [Statsugiri Kofi](https://ko-fi.com/statsugiri) to support future work on Pokémon data projects.

### Download All Replays (One-Click)

1. Open the Chrome Extension. Enter the username and toggle whether private replays are desired. Click `Download All` to initiate a CSV download of all replays. *Please ensure you are logged in to the correct account before downloading private replays."

## FAQ

### Why are the checkboxes not showing?
There may be issues with the extension reloading new pages in the replay search menu. Try refreshing the page or search your username again in the extension pop-up. In particular, navigating from public to private replays has known issues. It's preferred you specify whether you want private replays by toggling the "Private Replays" checkbox before searching.

### Why not leverage the Pokémon Showdown Web API?

The aforementioned [API](https://github.com/smogon/pokemon-showdown-client/blob/master/WEB-API.md) is capable of retrieving both public and private replays. I opted to read and modify the webpage directly as I could add the export replay menu directly to the replay search UI instead of creating webpage assets from scratch.

### Why do I have to search for replays through the Chrome Extension first?

Due to how Pokémon Showdown renders its replays after searching, it would take increased engineering effort to have checkboxes populate when the DOM is loaded since the URL does not change. Having the menu to open a new webpage made each "session" feel more isolated in terms of workflow. That being said, I'm open to suggestions on how to render checkboxes on replay search natively.

### Why is it limited to the 50 most recent replays?

The replay search UI has a "more results" button where it paginates in increments of 50 replays. As it's impossible to determine how many replays the user has, it requires some recursive function to "click" since the button for each page is rendered one page at at time.

### Does the Chrome Extension store any data?

It does not. The only data stored are your replay URLs in your browser's local storage, which only you have access to view.

## Feature Requests

Please tweet / message [@Statsugiri](https://twitter.com/Statsugiri) or create an issue for any feature requests.
