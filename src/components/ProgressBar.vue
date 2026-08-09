<template>
    <div class="progress-wrapper">
        <div class="progress-info">
            <span>{{completedTasks}} / {{totalTasks}} completed</span>
            <span>{{progress}}%</span>
        </div>
        <div class="progress-bar">
            <div class="progress-fill"
                :style="{width: progress + '%'}"
            >
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: "ProgressBar",
    props: {
        completedTasks: Number,
        totalTasks: Number
    },
    computed: {
        progress() {
            if(this.totalTasks === 0) return 0;
            return Math.round(
                (this.completedTasks / this.totalTasks) * 100
            );
        }
    }
};
</script>

<style>
.progress-wrapper{
    margin:25px 0;
}
.progress-info{
    display:flex;
    justify-content:space-between;
    margin-bottom:8px;
    font-weight:bold;
}
.progress-bar{
    width:100%;
    height:22px;
    background:#ddd;
    border-radius:12px;
    overflow:hidden;
}
.progress-fill{
    height:100%;
    background:linear-gradient(to right,#2ecc71,#27ae60);
    transition:width .4s ease;
}
</style>
