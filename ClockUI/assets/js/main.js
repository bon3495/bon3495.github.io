const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const getData = () => {
    const date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    const day = date.getDate();
    const month = date.getMonth();
    const yearText = date.getFullYear();
    return [hh, mm, ss, day, month, yearText];
}
const renderClock = () => {
    const [hh, mm, ss] = getData();
    const hour = $('.clock .clock__circle-hour');
    const minutes = $('.clock .clock__circle-minutes');
    const seconds = $('.clock .clock__circle-seconds');
    hour.style.transform = `rotateZ(${(hh * 60 + mm) / 2}deg)`;
    minutes.style.transform = `rotateZ(${mm * 6}deg)`;
    seconds.style.transform = `rotateZ(${(ss * 6)}deg)`;
}
const renderClockDate = () => {
    const [, , , day, month, yearText] = getData();
    const htmlClockDate = $('.clock__date');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayText = day > 9 ? day : `0${day}`;
    const monthText = months[month];
    htmlClockDate.innerHTML = `${dayText} ${monthText}, ${yearText}`;
}
const renderClockText = () => {
    const [hh, mm] = getData();
    const htmlClockText = $('.clock__text');
    const hh2 = hh > 12 ? hh - 12 : hh;
    const hour = hh2 > 9 ? hh2 : `0${hh2}`;
    const minutes = mm > 9 ? mm : `0${mm}`;
    const ampm = hh > 12 ? 'PM' : 'AM';

    htmlClockText.innerHTML = `
        <span class="clock__text-hour">${hour}:</span>
        <span class="clock__text-minutes">${minutes}</span>
        <span class="clock__text-ampm">${ampm}</span>
    `
}
setInterval(function () {
    renderClock();
    renderClockText();
    renderClockDate();
}, 1000);
// =================================================================
// LOAD LOCAL STORAGE
const STORAGE_KEY = 'CLOCK_THEME';
const saveLocal = {
    config: JSON.parse(localStorage.getItem(STORAGE_KEY)) || {},
    setConfig(key, value) {
        this.config[key] = value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.config));
    }
}
// =================================================================
// CHANGE THEME
const themeBtns = [...$$('.clock__theme .clock__theme-color')];
const root = document.querySelector(':root');
const hueColor = '--hue-color';
const changeHueColor = () => {
    themeBtns.forEach(themeBtn => {
        themeBtn.onclick = (e) => {
            const newHue = window.getComputedStyle(e.target).getPropertyValue('--hue-color');
            root.style.setProperty(hueColor, newHue);
            saveLocal.setConfig('hueValue', newHue);
        }
    });
}
changeHueColor();
const changeThemeBtn = $('.clock__circle-light')
const sunIcon = 'bxs-sun';
const darkTheme = 'dark-theme';
let isChange = false;
const themeIcon = $('.theme-icon');
changeThemeBtn.onclick = (e) => {
    isChange = !isChange;
    themeIcon.classList.toggle(sunIcon, isChange);
    document.body.classList.toggle(darkTheme, isChange);
    saveLocal.setConfig('isDarkTheme', isChange);
}
const { hueValue, isDarkTheme } = saveLocal.config
if (hueValue !== undefined) {
    root.style.setProperty(hueColor, hueValue);
}
if (isDarkTheme !== undefined) {
    themeIcon.classList.toggle(sunIcon, isDarkTheme);
    document.body.classList.toggle(darkTheme, isDarkTheme);
}
