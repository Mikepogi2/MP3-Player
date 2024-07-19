const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const selectBtn = document.querySelector('.selectBtn')
const select = document.querySelector('#select')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
let end = document.querySelector('.end')
let start = document.querySelector('.start')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const artist = document.querySelector('#artist')
const cover = document.querySelector('#cover')
const shuffle = document.querySelector('#shuffle')
const heart = document.querySelector('#heart')
let isPlaying = false
let isShuffle = false

// Song titles
const songs = [
    {
        title: 'Specialz',
        artist: 'King Gnu',
        audio: 'music/Specialz.mp3',
        image: 'img/jjk.png',
        color: '#e6b1a7',
        isFav: false
    },
    {
        title: 'Omg',
        artist: 'New Jeans',
        audio: 'music/Omg.mp3',
        image: 'img/newjeans.jpg',
        color: '#284377',
        isFav: false
    },
    {
        title: 'Kickback',
        artist: 'Kenshi Yonezu',
        audio: 'music/Kickback.mp3',
        image: 'img/kenshi.jpg',
        color: '#c3544b',
        isFav: false
    },
]

// Track Songs
let index = 0

const styleElement = document.createElement('style');
document.head.appendChild(styleElement);

// Update song / List Songs

const loadSong = (song, e) => {
    title.innerText = song.title
    artist.innerText = song.artist
    audio.src = song.audio
    cover.src = song.image

    if (isShuffle == true) {
        let random = Math.floor(Math.random() * songs.length-1)
        index = random
    }

    styleElement.innerHTML = `
        .music-container:hover {
            box-shadow: 12px 12px 12px rgba(0, 0, 0, 0.5), -10px -10px 10px ${song.color};
        }
        .navigation > button {
            border-radius: 50%;
            width: 60px;
            height: 60px;
            border: none;
            color: white;
            background-color: ${song.color};
        }
    `;

    cover.classList.add('animate__animated', 'animate__fadeIn');

    // Remove animation class after animation ends
    cover.addEventListener('animationend', () => {
        cover.classList.remove('animate__animated', 'animate__fadeIn');
    }, { once: true });
}

const playSong = () => {
    audio.play()
    playBtn.classList.remove('fa-play')
    playBtn.classList.add('fa-pause')
    isPlaying = !isPlaying
}

const pauseSong = () => {
    audio.pause()
    playBtn.classList.remove('fa-pause')
    playBtn.classList.add('fa-play')
    isPlaying = !isPlaying
}

const nextSong = () => {
    index++
    if(index > songs.length - 1) {
        index = 0
    }
    if (isPlaying == true) {
        loadSong(songs[index])
        audio.play()
    }
    else {
        loadSong(songs[index])
    }
}

const prevSong = () => {
    index--
    if(index < 0) {
        index = songs.length - 1
    }
    if (isPlaying == true) {
        loadSong(songs[index])
        audio.play()
    }
    else {
        loadSong(songs[index])
    }
}

const updateProgress = (e) => {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`;

    start.innerText = formatTime(currentTime);

    if (progressPercent == 100) {
        nextSong()
    }
}

const setProgress = (e) => {
    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
};

// Format time helper function
const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Event listeners
playBtn.addEventListener('click', () => {
    if(isPlaying == false) {
        playSong()
    }
    else {
        pauseSong()
    }
})

nextBtn.addEventListener('click', () => {
    nextSong()
})

prevBtn.addEventListener('click', () => {
    prevSong()
})

audio.addEventListener('timeupdate', updateProgress)
audio.addEventListener('loadedmetadata', () => {
    end.innerText = formatTime(audio.duration);
});

progressContainer.addEventListener('click', setProgress)

shuffle.addEventListener('click', () => {
    isShuffle = !isShuffle
    if (isShuffle == true) {
        shuffle.style.color = 'grey'
    }
    else {
        shuffle.style.color = ''
    }
    console.log(isShuffle)
})

selectBtn.addEventListener('click', () => {
    const selectedValue = select.value
    console.log(selectedValue)
    index = selectedValue
    loadSong(songs[index])
})

// Initial Load Song in DOM
loadSong(songs[index])
listSong()
