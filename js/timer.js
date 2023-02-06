import { stateTimer } from "./state.js";
import { alarm } from "./alarm.js";
import { addZero } from "./util.js";
import { changeActiveBtn } from "./control.js";
import { showTodo, updateTodo } from "./todo.js";


const minutesElement = document.querySelector('.time__minutes');
const secondsElement = document.querySelector('.time__seconds');
const title = document.title;


export const showTime = (seconds) => {
  minutesElement.textContent = addZero(Math.floor(seconds / 60));
  secondsElement.textContent = addZero(seconds % 60);
}

export const startTimer = () => {
  const countDown = new Date().getTime() + stateTimer.timeLeft * 1000;

  stateTimer.timerId = setInterval(() => {
    stateTimer.timeLeft -= 1;
    showTime(stateTimer.timeLeft);
    document.title = stateTimer.timeLeft;

    if (!(stateTimer.timeLeft % 5)) {
      const now = new Date().getTime();
      stateTimer.timeLeft = Math.floor((countDown - now) / 1000);
    }

    if (stateTimer.timeLeft > 0 && stateTimer.isActive) {
      return;
    }

    document.title = title;
    clearTimeout(stateTimer.timerId);

    if (stateTimer.status === 'work') {
      console.log(stateTimer.activeTodo)
      stateTimer.activeTodo.pomodoro += 1;
      updateTodo(stateTimer.activeTodo);

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
    showTodo();
    startTimer();
  }, 1000);
}