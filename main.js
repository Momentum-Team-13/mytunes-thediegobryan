
let songSelection = document.querySelector('#song-preview');
let songPreview = document.querySelector('#song-preview-audio')
let searchResult = document.querySelector('#search-result')
let searchInput = document.querySelector('#song-search-input')
let searchBtn = document.querySelector('#search-btn')



// TO DO LIST
// ========================================
// -Need to add click event listener to each search result element like I did for each calculator GamepadButton. This function will tell the page to change the song preview to the clicked song.
//

searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const userInput = searchInput.value
    let url = `https://itunes.apple.com/search?limit=50&media=music&term=${userInput}`;

    fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    })
    .then(function (response) {
    return response.json()
    })
    .then(function (data) {
        searchgrid(data.results)
    })
})

searchResult.addEventListener("click", function(event){
    if(event.target.parentElement.classList.contains('card-body')){
        songPreview.src = event.target.parentElement.children[2].innerHTML
        let artist = event.target.parentElement.children[1].innerHTML
        let song = event.target.parentElement.children[0].innerHTML
        previewSong(artist, song)
    }
})

//defualt Song Preview
function previewSong(artist, song){
    songSelection.innerHTML = '';
    let newSong = document.createElement("h5");
    newSong.innerText = `${song} By ${artist}`;
    songSelection.appendChild(newSong);
}

//Organized Search Grid
function searchgrid(searchData){
    searchResult.innerHTML = '';

    for(result of searchData){
        //Container Box
        let resultBox = document.createElement("div")
        resultBox.classList.add("card")
        resultBox.style.width = "200px";
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
        let artist = document.createElement("h6");
        artist.classList.add("card-text");
        artist.innerText = result.artistName;
        cardBody.appendChild(artist);
        //Song URL
        let songUrl = document.createElement("div");
        songUrl.classList.add("audio-source")
        songUrl.innerText = result.previewUrl;
        cardBody.appendChild(songUrl)
    }
}
