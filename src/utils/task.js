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