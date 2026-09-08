<template>
    <nav class="navbar">
        <div class="navbar-container">
            <RouterLink to="/" class="navbar-logo">
                ToDo App
            </RouterLink>
            <RouterLink 
                v-if="!loggedIn"
                to="/register" 
                class="nav-link">
                Register
            </RouterLink>
            <RouterLink 
                v-if="!loggedIn"
                to="/login" 
                class="nav-link">
                Login
            </RouterLink>
            <button
                v-if="loggedIn"
                @click="handleLogout"
                class="logout-btn">
                Logout
            </button>
        </div>
    </nav>
</template>

<script>
import {getCurrentUser, logoutUser} from "../services/auth" 

export default {
    name: "Navbar",
    data() {
        return {
            loggedIn: !!getCurrentUser()
        };
    },
    mounted() {
        window.addEventListener("auth-changed", this.updateAuth);
    },
    beforeUnmount() {
        window.removeEventListener("auth-changed", this.updateAuth);
    },
    methods: {
        updateAuth() {
            this.loggedIn = !!getCurrentUser();
        },
        handleLogout() {
            logoutUser();
            this.loggedIn = false;
            this.$router.push("/login");
        }
    }
};
</script>
            
