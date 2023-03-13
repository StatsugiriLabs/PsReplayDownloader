# PS Replay Downloader

![PS Replay Downloader](./images/assets/ps_replay_downloader_128.png)

PS Replay Downloader is an open-source Chrome Extension for
batch downloading [Pokémon Showdown](https://pokemonshowdown.com/) replays. Currently, it supports exporting the following formats:
- Text (newline delimited) 
- CSV (file download)

Extension Download: `<PLACEHOLDER>`

Special thanks to [@cookiesamanda](https://twitter.com/cookiesamanda) for designing the logo.

## Instructions

1. Open the Chrome Extension. Enter the username and toggle whether private replays are desired. Click `Start Session` to open the PS replay search menu.

    <img src="./images/readme/readme_1.png " width=50% height=50%>

2. Select the replays to download by toggling the checkbox beside the replay. If the checkboxes do not appear, please refresh the webpage and try again.

    <img src="./images/readme/readme_2.png " width=50% height=50%>

    Toggle the checkbox beside the menu to select / deselect all.

    <img src="./images/readme/readme_3.png " width=50% height=50%>

3. Choose the export format from the dropdown menu. Click export when ready.
4. If you enjoy the extension, please consider donating to the [Statsugiri Kofi](https://ko-fi.com/statsugiri) to support future work on Pokémon data projects.

## FAQ

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

