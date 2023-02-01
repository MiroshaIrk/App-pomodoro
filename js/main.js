import { initControl } from "./control.js";
import { stateTimer } from "./state.js";



const initPomodoro = () => {
  initControl();

  stateTimer.activeTodo = {
    id: 'default',
    pomodoro: 2,
    title: 'Помодоро'
  }
}

initPomodoro();