
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
    console.log(userInput)
    console.log(event)

    let url = `https://itunes.apple.com/search?term=${userInput}`;

    fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    })
    .then(function (response) {
    return response.json()
    })
    .then(function (data) {
        console.log('You have been successfully subscribed', data.results)
        // previewSong(data)
        searchgrid(data.results)
    })
})

//defualt Song Preview
// function previewSong(searchData){
//     let songName = searchData.results[45].trackName;
//     let artistName = searchData.results[45].artistName;
//     let source = searchData.results[45].previewUrl;

//     let previewSongSource = document.createElement("source");
//     previewSongSource.src = source;
//     songPreview.appendChild(previewSongSource);

//     let newSong = document.createElement("h1");
//     newSong.innerText = `${songName} By ${artistName}`;
//     songSelection.appendChild(newSong);
// }

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
        let artist = document.createElement("p");
        artist.classList.add("card-text");
        artist.innerText = result.artistName;
        cardBody.appendChild(artist);
    }
}


// let url = `https://itunes.apple.com/search?term=shakira`;

//     fetch(url, {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//     })
//     .then(function (response) {
//     return response.json()
//     })
//     .then(function (data) {
//         console.log('You have been successfully subscribed', data.results)
//         // previewSong(data)
//         searchgrid(data.results)
//     })