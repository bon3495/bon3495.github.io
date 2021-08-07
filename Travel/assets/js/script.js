// ================ SHOW MENU ================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    })
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    })
}

// ================ REMOVE MENU MOBILE ================
const navLinks = document.querySelectorAll('.nav__link');
const linkActive = () => {
    const showMenu = 'show-menu';
    navMenu.classList.remove(showMenu);
}
navLinks.forEach(link => {
    link.addEventListener('click', linkActive);
})

// ================ CHANGE BACKGROUND HEADER ================
function scrollHeader() {
    const header = document.getElementById('header');
    // When the scroll is greater than 200 viewport height
    // add the scroll-header class to the tag
    if (this.scrollY >= 30) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);


// ================ CLICK HOME TO TOP ================
// const homeBtn = document.querySelector('a[href="#toTop"]');
// homeBtn.addEventListener('click', () => {
//     window.scrollTo({ top: 0 });
// })

// ================ SWIPER ================
var swiper = new Swiper('.discover__data', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    spaceBetween: 32,
    coverflowEffect: {
        rotate: 0,
    },
    pagination: {
        el: '.swiper-pagination',
    }, breakpoints: {
        // when window width is >= 320px
        // 320: {
        // slidesPerView: 3,
        // spaceBetween: 32
        // },
        // when window width is >= 480px
        // 768: {
        //     slidesPerView: 3,
        //     spaceBetween: 32
        // },
        // when window width is >= 640px
        1024: {
            // slidesPerView: 3,
            spaceBetween: 50
        }
    }
});

// ================ COUTING UP ================
$('.counter').countUp({
    'time': 1000
});


// ================ PLAYING VIDEO ================
const videoFile = document.getElementById('video-file');
const videoBtn = document.getElementById('video-button');
const videoIcon = document.getElementById('video-icon');

const playPause = () => {
    if (videoFile.paused) {
        // play video
        videoFile.play();

        // we change icon
        videoIcon.classList.remove('ri-play-line');
        videoIcon.classList.add('ri-pause-mini-line');
    } else {
        // pause video
        videoFile.pause();

        // we change icon
        videoIcon.classList.remove('ri-pause-mini-line');
        videoIcon.classList.add('ri-play-line');
    }
}
videoBtn.addEventListener('click', playPause);

function finalVideo() {
    videoIcon.classList.remove('ri-pause-mini-line');
    videoIcon.classList.add('ri-play-line');
}
videoFile.addEventListener('ended', finalVideo);

// ================ SHOW SCROLL TOP ================
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is greater than 560 viewport height
    // add the scroll-header class to the tag
    if (this.scrollY >= 240) {
        scrollUp.classList.add('show-scrolltop');
    } else {
        scrollUp.classList.remove('show-scrolltop');
    }
}
window.addEventListener('scroll', scrollUp);

// ================ SCROLL SECTIONS ACTIVE LINK ================
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50;

        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);


// ================ DARK LIGHT THEME ================
const themeButton = document.querySelector('.change-theme');
const darkTheme = 'dark-theme';
const sunIcon = 'ri-sun-line';

// Previously selected topic ( if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');
// console.log(selectedTheme); // light
// console.log(selectedIcon); // bx-sun
// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(sunIcon) ? 'ri-sun-line' : 'ri-moon-line';

// console.log(getCurrentTheme()); // light
// console.log(getCurrentIcon()); // bx-sun
// We validate if the user previously choose a topic
if (selectedTheme) { // => true
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme); // remove darkTheme
    themeButton.classList[selectedIcon === 'ri-sun-line' ? 'add' : 'remove'](sunIcon); //remove sunIcon

}

// Activate / deactive the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme); // add darkTheme
    themeButton.classList.toggle(sunIcon); // add sunIcon

    localStorage.setItem('selected-theme', getCurrentTheme()); // localStorage selected-theme: dark
    localStorage.setItem('selected-icon', getCurrentIcon()); // localStorage selected-icon: bx-moon

    // console.log(localStorage.getItem('selected-theme'));
    // console.log(localStorage.getItem('selected-icon'));
});


// ================ SCROLL REVEAL ANIMATION ================
const sr = ScrollReveal({
    distance: '60px',
    durantion: 2800,
    // reset: true,
})

sr.reveal(`.home__data,
            .home__info,
            .home__social-link,
            .sponsor__content,
            .place,
            .footer__data`, {
    origin: 'top',
    interval: 100,
})


sr.reveal(` .section__title,
            .section__description,
            .button,
            .experience__content
            `, {
    origin: 'left',
    interval: 100,
})


sr.reveal(`.about__img,
            .discover__container,
            .experience__imgs,
            .video__content,
            .subscribe__form
            `, {
    origin: 'right',
    interval: 100,
})