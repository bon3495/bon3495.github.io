const hamburger = document.getElementById('btnHamburger');
const header = document.getElementById('header');
const modal = document.getElementById('modal');

hamburger.addEventListener('click', () => {
    header.classList.toggle('open');
    modal.classList.toggle('active');

})