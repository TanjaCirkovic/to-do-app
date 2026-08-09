<template>
    <div class="container">
        <h1>Todo App</h1>
        <ProgressBar
            :completedTasks="completedTasks"
            :totalTasks="totalTasks"
        />
        <div class="toolbar">
            <input
                v-model="newTask"
                placeholder="Enter task..."
            >
            <select v-model="newPriority">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
            </select>
            <button @click="addTask">
                Add Task
            </button>
        </div>
        <div class="filters">
            <select v-model="priorityFilter">
                <option value="All">All priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <select v-model="statusFilter">
                <option value="All">All statuses</option>
                <option value="Completed">Completed</option>
                <option value="Active">Active</option>
            </select>
        </div>
        <p v-if="filteredTasks.length === 0">
            No tasks available!
        </p>
        <p v-else-if="allComleted" class="celebration">
            🎉 Congratulations! You completed all tasks! 🎉
        </p>
        <TaskItem
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
            @complete = "completeTask"
            @delete = "deleteTask"
        />
    </div>
</template>

<script>
import TaskItem from "./components/TaskItem.vue";
import ProgressBar from "./components/ProgressBar.vue"
import {filterAndSortTasks} from "./utils/task";

export default{
    components:{
        TaskItem,
        ProgressBar
    },
    data(){
      return{
        tasks:[
            {id:1, title:"Learn Vue basics", completed: true, priority: "High"},
            {id:2, title:"Practice Vue directives", completed: false, priority: "Medium"},
            {id:3, title:"Create To Do App", completed: false, priority: "Low"}
        ],
        newTask: "",
        newPriority: "Medium",
        priorityFilter: "All",
        statusFilter: "All"
      }
    },
    computed:{
        filteredTasks(){
              return filterAndSortTasks(
                    this.tasks,
                    this.priorityFilter,
                    this.statusFilter
          );
        },
        allComleted() {
            return this.tasks.length > 0 && 
                   this.tasks.every(task => task.completed);
        },
        completedTasks() {
            return this.tasks.filter(task => task.completed).length;
        },
        totalTasks() {
            return this.tasks.length;
        }
    },
    methods:{
        addTask(){
            if(this.newTask.trim() === "") return;
            this.tasks.push({
                id: Date.now(),
                title: this.newTask,
                completed: false,
                priority: this.newPriority
            });
            this.newTask = "";
            this.newPriority = "Medium";
        },
        completeTask(id){
            const task = this.tasks.find(t => t.id === id);
            if(task){
                task.completed = true;
            }
        },
        deleteTask(id){
            this.tasks = this.tasks.filter(task => task.id !== id);
        }
    }
}
</script>

