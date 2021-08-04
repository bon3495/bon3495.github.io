// ====================== SHOW MENU ======================
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);
    const open = document.querySelector('.toggle-open');
    const close = document.querySelector('.toggle-close');
    // Validate that variables exist
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu');

        });
        //     toggle.addEventListener('click', () => {
        //         console.log([toggle]);
        //     })
    }

}
showMenu('nav-toggle', 'nav-menu')

// ====================== REMOVE MENU MOBILE ======================
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}

navLinks.forEach(link => {
    link.addEventListener('click', linkAction);
})


// ================ SCROLL SECTIONS ACTIVE LINK ================
const sections = document.querySelectorAll('section[id]');
// console.log(sections);
function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        // offsetHeight : Tổng chiều cao gồm content + border + padding + scrollbar
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id');
        // console.log('scrollY ', scrollY);
        // console.log('sectionTop', sectionTop);
        // console.log('sectionHeight', sectionHeight);
        // console.log(sectionId);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

// ================ CHANGE BACKGROUND HEADER ================
function scrollHeader() {
    const nav = document.getElementById('header');
    // When the scroll is greater than 200 viewport height
    // add the scroll-header class to the tag
    if (this.scrollY >= 200) {
        nav.classList.add('scroll-header');
    } else {
        nav.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

// ================ SHOW SCROLL TOP ================
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is greater than 560 viewport height
    // add the scroll-header class to the tag
    if (this.scrollY >= 560) {
        scrollTop.classList.add('show-scrolltop');
    } else {
        scrollTop.classList.remove('show-scrolltop');
    }
}
window.addEventListener('scroll', scrollTop);

// ================ DARK LIGHT THEME ================
const themeButton = document.querySelector('.nav__list .change-theme');
const darkTheme = 'dark-theme';
const sunIcon = 'bx-sun';

// Previously selected topic ( if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');
// console.log(selectedTheme); // light
// console.log(selectedIcon); // bx-sun
// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.firstElementChild.classList.contains(sunIcon) ? 'bx-moon' : 'bx-sun';

// console.log(getCurrentTheme()); // light
// console.log(getCurrentIcon()); // bx-sun
// We validate if the user previously choose a topic
if (selectedTheme) { // => true
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme); // remove darkTheme
    themeButton.firstElementChild.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](sunIcon); //remove sunIcon

}

// Activate / deactive the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme); // add darkTheme
    themeButton.firstElementChild.classList.toggle(sunIcon); // add sunIcon

    localStorage.setItem('selected-theme', getCurrentTheme()); // localStorage selected-theme: dark
    localStorage.setItem('selected-icon', getCurrentIcon()); // localStorage selected-icon: bx-moon

    // console.log(localStorage.getItem('selected-theme'));
    // console.log(localStorage.getItem('selected-icon'));
});

// ================ SCROLL REVEAL ANIMATION ================
const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    durantion: 2000,
    reset: true
});

sr.reveal(`.home__data, .home__img,
            .about__data, .about__img,
            .services__content, .menu__content,
            .app__data, .app__img,
            .contact__content, .contact__button,
            .footer__content`, {
    interval: 200,
    delay: 200
})
