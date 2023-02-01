import { stateTimer } from "./state.js";
import { startTimer, showTime } from "./timer.js";
import { removeClass, addClass } from "./util.js";


const btnStart = document.querySelector('.control__btn_start');
const btnStop = document.querySelector('.control__btn_stop');
const navigationBtns = document.querySelectorAll('.navigation__btn');


export const changeActiveBtn = (dataUse) => {
  navigationBtns.forEach(btn => {
    btn.dataset.use === dataUse ?
      addClass(btn, 'navigation__btn_active') :
      removeClass(btn, 'navigation__btn_active');
  });
};

const changeHandler = (event) => {
  const dataUse = event.target.dataset.use;

  navigationBtns.forEach(btn => {
    removeClass(btn, 'navigation__btn_active');
  });
  addClass(event.target, 'navigation__btn_active');
  stateTimer.status = dataUse;
  stateTimer.timeLeft = stateTimer[stateTimer.status] * 60;

  stopTimer();
  showTime(stateTimer.timeLeft);
}

const changeBtn = () => navigationBtns.forEach(btn => btn.addEventListener('click', changeHandler));

const stopTimer = () => {
  clearTimeout(stateTimer.timerId);
  stateTimer.isActive = false;
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
