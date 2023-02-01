import { stateTimer } from "./state.js";
import { alarm } from "./alarm.js";


const minutesElement = document.querySelector('.time__minutes');
const secondsElement = document.querySelector('.time__seconds');


const showTime = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  minutesElement.textContent = minutes < 10 ? `0${minutes}` : minutes;
  secondsElement.textContent = seconds < 10 ? `0${seconds}` : seconds;


}

export const startTimer = () => {
  stateTimer.timeLeft -= 1;
  console.log('stateTimer: ', stateTimer.timeLeft);


  showTime(stateTimer.timeLeft)

  if (stateTimer.timeLeft > 0 && stateTimer.isActive) {
    stateTimer.timerId = setTimeout(startTimer, 1000);
  }
  if (stateTimer.timeLeft <= 0) {
    alarm();
  }

}