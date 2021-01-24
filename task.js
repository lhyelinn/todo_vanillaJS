let count = 1;

const taskForm = document.querySelector(".js-taskForm"),
  taskInput = taskForm.querySelector("input"),
  pendingList = document.querySelector(".js-pendingList"),
  completedList = document.querySelector(".js-completedList");

const PENDING_LS = "pending tasks";
const COMPLETED_LS = "completed tasks";

let pendings = [];
let completeds = [];

function addTask(text, listType) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const cmpBtn = document.createElement("button");
  const span = document.createElement("span");
  const newID = count;
  const taskObj = {
    text: text,
    id: newID
  };
  count += 1;

  span.innerText = text;
  delBtn.innerText = "❌";
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(cmpBtn);
  li.id = newID;
  listType.appendChild(li);

  delBtn.addEventListener("click", deleteTask);
  if (listType === pendingList) {
    cmpBtn.innerText = "✅";
    pendings.push(taskObj);
    localStorage.setItem(PENDING_LS, JSON.stringify(pendings));
    cmpBtn.addEventListener("click", deleteTask);
    cmpBtn.addEventListener("click", function (e) {
      addTask(text, completedList);
    });
  } else {
    cmpBtn.innerText = "⏪";
    completeds.push(taskObj);
    localStorage.setItem(COMPLETED_LS, JSON.stringify(completeds));
    cmpBtn.addEventListener("click", deleteTask);
    cmpBtn.addEventListener("click", function (e) {
      addTask(text, pendingList);
    });
  }
}

function deleteTask(event) {
  const btn = event.target;
  const li = btn.parentNode;
  if (li.parentNode.className === "js-pendingList") {
    pendingList.removeChild(li);
    const cleanPendings = pendings.filter(function (pending) {
      return pending.id !== parseInt(li.id, 10);
    });
    pendings = cleanPendings;
    localStorage.setItem(PENDING_LS, JSON.stringify(pendings));
  } else {
    completedList.removeChild(li);
    const cleanCompleteds = completeds.filter(function (completed) {
      return completed.id !== parseInt(li.id, 10);
    });
    completeds = cleanCompleteds;
    localStorage.setItem(COMPLETED_LS, JSON.stringify(completeds));
  }
}

function handleTaskSubmit(event) {
  event.preventDefault();
  const currentTask = taskInput.value;
  addTask(currentTask, pendingList);
  taskInput.value = "";
}

function loadTasks() {
  const pendingtasks = localStorage.getItem(PENDING_LS);
  const completedtasks = localStorage.getItem(COMPLETED_LS);
  taskForm.addEventListener("submit", handleTaskSubmit);
  if (pendingtasks !== null) {
    const parsedPendings = JSON.parse(pendingtasks);
    parsedPendings.forEach(function (pending) {
      addTask(pending.text, pendingList);
    });
  }
  if (completedtasks !== null) {
    const parsedCompleteds = JSON.parse(completedtasks);
    parsedCompleteds.forEach(function (completeds) {
      addTask(completeds.text, completedList);
    });
  }
}

function init() {
  loadTasks();
}

init();
