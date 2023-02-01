

export const addZero = n => n < 10 ? `0${n}` : n;
export const removeClass = (elem, cls) => elem.classList.remove(cls);
export const addClass = (elem, cls) => elem.classList.add(cls);