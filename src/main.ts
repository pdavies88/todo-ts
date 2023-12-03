import './styles.css';
type Todo = {
  id: string;
  name: string;
  complete: boolean;
};

const form = document.querySelector<HTMLFormElement>('#new-todo-form');
const todoInput = document.querySelector<HTMLInputElement>('#todo-input');
const list = document.querySelector<HTMLUListElement>('#list');

let todoArr = loadTodos();
todoArr.forEach(renderNewTodo);

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (todoInput) {
    const todoName = todoInput.value;
    if (todoName === '') return;
    const newTodo = {
      id: crypto.randomUUID(),
      name: todoName,
      complete: false,
    };
    todoArr.push(newTodo);
    renderNewTodo(newTodo);
    saveTodos();
    todoInput.value = '';
  }
});

function renderNewTodo(todo: Todo) {
  const listItem = document.createElement('li');
  listItem.classList.add('list-item');

  const label = document.createElement('label');
  label.classList.add('list-item-label');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.complete;
  checkbox.classList.add('label-input');
  checkbox.addEventListener('change', () => {
    todo.complete = checkbox.checked;
    saveTodos();
  });

  const textElement = document.createElement('span');
  textElement.innerText = todo.name;
  textElement.classList.add('label-text');

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-btn');
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', () => {
    listItem.remove();
    todoArr = todoArr.filter((val) => val.id !== todo.id);
    saveTodos();
  });

  label.append(checkbox, textElement);
  listItem.append(label, deleteButton);
  list?.append(listItem);
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todoArr));
}

function loadTodos() {
  const value = localStorage.getItem('todos');
  if (!value) return [];
  return JSON.parse(value) as Todo[];
}
