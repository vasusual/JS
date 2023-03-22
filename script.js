let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let display = document.getElementById("display");
let start = document.getElementById("start");
let stop = document.getElementById("stop");
let reset = document.getElementById("reset");
let intervalId;

function displaymin() {
  display.innerHTML =
    (minutes.value > 9 ? minutes.value : "0" + minutes.value) +
    ":" +
    (seconds.value > 9 ? seconds.value : "0" + seconds.value);
}

function watch() {
  start.disabled = true;
  minutes.disabled = true;
  seconds.disabled = true;

  var date1 = new Date();
  var countDownDate = new Date();
  countDownDate.setTime(
    date1.getTime() + minutes.value * 60 * 1000 + seconds.value * 1000 + 1000
  );

  intervalId = setInterval(function () {
    var now = new Date().getTime();

    var distance = countDownDate - now;

    var minutesRemaining = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var secondsRemaining = Math.floor((distance % (1000 * 60)) / 1000);

    display.innerHTML =
      (minutesRemaining > 9 ? minutesRemaining : "0" + minutesRemaining) +
      ":" +
      (secondsRemaining > 9 ? secondsRemaining : "0" + secondsRemaining);

    if (distance < 0) {
      clearInterval(intervalId);
      display.innerHTML = "00:00";
      start.disabled = false;
      minutes.disabled = false;
      seconds.disabled = false;
      stop.disabled = true;
    }
  }, 1000);

  stop.disabled = false;
}

function stopTimer() {
  clearInterval(intervalId);
  start.disabled = false;
  minutes.disabled = false;
  seconds.disabled = false;
  stop.disabled = true;
}

function resetTimer() {
    clearInterval(intervalId);
    minutes.value = "0";
    seconds.value = "0";
    display.innerHTML = "00:00";
    start.disabled = false;
    stop.disabled = true;
  }
  




