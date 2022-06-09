
let songSelection = document.querySelector('#song-preview');
let songPreview = document.querySelector('#song-preview-audio')
let searchResult = document.querySelector('#search-result')
let previewSection = document.querySelector('#preview-section')
let searchInput = document.querySelector('#song-search-input')
let searchBtn = document.querySelector('#search-btn')
let albumImage = document.querySelector('#albumImg')

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
        let albumImg = (event.target.parentElement.parentElement.children[0].src)
        let audioUrl = event.target.parentElement.children[2].innerHTML
        let artist = event.target.parentElement.children[1].innerHTML
        let song = event.target.parentElement.children[0].innerHTML
        previewSong(audioUrl,artist, song, albumImg)
    } else if(event.target.parentElement.classList.contains('card')) {
        let albumImg = (event.target.parentElement.children[0].src)
        let audioUrl = event.target.parentElement.children[1].children[2].innerHTML
        let artist = event.target.parentElement.children[1].children[1].innerHTML
        let song = event.target.parentElement.children[1].children[0].innerHTML
        previewSong(audioUrl, artist, song, albumImg)
    }
})

//defualt Song Preview
function previewSong(audioUrl, artist, song, albumImg){
    songSelection.innerHTML = '';
    songPreview.style.visibility="visible"
    songPreview.src = audioUrl;
    albumImage.src = albumImg

    let newSong = document.createElement("h5");
    newSong.classList.add("song-title");
    newSong.innerText = `${song} By ${artist}`;
    songSelection.appendChild(newSong);

    previewSection.style.display="flex"
    console.log(previewSection)
    songPreview.play();
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
