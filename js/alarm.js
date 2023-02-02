import { stateTimer } from "./state.js";


const audio = {
  work: new Audio('./audio/san-andreas.mp3'),
  break: new Audio('./audio/eralash.mp3'),
  relax: new Audio('./audio/august.mp3'),
}
export const alarm = () => {
  audio[stateTimer.status].play();
}

export const stopAlarm = () => {
  audio[stateTimer.status].pause();
}