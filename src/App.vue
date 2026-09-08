<template>
    <div class="app">
        <Navbar/>
        <main class="main-content">
            <RouterView />
        </main>
    </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default{
    components:{
        Navbar
    }
};
</script>

