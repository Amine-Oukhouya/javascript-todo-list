let taskInput = document.getElementById("task-input");
let submitBtn = document.getElementById("submitBtn");
let taskDiv = document.getElementById("tasksList");
let checkBtn = document.getElementById("check");
let deleteBtn = document.getElementById("deleteBtn");
const taksnum = document.getElementById("tasknum");
let arrayOfTasks = [];

if (localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}

getData();



submitBtn.onclick = function (){
    if (taskInput.value !== ""){
        addTaskToArray(taskInput.value);
        taskInput.value = "";
    }
}


taskDiv.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete");

    // Handle deletion first
    if (deleteBtn) {
        const taskElement = deleteBtn.closest(".task");
        const taskId = taskElement.getAttribute("data-id");

        deleteFromLocalStorage(taskId);
        taskElement.remove();
        changeTaskNum()
        return;
    }

    // Handle task completion
    const taskElement = e.target.closest(".task");

    if (taskElement) {
        const taskId = taskElement.getAttribute("data-id");
        const isCompleted = taskElement.classList.toggle("done");

        const task = arrayOfTasks.find(
            task => String(task.id) === taskId
        );

        if (task) {
            task.completed = isCompleted;
            addToLocalStorage(arrayOfTasks);
        }
    }
});

function addTaskToArray(taskText){
    let task = {
        id : Date.now(),
        title: taskText,
        completed: false,
    };

    arrayOfTasks.push(task);
    addElementstoPage(arrayOfTasks);
    addToLocalStorage(arrayOfTasks);
}


function addElementstoPage(arrayOfTasks){
    taskDiv.innerHTML = "";
    arrayOfTasks.forEach((task) =>{
        let div = document.createElement('div');
        div.className = "task";

    if (task.completed) {
        div.classList.add("done");
    }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        
        let span = document.createElement("span");
        span.className = 'delete';
        span.appendChild(document.createTextNode("delete"));
        
        div.appendChild(span);
        taskDiv.appendChild(div)
    })

}
function addToLocalStorage(arrayOfTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function getData() {
    let data = localStorage.getItem("tasks");

    if (data) {
        arrayOfTasks = JSON.parse(data);
        addElementstoPage(arrayOfTasks);
    }
    changeTaskNum()
}


function deleteFromLocalStorage(taskId) {
    arrayOfTasks = arrayOfTasks.filter(
        task => String(task.id) !== taskId
    );
    addToLocalStorage(arrayOfTasks);
}

function saveDoneTasks(taskId2){
    for (let i = 0; i < arrayOfTasks.length ; i++){
        if(arrayOfTasks[i].id == taskId2){
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
    }
    addToLocalStorage(arrayOfTasks);
}
submitBtn.addEventListener("click", () =>{
    changeTaskNum();
})
function changeTaskNum(){
    taksnum.textContent = `Number of tasks is: ${arrayOfTasks.length}`

}