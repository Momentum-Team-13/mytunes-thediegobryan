let url = "https://itunes.apple.com/search?term=shakira";

let songSelection = document.querySelector('#song-preview');
let songPreview = document.querySelector('#song-preview-audio')
let searchResult = document.querySelector('#search-result')

// TO DO LIST
// ========================================
// -Need to add click event listener to each search result element like I did for each calculator GamepadButton. This function will tell the page to change the song preview to the clicked song.
//
//- for the search bar, my guess is that i'll us the searchbox.innerText and add that to the fetch url when button is clicked. I think an event listener will make the button work?


function previewSong(searchData){
    let songName = searchData.results[45].trackName;
    let artistName = searchData.results[45].artistName;
    let source = searchData.results[45].previewUrl;

    let previewSongSource = document.createElement("source");
    previewSongSource.src = source;
    songPreview.appendChild(previewSongSource);

    let newSong = document.createElement("h1");
    newSong.innerText = `${songName} By ${artistName}`;
    songSelection.appendChild(newSong);
}

function searchgrid(searchData){
    for(result of searchData){
        //Container Box
        let resultBox = document.createElement("div")
        resultBox.classList.add("card")
        resultBox.style.width = "12rem";
        resultBox.id = "result-box";
        searchResult.appendChild(resultBox)
        //Img Thumb
        let resultImg = document.createElement("img");
        resultImg.src = result.artworkUrl100;
        resultImg.classList.add("card-img-top");
        resultBox.appendChild(resultImg);
        //cardBody
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        resultBox.appendChild(cardBody);
        //Song Title
        let songTitle = document.createElement("h5");
        songTitle.classList.add("card-title");
        songTitle.innerText = result.trackName;
        cardBody.appendChild(songTitle);
        //Artist Name
        let artist = document.createElement("p");
        artist.classList.add("card-text");
        artist.innerText = result.artistName;
        cardBody.appendChild(artist);
    }
}


fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    })
    .then(function (response) {
    return response.json()
    })
    .then(function (data) {
    console.log('You have been successfully subscribed', data.results)
    previewSong(data)
    searchgrid(data.results)
    })