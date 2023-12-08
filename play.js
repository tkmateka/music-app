const trackToPlay = sessionStorage.trackToPlay ? JSON.parse(sessionStorage.trackToPlay): null;
const player = document.getElementById('player');

if(!trackToPlay) {
    window.location = 'genre.html';
}

console.log(trackToPlay);

player.innerHTML += `
    <audio src="${trackToPlay.link}" autoplay>PLAY</audio>
    <audio controls>
        <source src="${trackToPlay.preview}" type="audio/mpeg">
    </audio>
`