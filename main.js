let url = "https://itunes.apple.com/search?term=shakira";

let songSelection = document.querySelector('.song');
let songPreview = document.querySelector('.songPreview')

function previewSong(searchResults){
    let songName = searchResults.results[45].trackName;
    let artistName = searchResults.results[45].artistName;
    let source = searchResults.results[45].previewUrl;

    let previewSongSource = document.createElement("source")
    previewSongSource.src = source
    songPreview.appendChild(previewSongSource)

    let newSong = document.createElement("h1")
    newSong.innerText = `${songName} By ${artistName}`
    songSelection.appendChild(newSong)

}


fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    })
    .then(function (response) {
    return response.json()
    })
    .then(function (data) {
    console.log('You have been successfully subscribed', data.results[45])
    previewSong(data)
    })