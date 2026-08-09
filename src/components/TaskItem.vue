<template>
    <div class="task"
        :class="{
        completed:task.completed,
        high:task.priority==='High'
        }"
    >
        <div class="info">
            <h3>{{task.title}}</h3>
            <p>Priority: <b>{{task.priority}}</b></p>
            <p>Status: <b>
                {{task.completed? "Completed" : "Active"}}</b>
            </p>
        </div>
        <div class="buttons">
        <button class="complete-btn"
                @click="$emit('complete', task.id)"
                :disabled="task.completed"
            >
                Complete
            </button>
            <button class="delete-btn"
                @click="$emit('delete', task.id)"
            >
                Delete
            </button>
        </div>
    </div>
</template>

<script>
    export default{
        props:{
        task:Object
        }
    }
</script>
