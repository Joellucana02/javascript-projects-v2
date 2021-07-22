const daysEl = document.querySelector('.days'),
hoursEl = document.querySelector('.hours'),
minutesEl = document.querySelector('.mins'),
secondsEl = document.querySelector('.secs');
const newYear = '1 jan 2022';
let countDown = ()=>{
    const newYearDate =  new Date(newYear);
    const currentDate = new Date();
    let totalSecondsLeft = (newYearDate - currentDate)/1000;
    let days = Math.floor(totalSecondsLeft /3600/24);
    let hours = Math.floor(totalSecondsLeft /3600)%24;
    let minutes = Math.floor(totalSecondsLeft /60)%60;
    let seconds = Math.floor(totalSecondsLeft)%60;
    console.log(days, hours, minutes, seconds);
    daysEl.innerHTML = days;
    hoursEl.innerHTML = hours;
    minutesEl.innerHTML = minutes;
    secondsEl.innerHTML = seconds;
}
countDown();
setInterval(countDown, 1000);