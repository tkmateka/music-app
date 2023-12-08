const genresUrl = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/editorial';
const genres = document.getElementById('genres');
let data = [];

fetch(genresUrl)
    .then(response => response.json())
    .then(response => {
        data = response.data;
        data.map((genre, i) => {
            genres.innerHTML += `
                <div onclick="selectGenre(${i})" class="genre relative border-radius-10px">
                    <img class="full-width full-height border-radius-10px" src="${genre.picture_xl}" alt="${genre.name} Image">
                    <div class="overlay flex center-center border-radius-10px">
                        <p>${genre.name}</p>
                    </div>
                </div>
            `
        })
    })
    .catch(error => console.log(error));


const selectGenre = (indx) => {
    sessionStorage.setItem('selectedGenre', JSON.stringify(data[indx]));
    window.location = 'genre.html';
}