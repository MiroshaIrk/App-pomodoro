import { stopAlarm } from "./alarm.js";
import { stateTimer } from "./state.js";
import { startTimer, showTime } from "./timer.js";
import { removeClass, addClass } from "./util.js";


const btnStart = document.querySelector('.control__btn_start');
const btnStop = document.querySelector('.control__btn_stop');
const navigationBtns = document.querySelectorAll('.navigation__btn');


export const changeActiveBtn = (dataUse) => {
  stateTimer.status = dataUse;
  navigationBtns.forEach(btn => {
    btn.dataset.use === dataUse ?
      addClass(btn, 'navigation__btn_active') :
      removeClass(btn, 'navigation__btn_active');
  });
};

const changeBtn = () => navigationBtns.forEach(btn => btn.addEventListener('click', () => {
  changeActiveBtn(btn.dataset.use);
  stopTimer();
}));

export const stopTimer = () => {
  clearTimeout(stateTimer.timerId);
  stateTimer.isActive = false;
  stopAlarm();
  btnStart.textContent = 'Старт';
  stateTimer.timeLeft = stateTimer[stateTimer.status] * 60;
  showTime(stateTimer.timeLeft);
};

export const initControl = () => {
  btnStart.addEventListener('click', () => {
    if (stateTimer.isActive) {
      clearTimeout(stateTimer.timerId);
      stateTimer.isActive = false;
      btnStart.textContent = 'Старт';
    } else {
      stateTimer.isActive = true;
      btnStart.textContent = 'Пауза';
      startTimer();
    }
  });

  btnStop.addEventListener('click', stopTimer);
  changeBtn();
  showTime(stateTimer.timeLeft);
};
