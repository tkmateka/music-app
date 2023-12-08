const selectedGenre = sessionStorage.selectedGenre ? JSON.parse(sessionStorage.selectedGenre) : null;
const channels = ['tracks', 'albums', 'artists', 'playlists'];
// const channels = ['tracks'];
let groupOfChannels = {};

// Elements
const bigHeader = document.getElementById('bigHeader');
const group = document.getElementById('group');

if (!selectedGenre) window.location = 'genres.html';

bigHeader.innerHTML = selectedGenre.name;

const baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/';

const getImageUrl = (img_id) => {
    return `https://e-cdns-images.dzcdn.net/images/artist/${img_id}/500x500-000000-80-0-0.jpg`;
}

// Get Tracks
channels.forEach((channel, i) => {
    fetch(`${baseUrl}${selectedGenre.id}/${channel}`)
        .then(stream => stream.json())
        .then(jsonData => {
            groupOfChannels[channel] = jsonData.data;

            group.innerHTML += `
                <div class="flex column gap-1em">
                    <div class="flex gap-1em start-center">
                        <p class="font-28"><b>Top ${selectedGenre.name} ${channel}</b></p>
                        <button class="btn login-btn">View All</button>
                    </div>
                    <div id="itemsContainer${i}" class="flex gap-1em wrap items-container">
                        
                    </div>
                </div>
            `

            addCards(jsonData.data.slice(0, 4), i, channel);
        })
        .catch(error => console.log(error))
});

const addCards = (data, i, channel) => {
    const itemsContainer = document.getElementById(`itemsContainer${i}`);

    data.map((_genre, _i) => {
        itemsContainer.innerHTML += `
            <div class="card flex column">
                <div id="cardImg_${channel}_${_i}" onmouseover="updateUi(${_i}, '${channel}')" class="card-img relative">
                    <div class="card-overlay">
                        <p class="card-title">${_genre.title ? _genre.title : _genre.name}</p>
                        <div class="card-icons flex gap-05em">
                            <div id="play_${_i}_${channel}">
                                <i class="flex center-center fa fa-play"></i>
                            </div>
                            <div id="favorite_${_i}_${channel}" hidden>
                                <i class="flex center-center fa fa-heart-o"></i>
                            </div>
                            <div id="menu_${_i}_${channel}" hidden>
                                <i class="flex center-center fa fa-ellipsis-h"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <a href="#">Hot Pop</a> <br>
                    <small>50 tracks - 711,052 fans</small>
                </div>
            </div>
        `;

        document.getElementById(`cardImg_${channel}_${_i}`).style.backgroundImage = _genre.picture_xl ? `url(${_genre.picture_xl})` : _genre.cover_xl ? `url(${_genre.cover_xl})` : `url(${getImageUrl(_genre.md5_image)})`;
    });
}

const updateUi = (_i, channel, _genre) => {
    const cardImg = document.getElementById(`cardImg_${channel}_${_i}`);
    const play = document.getElementById(`play_${_i}_${channel}`);
    const favorite = document.getElementById(`favorite_${_i}_${channel}`);
    const menu = document.getElementById(`menu_${_i}_${channel}`);

    // Listen to mouse over
    cardImg.addEventListener('mouseover', () => {
        menu.removeAttribute('hidden');
        favorite.removeAttribute('hidden');
    })

    // Listen to mouse out
    cardImg.addEventListener('mouseout', () => {
        menu.setAttribute('hidden', true);
        favorite.setAttribute('hidden', true);
    })

}
