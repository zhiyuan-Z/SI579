const addTaskButton = document.querySelector('#add_task');
const taskDescriptionInput = document.querySelector('#task_description_input');
const dueDateInput = document.querySelector('#duedate_input');
const dueTimeInput = document.querySelector('#duetime_input');

function addTask(description, dueTime) {
    let ul = document.querySelector('ul#task_list');
    if (dueTime) {
        const date = new Date(dueTime);
        time = `${date.toLocaleString('en-US')}`;
        ul.innerHTML += `<li>${description}<span class="due">due ${time}</span><button class="btn btn-sm btn-outline-danger done" type="button">Done</button></li>`
    } else {
        ul.innerHTML += `<li>${description}<button class="btn btn-sm btn-outline-danger done" type="button">Done</button></li>`
    }
    taskDescriptionInput.value = '';
    dueDateInput.value = '';
    dueTimeInput.value = '';
}

addTask('Problem Set 4', '2/16/2022 03:30:00 PM');
addTask('Online Community Study Paper', '2/14/2022 05:30:00 PM');
addTask('HW 04 Part I', '2/17/2022 02:00:00 PM');
addTask('Quiz 2: VR', '2/18/2022 11:59:00 PM');
addTask('Find Internship');

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time
    
    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

addTaskButton.addEventListener('click', () => {
    addTask(taskDescriptionInput.value, dateAndTimeToTimestamp(dueDateInput, dueTimeInput));
});

taskDescriptionInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        addTask(taskDescriptionInput.value, dateAndTimeToTimestamp(dueDateInput, dueTimeInput));
    }
})

document.querySelector('ul#task_list').addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('btn') && e.target.classList.contains('done')) {
        e.target.parentElement.remove();
    }
})