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
}

const addTodo = (title) => {
  const todo = {
    title,
    pomodoro: 0,
    id: Math.random().toString().substring(2, 8),
  }

  const todoList = getTodo();
  todoList.push(todo);

  localStorage.setItem('pomodoro', JSON.stringify(todoList));
  return todo;
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
    })
    editBtn.addEventListener('click', () => {
      const title = prompt('Введите название задачи');
      const todoList = getTodo();
      console.log(todo.id)
      todoList.forEach(todoItem => {
        if (todoItem.id === todo.id) todoItem.title = title
      });
      localStorage.setItem('pomodoro', JSON.stringify(todoList));
      stateTimer.activeTodo = todoList[todoList.length - 1];
      showTodo();
      renderTodoList(todoList);
    })
    delBtn.addEventListener('click', () => {
      let todoList = getTodo();

      todoList = todoList.filter(todoItem => {
        if (todoItem.id !== todo.id) return todoItem;
      });
      stateTimer.activeTodo = todoList[todoList.length - 1];
      localStorage.setItem('pomodoro', JSON.stringify(todoList));
      showTodo();
      renderTodoList(todoList);
    })
  }
}

const renderTodoList = (list) => {
  todoListElem.textContent = '';
  list.forEach(createTodoItem)
  todoListElem.append(li);
}

const showTodo = () => {
  titleElem.textContent = stateTimer.activeTodo.title;
  countElem.textContent = stateTimer.activeTodo.pomodoro;
}

export const initTodo = () => {
  const todoList = getTodo();

  if (!todoList.length) {
    stateTimer.activeTodo = [{
      id: 'default',
      pomodoro: 0,
      title: 'Помодоро'
    }]
  } else {
    stateTimer.activeTodo = todoList[todoList.length - 1];
  }

  showTodo();
  renderTodoList(todoList);
  todoAddBtn.addEventListener('click', () => {
    const title = prompt('Введите название задачи');
    const todo = addTodo(title);
    createTodoItem(todo);
  })
  // console.log(stateTimer.activeTodo);
}