// The task list for the academic planner
(function () {
  const storageKey = 'cos106-planner-tasks';

  const form = document.getElementById('task-form');
  const input = document.getElementById('task-input');
  const dueInput = document.getElementById('task-due');
  const list = document.getElementById('task-list');
  const empty = document.getElementById('planner-empty');
  const filters = document.querySelectorAll('.filters button');
  const total = document.getElementById('stat-total');
  const doneCount = document.getElementById('stat-done');
  const leftCount = document.getElementById('stat-left');

  let tasks = getTasks();
  let filter = 'all';

  function getTasks() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch (error) {
      console.log('Could not load saved tasks.');
    }

    return [
      { id: makeId(), title: 'Submit COS 106 term project', due: '', done: false },
      { id: makeId(), title: 'Review ISC2 CC domain 3 flashcards', due: '', done: false }
    ];
  }

  function save() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
    } catch (error) {
      console.log('Could not save tasks.');
    }
  }

  function makeId() {
    return 't-' + Math.random().toString(36).slice(2, 10);
  }

  function addTask(title, due) {
    title = title.trim();
    if (!title) return;

    tasks.push({
      id: makeId(),
      title: title,
      due: due || '',
      done: false
    });

    save();
    showTasks();
  }

  function changeTask(id) {
    tasks.forEach(function (task) {
      if (task.id === id) task.done = !task.done;
    });

    save();
    showTasks();
  }

  function removeTask(id) {
    tasks = tasks.filter(function (task) {
      return task.id !== id;
    });

    save();
    showTasks();
  }

  function getVisibleTasks() {
    if (filter === 'active') {
      return tasks.filter(function (task) { return !task.done; });
    }

    if (filter === 'completed') {
      return tasks.filter(function (task) { return task.done; });
    }

    return tasks;
  }

  function dueText(value) {
    if (!value) return '';

    const date = new Date(value + 'T00:00:00');
    if (isNaN(date.getTime())) return value;

    return 'Due ' + date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric'
    });
  }

  function makeRow(task) {
    const row = document.createElement('li');
    row.className = 'task' + (task.done ? ' done' : '');
    row.dataset.id = task.id;

    const check = document.createElement('button');
    check.className = 'check';
    check.type = 'button';
    check.setAttribute('aria-label', task.done ? 'Mark as not done' : 'Mark as done');
    check.textContent = task.done ? '\u2713' : '';
    check.addEventListener('click', function () {
      changeTask(task.id);
    });

    const body = document.createElement('div');
    body.className = 'body';

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = task.title;
    body.appendChild(title);

    if (task.due) {
      const due = document.createElement('div');
      due.className = 'due';
      due.textContent = dueText(task.due);
      body.appendChild(due);
    }

    const remove = document.createElement('button');
    remove.className = 'del';
    remove.type = 'button';
    remove.setAttribute('aria-label', 'Delete task');
    remove.textContent = '\u2715';
    remove.addEventListener('click', function () {
      removeTask(task.id);
    });

    row.appendChild(check);
    row.appendChild(body);
    row.appendChild(remove);
    return row;
  }

  function showTasks() {
    const visible = getVisibleTasks();
    list.innerHTML = '';

    if (visible.length === 0) {
      empty.style.display = 'block';
    } else {
      empty.style.display = 'none';
      visible.forEach(function (task) {
        list.appendChild(makeRow(task));
      });
    }

    total.textContent = tasks.length;
    doneCount.textContent = tasks.filter(function (task) { return task.done; }).length;
    leftCount.textContent = tasks.filter(function (task) { return !task.done; }).length;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    addTask(input.value, dueInput.value);
    input.value = '';
    dueInput.value = '';
    input.focus();
  });

  filters.forEach(function (button) {
    button.addEventListener('click', function () {
      filters.forEach(function (item) {
        item.classList.remove('active');
      });

      button.classList.add('active');
      filter = button.dataset.filter;
      showTasks();
    });
  });

  showTasks();
})();
