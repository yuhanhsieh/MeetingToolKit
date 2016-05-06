console.log('hello world, kero');
// var myVar = setInterval(myTimer, 1000);
//
// function myTimer() {
//     var d = new Date();
//     console.log(d.toLocaleTimeString());
// }

var seconds = 0, minutes = 0, hours = 0, t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    currentTime = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    console.log(currentTime);
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}
timer();
