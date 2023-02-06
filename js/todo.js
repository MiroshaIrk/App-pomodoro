import { changeActiveBtn, stopTimer } from "./control.js";
import { stateTimer } from "./state.js";
import { addClass } from "./util.js";


const titleElem = document.querySelector('.title');
const countElem = document.querySelector('.count_num');
const todoListElem = document.querySelector('.todo__list');
const li = document.createElement('li');
const todoAddBtn = document.createElement('button');

addClass(li, 'todo__item');
addClass(todoAddBtn, 'todo__add');

todoAddBtn.textContent = 'Добавить новую задачу';
li.append(todoAddBtn);


const getTodo = () => {
  const todoList = JSON.parse(localStorage.getItem('pomodoro') || '[]');

  return todoList;
};

const addTodo = (title) => {
  const todo = {
    title,
    pomodoro: 0,
    id: Math.random().toString().substring(2, 8),
  };
  const todoList = getTodo();
  todoList.push(todo);
  localStorage.setItem('pomodoro', JSON.stringify(todoList));
  return todo;
};

export const updateTodo = (todo) => {
  const todoList = getTodo();

  if (!todoList.length) return;

  const todoItem = todoList.find(item => item.id === todo.id);
  todoItem.title = todo.title;
  todoItem.pomodoro = todo.pomodoro;
  localStorage.setItem('pomodoro', JSON.stringify(todoList));
};

const deleteTodo = (todo) => {
  const todoList = getTodo();
  const newTodoList = todoList.filter(item => item.id !== todo.id);

  if (todo.id === stateTimer.activeTodo.id) {
    stateTimer.activeTodo = newTodoList[newTodoList.length - 1];
  }

  localStorage.setItem('pomodoro', JSON.stringify(newTodoList));
}

const createTodoItem = todo => {
  if (todo.id !== 'default') {
    const todoItem = document.createElement('li');
    const todoItemWrapper = document.createElement('div');
    const todoBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const delBtn = document.createElement('button');

    addClass(todoItem, 'todo__item');
    addClass(todoItemWrapper, 'todo__item-wrapper');
    addClass(todoBtn, 'todo__btn');
    addClass(editBtn, 'todo__edit');
    addClass(delBtn, 'todo__del');

    todoBtn.textContent = todo.title;
    editBtn.ariaLabel = 'Редактировать';
    delBtn.ariaLabel = 'Удалить';

    todoItem.append(todoItemWrapper);
    todoItemWrapper.append(todoBtn, editBtn, delBtn);
    todoListElem.prepend(todoItem);

    todoBtn.addEventListener('click', () => {
      stateTimer.activeTodo = todo;
      showTodo();
      changeActiveBtn('work');
      stopTimer();
    });
    editBtn.addEventListener('click', () => {
      todo.title = prompt('Введите название задачи', todo.title);
      todoBtn.textContent = todo.title;
      if (todo.id === stateTimer.activeTodo.id) {
        stateTimer.activeTodo.title = todo.title;
      }
      updateTodo(todo);
      showTodo();
    });
    delBtn.addEventListener('click', () => {
      deleteTodo(todo);
      todoItem.remove(todo);
      showTodo();
    });
  }
}

const renderTodoList = (list) => {
  todoListElem.textContent = '';
  list.forEach(createTodoItem)
  todoListElem.append(li);
}

export const showTodo = () => {

  if (stateTimer.activeTodo) {
    titleElem.textContent = stateTimer.activeTodo.title;
    countElem.textContent = stateTimer.activeTodo.pomodoro;
  } else {
    titleElem.textContent = '';
    countElem.textContent = 0;
  }

}

export const initTodo = () => {
  const todoList = getTodo();

  if (!todoList.length) {
    stateTimer.activeTodo = {
      id: 'default',
      pomodoro: 0,
      title: 'Помодоро'
    };
  } else {
    stateTimer.activeTodo = todoList[todoList.length - 1];
  }

  showTodo();
  renderTodoList(todoList);

  todoAddBtn.addEventListener('click', () => {
    const title = prompt('Введите название задачи')?.trim();
    const todo = addTodo(title);
    createTodoItem(todo);
  });
}