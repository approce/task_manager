(function example() {
    var taskList = createNewTaskList();
    var task     = createNewTask();

    var tasksInTaskList = taskList.get('tasks');
    tasksInTaskList.add(task);

    taskListCollection.add(taskList);
})();

function createNewTaskList() {
    var taskList = {
        id   : 0,
        title: 'Very fist task list'
    };

    return new TaskListModel({id: taskList.id, title: taskList.title});
}

function createNewTask() {
    var task = {
        id   : 0,
        title: 'Very first task',
        done : false
    };

    return new Task({id: task.id, title: task.title, done: task.done});
}
