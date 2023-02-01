import { stateTimer } from "./state.js";
import { startTimer } from "./timer.js";

const btnStart = document.querySelector('.control__btn_start');


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

};