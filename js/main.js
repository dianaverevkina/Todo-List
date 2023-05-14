const tasks  = document.querySelector( '.tasks' );
const taskInput = tasks.querySelector( '.tasks__input' );
const tasksList = tasks.querySelector( '.tasks__list' );
const taskAddBtn = tasks.querySelector( '.tasks__add' );

const savedList = localStorage.getItem( 'myTasksList' );

// Отобразить на странице сохраненные задачи
if ( savedList ) {
  tasksList.innerHTML += savedList;

  const checks = tasksList.querySelectorAll( '.task__checkbox' );
  checks.forEach( check => {
    check.addEventListener( 'change', saveCheck );
    check.checked = localStorage.getItem( check.id ) === 'true';
  });

  const taskEdits = tasksList.querySelectorAll( '.task-edit' );
  taskEdits.forEach( taskEdit => taskEdit.addEventListener( 'click', editTask ) );

  const taskRemoves = tasksList.querySelectorAll( '.task-remove' );
  taskRemoves.forEach( taskRemove => taskRemove.addEventListener( 'click', removeTask ) );
}

// Добавить задачу при клике на кнопку "Добавить" или при нажатии Enter
function addTask (e, el) {

  if ( !(el.value.trim()) ) return;
    
  const task = document.createElement('div');
  task.classList.add('task');

  let checkId = Math.floor(Math.random() * 1000 + Math.random() * 1000); 

  task.innerHTML += `
    <label class="task__check">
      <input class="task__checkbox" id="${checkId}" type="checkbox" name="task">
      <span class="task__check-icon"></span>
    </label>
    <div class="task__item">
      <div class="task__title">
        ${el.value}
      </div>
      <input class="task__title-edit task__title-edit_hidden">
      <div class="task__controls">
        <div class="task__control task-edit">
          <img class="task-edit__icon" src="img/edit.png">
        </div>
        <div class="task__control task-remove">
          <img class="task-remove__icon" src="img/delete.png">
        </div>
      </div>
    </div>
  `;

  tasksList.append(task);
 
  el.value = '';
  el.focus();

  registerTaskEvents(task);

  storeTasks();
  e.preventDefault();
}

// Добавляем обработчики событий на поле ввода задачи и кнопку Добавить
taskInput.addEventListener( 'keydown', function(e) {
  if (  e.key === 'Enter' ) {
    addTask( e, this );
  }
});

taskAddBtn.addEventListener( 'click', (e) => addTask( e, taskInput ) );

// Сохраняем список задач в локальное хранилище
function storeTasks() {
  let html = tasksList.innerHTML;
  localStorage.setItem( 'myTasksList', html );
}


// Добавляем обработчики событий для чекбокса и кнопок Редактировать и Удалить
function registerTaskEvents (el) {
  const check = el.querySelector( '.task__checkbox' );
  check.addEventListener( 'change', saveCheck );

  const taskRemove = el.querySelector( '.task-remove' );
  taskRemove.addEventListener( 'click', removeTask );

  const taskEdit = el.querySelector( '.task-edit' );
  taskEdit.addEventListener( 'click', editTask );
}

// Сохраняем  состояние чекбокса в локальное хранилище
function saveCheck() {
  localStorage.setItem(this.id, this.checked);
}

// Удаляем задачу
function removeTask(e) {
  e.preventDefault();

  const { target } = e;
  const task = target.closest( '.task' );
  const taskCheck = task.querySelector( '.task__checkbox' );

  localStorage.removeItem(taskCheck.id);
  task.remove();
  storeTasks();
}

// Редактируем задачу
function editTask (e) {
  const { target } = e;
  const task = target.closest( '.task' );
  const taskTitle = task.querySelector( '.task__title' );
  const taskTitleEdit = task.querySelector( '.task__title-edit' );

  taskTitle.classList.add( 'task__title_hidden' );
  taskTitleEdit.classList.remove( 'task__title-edit_hidden' );

  taskTitleEdit.value = taskTitle.textContent.trim();

  registerTaskInputEvents(taskTitle, taskTitleEdit);

  taskTitleEdit.focus();
}

// Добавляем обработчики событий на поле редактирования задачи
function registerTaskInputEvents (title, titleInput) {

  titleInput.addEventListener( 'input', function () {
    title.textContent = this.value;
  });

  titleInput.addEventListener( 'blur', function () {
    title.classList.remove( 'task__title_hidden' );
    this.classList.add( 'task__title-edit_hidden' );
    storeTasks();
  })

}











