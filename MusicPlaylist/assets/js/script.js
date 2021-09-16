
/*
    1. Render Songs -> ok
    2. Scroll top -> ok
    3. Play / Pause / Seek -> ok
    4. CD Rotate -> ok
    5. Next / Previous -> ok
    6. Random -> ok
    7. Next / Repeat when ended -> ok
    8. Active Song -> ok
    9. Scroll active song into view -> ok
    10. Play song when click
*/
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAYER_STORAGE_KEY = 'F8_PLAYER';
const player = $('.player');
const cd = $('#cd');
const title = $('.title');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('#playlist');
const scale = (num, inMin, inMax, outMin, outMax) => {
    return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    arrIndex: [],
    songs: [
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
    ],
    setConfig(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render() {
        const html = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')"></div>
                <div class="body">
                    <h3 class="body-title">${song.name}</h3>
                    <p class="body-author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class='bx bx-dots-horizontal-rounded'></i>
                </div>
            </div>
            `
        }).join('');
        playlist.innerHTML = html;
    },
    defineProperties() {
        Object.defineProperty(this, 'currentSong', {
            get() {
                return this.songs[this.currentIndex];
            }
        });
    },
    handleEvents() {
        // Xử lý phóng to thu nhỏ Cd Thumb
        const cdWidth = cd.offsetWidth;
        document.onscroll = function () {
            // console.log(window.scrollY);
            // console.log(document.documentElement.scrollTop);
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            // console.log(newCdWidth);
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }
        // Xử lý đĩa cd xoay tròn theo bài nhạc
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause();
        // Xử lý khi click play
        playBtn.onclick = () => {
            if (this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }
        // Khi nhạc đang chạy
        audio.onplay = () => {
            this.isPlaying = true;
            player.classList.add("playing");
            cdThumbAnimate.play();
        }
        //Khi nhạc dừng
        audio.onpause = () => {
            this.isPlaying = false;
            player.classList.remove("playing");
            cdThumbAnimate.pause();
        }
        // range input chạy theo tiếng độ nhạc
        audio.ontimeupdate = () => {
            // console.log(audio.currentTime);
            let currentTime = audio.currentTime;
            const duration = audio.duration;
            if (duration) {
                progress.value = scale(currentTime, 0, duration, progress.min, progress.max);
            }
        }
        // Tua nhạc thì nó update thanh range input
        progress.oninput = (e) => {
            const duration = audio.duration;
            const rangeValue = e.target.value;
            if (duration) {
                audio.currentTime = scale(rangeValue, progress.min, progress.max, 0, duration);
            }
        }
        nextBtn.onclick = () => {
            if (this.isRandom) {
                this.randomSong();
            } else {
                this.nextSong();
            }
            audio.play();
            this.activeSong();
            this.scrollIntoView();
        };
        prevBtn.onclick = () => {
            if (this.isRandom) {
                this.randomSong();
            } else {
                this.prevSong();
            }
            audio.play();
            this.activeSong();
            this.scrollIntoView();
        }
        randomBtn.onclick = () => {
            this.isRandom = !this.isRandom;
            randomBtn.classList.toggle('active', this.isRandom);
            if (this.isRandom) {
                this.isRepeat = false;
                repeatBtn.classList.remove('active');
                this.createArrayIndex();
            } else {
                this.arrIndex = [];
            }
            this.setConfig('random', this.isRandom);
            this.setConfig('repeat', this.isRepeat);
        }
        repeatBtn.onclick = () => {
            this.isRepeat = !this.isRepeat;
            repeatBtn.classList.toggle('active', this.isRepeat);
            if (this.isRepeat) {
                this.isRandom = false;
                randomBtn.classList.remove('active');
            }
            this.setConfig('repeat', this.isRepeat);
            this.setConfig('random', this.isRandom);
        }
        audio.onended = () => {
            if (this.isRepeat) {
                this.loadCurrentSong();
            } else {
                if (this.isRandom) {
                    this.randomSong();
                } else {
                    this.nextSong();
                }
            }
            audio.play();
            this.activeSong();
            this.scrollIntoView();
        }
        playlist.onclick = (e) => {
            const activeSong = e.target.closest('.song:not(.active)');
            const option = e.target.closest('.option');
            if (activeSong && !option) {
                const songIndex = +activeSong.dataset.index;
                this.currentIndex = songIndex;
                this.loadCurrentSong();
                this.activeSong();
                audio.play();
            } else if (option) {
                // Option Song
            }
        }
    },
    loadCurrentSong() {
        title.innerHTML = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    nextSong() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    createArrayIndex() {
        this.songs.forEach((song, index) => {
            this.arrIndex.push(index);
        })
    },
    randomSong() {
        const randomIndex = Math.floor(Math.random() * this.arrIndex.length);
        this.currentIndex = this.arrIndex[randomIndex];
        this.arrIndex.splice(randomIndex, 1);
        this.loadCurrentSong();
        if (this.arrIndex.length < 1) {
            this.createArrayIndex();
        }
    },
    activeSong() {
        const songsIndex = $$('.player .song');
        // Cách 1:
        // Array.from(songsIndex).forEach((song) => {
        //     const songIndex = +song.dataset.index;
        //     if (this.currentIndex === songIndex) {
        //         song.classList.add('active');
        //     } else {
        //         song.classList.remove('active');
        //     }
        // })
        // Cách 2:
        const currentSongActive = $('.song.active');
        currentSongActive.classList.remove('active');
        songsIndex[this.currentIndex].classList.add('active');
    },
    scrollIntoView() {
        const song = $('.player .song.active');
        setTimeout(() => {
            song.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        }, 300);
    },
    loadConfig() {
        this.isRandom = this.config.random;
        this.isRepeat = this.config.repeat;
    },
    saveConfig() {
        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat);
    },
    start() {
        // Gán cấu hình từ config (lưu ở Local storage) vào ứng dụng
        this.loadConfig();
        // Định nghĩa các thuộc tính cho Object
        this.defineProperties();
        // Lắng nghe và xử lý các sự kiện
        this.handleEvents();
        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();
        // Render danh sách bài hát
        this.render();
        // Hiển thị trạng thái button random và repeat trước đó đã lưu
        this.saveConfig();
    }
}
app.start();


/*
1. Tạo 1 mảng mới bao gồm index của songs: arr = [0,1,2,3,4,...9]
2. Từ mảng mới chọn ngẫu nhiên ra một index và gán vào currentIndex
3. Sau khi gán index vào currentIndex ta thực hiện xóa index đó ra khỏi mảng
4. Khi mảng thành rỗng arr = [] ta gán lại cho mảng trở thành như ban đầu
*/
// const arr= []
// this.songs.forEach((item,index)=> {
//     arr.push(index);
// })

// // arr = [0,1,2,3,4,5,6,7,8,9]
// const randomIndex = Math.floor(Math.random() * (arr.length - 0) + 0);

// currentIndex = arr[randomIndex];
// arr.splice(randomIndex, 1);

// if (arr.length < 1) {

// }
