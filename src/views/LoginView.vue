<template>
    <div class="auth-container">
        <div class="auth-card">
            <h1>Login</h1>
            <p class="auth-description">
                Login to manage your tasks.
            </p>
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="username">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        v-model="username"
                        placeholder="Enter username"
                    >
                </div>
                <div class="form-group">
                    <label for="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        v-model="password"
                        placeholder="Enter password"
                    >
                </div>
                <p
                    v-if="message"
                    :class="messageType"
                    class="auth-message"
                >
                    {{ message }}
                </p>
                <button
                    type="submit"
                    :disabled="!formValid || loggedIn"
                    class="auth-button"
                >
                    {{ loggedIn ? "Logged in" : "Login" }}
                </button>
            </form>
            <div class="register-prompt">
                <p>Don't have an account?</p>
                <RouterLink to="/register">
                    Create an account
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
import {loginUser,getCurrentUser} from "../services/auth";

export default {
    name: "LoginView",
    data() {
        return {
            username: "",
            password: "",
            message: "",
            messageType: "",
            loggedIn: !!getCurrentUser()
        };
    },
    computed: {
        formValid() {
            return (
                this.username.trim().length >= 3 &&
                this.password.length >= 4
            );
        }
    },
    methods: {
        handleLogin() {
            if (!this.formValid) {
                this.message = "Please enter your username and password.";
                this.messageType = "error";
                return;
            }
            const result = loginUser(
                this.username.trim(),
                this.password
            );
            if (!result.success) {
                this.message = result.message;
                this.messageType = "error";
                return;
            }
            this.message = "Login successful. Welcome back!";
            this.messageType = "success";
            this.loggedIn = true;

            window.dispatchEvent (new Event("auth-changed"));
            setTimeout (() => {
                this.$router.push("/");
            }, 1000);
        }
    }
};
</script>