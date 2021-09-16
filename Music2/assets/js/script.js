const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Array
const carousel = [...$$('.home-carousel .home-carousel-img')];
// ===
const musicPlayer = $('.music-player');
const downBtn = $('.btn-down');
const togglePlay = $('.toggle-play');
const barsBtn = $('.btn-bars');
const playList = $('.playlist');
const backBtn = $('.btn-back');
const recently = $('.recently-played');
const listening = $('.listening');
const favourite = $('.favourite');
const playlistSongs = $('.playlist-songs');
const title = $('.music-navigation-name');
const artist = $('.artist-name');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const prevBtn = $('.btn-prev');
const nextBtn = $('.btn-next');
const seekBar = $('#seekBar');
const repeatBtn = $('.btn-repeat');
const randomBtn = $('.btn-random');
const volumeBtn = $('.btn-volume');
const volumeRange = $('.controls-volume-range');
const currentTimeSong = $('.current-time');
const durationTime = $('.duration');
const clickActiveSong = $('.playlist');
const scale = (num, inMin, inMax, outMin, outMax) => {
    return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

// App
const app = {
    data: {
        playlist: [
            {
                name: 'BIGBANG',
                image: './assets/img/bb0.jpeg'
            },
            {
                name: 'Tiktok Hot',
                image: './assets/img/tiktok.jpeg'
            },
            {
                name: 'TOP 100 Billboard',
                image: './assets/img/billboard.jpeg'
            },
            {
                name: 'Rock Collection',
                image: './assets/img/cover10.png'
            },
            {
                name: 'KPOP',
                image: './assets/img/kpop.jpeg'
            },
            {
                name: 'EDM Festivals',
                image: './assets/img/cover11.png'
            },
            {
                name: 'Top 10 Acoustics',
                image: './assets/img/cover5.png'
            },
        ],
        listeningList: [
            {
                name: 'KPOP',
                image: './assets/img/kpop.jpeg'
            },
            {
                name: 'EDM Remix',
                image: './assets/img/edm.jpeg'
            },
            {
                name: 'BIGBANG',
                image: './assets/img/bb0.jpeg'
            },
        ],
        favourite: [
            {
                name: 'Tiktok Hot',
                image: './assets/img/tiktok.jpeg'
            },
            {
                name: 'BIGBANG',
                image: './assets/img/bb0.jpeg'
            },
            {
                name: 'EDM Remix',
                image: './assets/img/edm.jpeg'
            },
            {
                name: 'KPOP',
                image: './assets/img/kpop.jpeg'
            },
        ],
        songs: [
            [
                {
                    name: 'Bae Bae',
                    singer: 'Big Bang',
                    path: './assets/music/BaeBae.mp3',
                    image: './assets/img/bb1.jpeg'
                },
                {
                    name: 'Blue',
                    singer: 'Big Bang',
                    path: './assets/music/Blue.mp3',
                    image: './assets/img/bb2.jpeg'
                },
                {
                    name: 'Haru Haru',
                    singer: 'Big Bang',
                    path: './assets/music/HaruHaru.mp3',
                    image: './assets/img/bb3.jpeg'
                },
                {
                    name: 'Let Me Hear Your Voice',
                    singer: 'Big Bang',
                    path: './assets/music/LetMeHearYourVoice.mp3',
                    image: './assets/img/bb4.jpeg'
                },
                {
                    name: 'Lets Not Fall In Love',
                    singer: 'Big Bang',
                    path: './assets/music/LetsNotFallInLove.mp3',
                    image: './assets/img/bb5.jpeg'
                },
                {
                    name: 'Lies',
                    singer: 'Big Bang',
                    path: './assets/music/Lies.mp3',
                    image: './assets/img/bb6.jpeg'
                },
                {
                    name: 'Loser',
                    singer: 'Big Bang',
                    path: './assets/music/Loser.mp3',
                    image: './assets/img/bb7.jpeg'
                },
                {
                    name: 'Oh Ma Baby',
                    singer: 'Big Bang',
                    path: './assets/music/OhMaBaby.mp3',
                    image: './assets/img/bb8.jpeg'
                },
                {
                    name: 'Sunset Glow',
                    singer: 'Big Bang',
                    path: './assets/music/SunsetGlow.mp3',
                    image: './assets/img/bb9.jpeg'
                },
                {
                    name: 'Tell Me Goodbye',
                    singer: 'Big Bang',
                    path: './assets/music/TellMeGoodbye.mp3',
                    image: './assets/img/bb10.jpeg'
                }
            ],
            [
                {
                    name: 'Aloha',
                    singer: 'Cool',
                    path: './assets/music/aloha.mp3',
                    image: './assets/img/aloha.jpeg'
                },
                {
                    name: 'Đông Miên',
                    singer: 'Tư Nam',
                    path: './assets/music/DongMien.mp3',
                    image: './assets/img/dongmien.jpeg'
                },
                {
                    name: 'Đường Tôi Chở Em Về',
                    singer: 'Bùi Trường Linh',
                    path: './assets/music/duongtoichoemve.mp3',
                    image: './assets/img/duongtoichoemve.jpeg'
                },
                {
                    name: 'Là Em Tự Đa Tình',
                    singer: 'Hồ Dương Lâm',
                    path: './assets/music/latuemdatinh.mp3',
                    image: './assets/img/latuemdatinh.jpeg'
                },
                {
                    name: 'Lumisolar',
                    singer: 'Shaun',
                    path: './assets/music/lumisolar.mp3',
                    image: './assets/img/lumisolar.jpeg'
                },
                {
                    name: 'Tát Nhật Lãng Rực Rỡ',
                    singer: 'Yếu Bất Yếu Mãi Thái',
                    path: './assets/music/tatnhatlangrucro.mp3',
                    image: './assets/img/tatnhatlang.jpeg'
                },
                {
                    name: 'Thats Why',
                    singer: 'Michael Learns To Rock',
                    path: './assets/music/thatswhy.mp3',
                    image: './assets/img/thatswhy.jpeg'
                },
                {
                    name: 'Tiếu Nạp',
                    singer: 'Hoa Đồng',
                    path: './assets/music/TieuNap.mp3',
                    image: './assets/img/tieunap.jpeg'
                },
                {
                    name: 'Way Back Home',
                    singer: 'Shaun',
                    path: './assets/music/waybackhome.mp3',
                    image: './assets/img/waybackhome.jpeg'
                },
                {
                    name: 'Where Is The Love',
                    singer: 'The Black Eyed Peas',
                    path: './assets/music/WhereIsTheLove.mp3',
                    image: './assets/img/whereisthelove.jpeg'
                },
                {
                    name: 'Lemon Tree (remix)',
                    singer: 'DJ DESA REMIX',
                    path: './assets/music/lemontree.mp3',
                    image: './assets/img/lemontree.jpeg'
                },
            ],
        ]
    },
    currentImgIndex: 0,
    currentIndex: 0,
    currentSongsIndex: 0,
    arrIndex: [],
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    render() {
        const htmlPlaylist = this.data.playlist.map((item, index) => {
            return `
            <div class="playlist-card" data-index="${index}">
                <img src="${item.image}" alt="" class="playlist-card-img">
                <p class="playlist-card-name">${item.name}</p>
            </div>
            `
        }).join('');
        recently.innerHTML = htmlPlaylist;
        const htmlListening = this.data.listeningList.map((item) => {
            return `
            <div class="playlist-card">
                <img src="${item.image}" alt="" class="playlist-card-img">
                <p class="playlist-card-name">${item.name}</p>
            </div>
            `
        }).join('');
        listening.innerHTML = htmlListening;
        const htmlFavourite = this.data.favourite.map((item) => {
            return `
            <div class="playlist-card">
                <img src="${item.image}" alt="" class="playlist-card-img">
                <p class="playlist-card-name">${item.name}</p>
            </div>
            `
        }).join('');
        favourite.innerHTML = htmlFavourite;
        this.loadPlaylists(this.currentSongsIndex);
    },
    loadPlaylists(index) {
        const htmlSongs = this.data.songs[index].map((song, _index) => {
            return `
            <div class="playlist-song ${_index === this.currentIndex ? 'active' : ''}" data-index="${_index}">
                <div class="playlist-song-cover">
                    <img src="${song.image}" alt="" class="playlist-song-img">
                    <i class="fas fa-pause playing-icon"></i>
                </div>
                <p class="playlist-song-name">${song.name} - ${song.singer}</p>
            </div>
            `
        }).join('');
        playlistSongs.innerHTML = htmlSongs;
    },
    changeCarousel() {
        carousel[this.currentImgIndex].classList.toggle('active')
        if (this.currentImgIndex >= carousel.length - 1) {
            this.currentImgIndex = 0;
        } else {
            this.currentImgIndex++;
        }
        carousel[this.currentImgIndex].classList.toggle('active')
        // console.log(carousel[this.currentImgIndex]);
    },
    defineProperties() {
        Object.defineProperty(this, 'currentSong', {
            get() {
                const currentSongs = this.data.songs[this.currentSongsIndex];
                return currentSongs[this.currentIndex];
            }
        })
    },
    handleEvents() {
        musicPlayer.onclick = (e) => {
            if (!e.target.closest('.btn-down')) {
                musicPlayer.classList.add('active');
            }
        }

        downBtn.onclick = () => {
            musicPlayer.classList.remove('active');
        }

        const cdThumbAnimate = cdThumb.animate([ // Xử lý đĩa CD xoay tròn theo bài nhạc
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause(); // Ban đầu cho đĩa CD dừng

        togglePlay.onclick = (e) => { // Xử lý khi click vào nút play
            e.stopPropagation();
            if (this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        audio.onplay = () => { // Xử lý khi nhạc bắt đầu chạy
            this.isPlaying = true;
            togglePlay.classList.add('active');
            cdThumbAnimate.play();
        }

        audio.onpause = () => { // Xử lý khi nhạc dừng
            this.isPlaying = false;
            togglePlay.classList.remove('active');
            cdThumbAnimate.pause();
        }

        barsBtn.onclick = (e) => {
            e.stopPropagation();
            playList.classList.add('active');
        }

        backBtn.onclick = () => {
            playList.classList.remove('active');

        }

        recently.onclick = (e) => {
            const card = e.target.closest('.playlist-card');
            if (card) {
                playList.classList.add('active');
                this.currentSongsIndex = card.dataset.index;
                this.loadPlaylists(this.currentSongsIndex);
            }
        }

        // Chạy range input theo tiến độ nhạc
        audio.ontimeupdate = () => {
            let currentTime = audio.currentTime;
            const duration = audio.duration;
            if (duration) {
                seekBar.value = scale(currentTime, 0, duration, seekBar.min, seekBar.max);
                durationTime.innerHTML = this.formatTime(duration)
                currentTimeSong.innerHTML = this.formatTime(currentTime);
            }
        }

        // Xử lý tua bài hát
        seekBar.oninput = (e) => {
            e.stopPropagation();
            const rangeValue = e.target.value;
            const duration = audio.duration;
            if (duration) {
                audio.currentTime = scale(rangeValue, seekBar.min, seekBar.max, 0, duration);
            }
        }

        nextBtn.onclick = (e) => {
            e.stopPropagation();
            if (this.isRandom) {
                this.randomSong();
            } else {
                this.nextSong();
            }
            audio.play();
            this.activeSong();
            this.scrollIntoView();
        }

        prevBtn.onclick = (e) => {
            e.stopPropagation();
            if (this.isRandom) {
                this.randomSong();
            } else {
                this.prevSong();
            }
            audio.play();
            this.activeSong();
            this.scrollIntoView();
        }

        randomBtn.onclick = (e) => {
            e.stopPropagation();
            this.isRandom = !this.isRandom;
            randomBtn.classList.toggle('active', this.isRandom);
            if (this.isRandom) {
                this.getIndexArray();
                this.isRepeat = false;
                repeatBtn.classList.toggle('active', this.isRepeat);
            } else {
                this.arrIndex = [];
            }
        }

        repeatBtn.onclick = (e) => {
            e.stopPropagation();
            this.isRepeat = !this.isRepeat;
            repeatBtn.classList.toggle('active', this.isRepeat);
            if (this.isRepeat) {
                this.isRandom = false;
                randomBtn.classList.toggle('active', this.isRandom);
            }
        }

        audio.onended = () => {
            if (this.isRandom) {
                this.randomSong();
            } else {
                if (this.isRepeat) {
                    this.loadCurrentSong();
                } else {
                    this.nextSong();
                }
            }
            audio.play();
            audio.activeSong();
            this.scrollIntoView();
        }

        clickActiveSong.onclick = (e) => {
            const song = e.target.closest('.playlist-song:not(.active)');
            if (song) {
                this.currentIndex = song.dataset.index;
                this.loadCurrentSong();
                this.scrollIntoView();
                this.activeSong();
                audio.play();
            }
        }
    },
    loadCurrentSong() {
        title.innerHTML = this.currentSong.name;
        artist.innerHTML = this.currentSong.singer;
        cdThumb.src = this.currentSong.image;
        audio.src = this.currentSong.path;
        setTimeout(() => {
            durationTime.innerHTML = this.formatTime(audio.duration);
        }, 300);
        // this.getIndexArray();
    },
    nextSong() {
        this.currentIndex++;
        if (this.currentIndex >= this.data.songs[this.currentSongsIndex].length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.data.songs[this.currentSongsIndex].length - 1;
        }
        this.loadCurrentSong();

    },
    getIndexArray() {
        this.data.songs[this.currentSongsIndex].forEach((song, index) => {
            this.arrIndex.push(index);
        })
    },
    randomSong() {
        const randomIndex = Math.floor(Math.random() * this.arrIndex.length);
        this.currentIndex = this.arrIndex[randomIndex];
        this.arrIndex.splice(randomIndex, 1);
        this.loadCurrentSong();
        if (this.arrIndex < 1) {
            this.getIndexArray();
        }
    },
    activeSong() {
        const oldActive = $('.playlist-song.active')
        oldActive.classList.remove('active');

        const playlistSongs = $$('.playlist-song');
        playlistSongs[this.currentIndex].classList.add('active');
    },
    formatTime(time) {
        let min = Math.floor(time / 60);
        if (min < 10) {
            min = `0` + min;
        }
        let sec = Math.floor(time % 60);
        if (sec < 10) {
            sec = `0` + sec;
        }
        return `${min} : ${sec}`;
    },
    scrollIntoView() {
        const song = $('.playlist-song.active');
        setTimeout(() => {
            song.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        }, 300);
    },
    start() {
        setInterval(() => {
            this.changeCarousel();
        }, 3000);

        this.defineProperties();

        this.handleEvents();

        this.loadCurrentSong();

        this.render();

    }
}

app.start();