const tasks = [
  {
    status: true,
    id: 1,
    description:
      'Организовать мероприятие «Вечер загадок и головоломок» для всей команды',
  },
  {
    status: false,
    id: 2,
    description:
      'Создать задачу «Написать письмо инопланетянам» и обсудить возможные ответы на их вопросы',
  },
  {
    status: true,
    id: 3,
    description: 'Поставить задачу «Построить дом из песка»',
  },
  {
    status: false,
    id: 4,
    description:
      'Разработать план «Путешествие во времени» и распределить роли для каждого сотрудника',
  },
  {
    status: false,
    id: 5,
    description:
      'Предложить идею «Создание арт-инсталляции» и предоставить материалы для её реализации',
  },
];

const tpl = document.getElementById('todo-task').content;
const ul = document.querySelector('.todo-list');
const addNewTask = document.querySelector('.todo-add-item');

addNewTask.addEventListener('submit', (e) => {
  e.preventDefault();
  const element = tpl.cloneNode(true);
  const taskText = element.querySelector('.todo-item-text');
  const delBtn = element.querySelector('.todo-item-button');

  const form = document.forms[0];
  const formInput = form.todoInput;

  taskText.textContent = formInput.value;

  delBtn.addEventListener('click', (e) => {
    e.currentTarget.parentNode.remove();
  });

  ul.appendChild(element);

  form.reset();
});

tasks.forEach((i) => {
  const element = tpl.cloneNode(true);

  const taskText = element.querySelector('.todo-item-text');
  const delBtn = element.querySelector('.todo-item-button');

  taskText.textContent = i.description;

  delBtn.addEventListener('click', (e) => {
    e.currentTarget.parentNode.remove();
  });

  ul.appendChild(element);
});
