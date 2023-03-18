# PS Replay Downloader

![PS Replay Downloader](./images/assets/ps_replay_downloader_128.png)

PS Replay Downloader is an open-source Chrome Extension for
batch downloading [Pokémon Showdown](https://pokemonshowdown.com/) replays. Currently, it supports text and CSV exports.

Special thanks to [@cookiesamanda](https://twitter.com/cookiesamanda) for designing the logo.

## Installation

You can download the extension at the Chrome Extension store: https://tinyurl.com/PsReplayDownloader

Currently, it is compatible with Chromium-based browsers. There are no plans to migrate to other browsers (eg. Mozilla Firefox).

## Instructions

PS Replay Downloader can be operated in two modes: One-Click or Manual. One-Click mode is capable of downloading all replays. Manual mode can only download the 50 most recent replays, but allows users to selectively choose through the UI.

### Download All Replays (One-Click)

1. Open the Chrome Extension. Enter the username and toggle whether private replays are desired. Click `Download All` to initiate a CSV download of all replays. The download process may take a few seconds. _Please ensure you are logged in to the correct account before downloading private replays._

### Start a Session (Manual)

1. Open the Chrome Extension. Enter the username and toggle whether private replays are desired. Click `Start Session` to open the PS replay search menu.

 <img src="./images/readme/readme_1.png">

2. Select the replays to download by toggling the checkbox beside the replay. Toggle the checkbox to select / deselect all replays. _If the checkboxes do not appear, please refresh the webpage or try searching your username again in the extension._

 <img src="./images/readme/readme_2.png">

3. Choose the export format from the dropdown menu. Click export when ready.

## FAQ

### Why are the checkboxes not showing in manual session?

There may be issues with how Pokémon Showdown loads DOM changes that are incongruent with the extension. Try refreshing the page or search your username again in the extension pop-up. In particular, navigating from public to private replays has known issues. It's preferred you specify whether you want private replays by toggling the "Private Replays" checkbox before searching.

### Does the Chrome Extension leverage the Pokémon Showdown Web API?

The aforementioned [API](https://github.com/smogon/pokemon-showdown-client/blob/master/WEB-API.md) is capable of retrieving both public and private replays. I opted for two modes of downloading. The manual session allows users to select replays with more granularity (ie. ignoring undesired replays). The one-click method downloads all replays through the API.

### Why is the manual session limited to the 50 most recent replays?

The replay search UI has a "more results" button where it paginates in increments of 50 replays. As it's impossible to determine how many replays the user has, it requires some recursive function to "click" since the button for each page is rendered one page at at time.

### Does the Chrome Extension store any data?

It does not. The only data stored are your replay URLs in your browser's local storage for the manual session, which only you have access to view.

## Feature Requests

Please tweet / message [@Statsugiri](https://twitter.com/Statsugiri) or create an issue for any feature requests.

## Support

If you enjoy the extension, please consider donating to the [Statsugiri Kofi](https://ko-fi.com/statsugiri) to support future work on Pokémon data projects.
