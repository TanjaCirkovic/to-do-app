import { getCurrentUser } from "../services/auth";

const TASKS_KEY_PREFIX = "todo_tasks_";
const DEFAULT_TASKS = [
    {id: 1, title: "Learn Vue basics", completed: true, priority: "High"},
    {id: 2, title: "Practice Vue directives", completed: false, priority: "Medium"},
    {id: 3, title: "Create To Do App", completed: false, priority: "Low"}
];

function getTasksKey() {
    const currentUser = getCurrentUser();
    return currentUser ? `${TASKS_KEY_PREFIX}${currentUser.id}` : null;
}

export function getTasks() {
    const tasksKey = getTasksKey();
    if (!tasksKey) return [];

    const storedTasks = localStorage.getItem(tasksKey);
    if (storedTasks) return JSON.parse(storedTasks);

    const defaultTasks = DEFAULT_TASKS.map(task => ({...task}));
    saveTasks(defaultTasks);
    return defaultTasks;
}

export function saveTasks(tasks) {
    const tasksKey = getTasksKey();
    if (tasksKey) {
        localStorage.setItem(tasksKey, JSON.stringify(tasks));
    }
}

export function filterAndSortTasks(tasks, priorityFilter, statusFilter){
    let filtered = tasks.filter(task => {
        const priorityMatch = 
            priorityFilter === "All" ||
            task.priority === priorityFilter;
        const statusMatch = 
            statusFilter === "All" ||
            (statusFilter === "Completed" && task.completed) ||
            (statusFilter === "Active" && !task.completed);
        return priorityMatch && statusMatch;
    });
    if (priorityFilter === "All"){
        const priorityOrder = {
            High: 1,
            Medium: 2,
            Low: 3
        };
        filtered.sort((a, b) =>{
            if (priorityOrder[a.priority] !== priorityOrder[b.priority]){
                return priorityOrder[a.priority] - priorityOrder[b.priority]
            }
            return Number(a.completed) - Number(b.completed);
    });
    }
    return filtered;
}