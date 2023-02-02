import { stateTimer } from "./state.js";
import { alarm } from "./alarm.js";
import { addZero } from "./util.js";
import { changeActiveBtn } from "./control.js";


const minutesElement = document.querySelector('.time__minutes');
const secondsElement = document.querySelector('.time__seconds');



export const showTime = (seconds) => {
  minutesElement.textContent = addZero(Math.floor(seconds / 60));
  secondsElement.textContent = addZero(seconds % 60);
}

export const startTimer = () => {
  stateTimer.timeLeft -= 15;


  showTime(stateTimer.timeLeft);

  if (stateTimer.timeLeft > 0 && stateTimer.isActive) {
    stateTimer.timerId = setTimeout(startTimer, 1000);
  }

  if (stateTimer.timeLeft <= 0) {

    if (stateTimer.status === 'work') {
      stateTimer.activeTodo.pomodoro += 1;

      if (stateTimer.activeTodo.pomodoro % stateTimer.count) {
        stateTimer.status = 'break';
      } else {
        stateTimer.status = 'relax';
      }

    } else {
      stateTimer.status = 'work'
    }

    alarm();
    stateTimer.timeLeft = stateTimer[stateTimer.status] * 60;

    changeActiveBtn(stateTimer.status);
    startTimer();
  }

}