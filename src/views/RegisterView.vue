<template>
    <div class="auth-container">
        <div class="auth-card">
            <h1>Create an account</h1>
            <p class="auth-description">
                Register to start managing your tasks.
            </p>
            <form @submit.prevent="handleRegister">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        v-model="username"
                        placeholder="Enter username"
                    >
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        v-model="password"
                        placeholder="Enter password"
                    >
                </div>
                <div class="form-group">
                    <label for="confirmPassword">
                        Confirm password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        v-model="confirmPassword"
                        placeholder="Repeat password"
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
                    :disabled="!formValid || registered"
                    class="auth-button"
                >
                    {{ registered ? "Registered" : "Register" }}
                </button>
            </form>
            <p class="auth-link-text">
                Already have an account?
                <RouterLink to="/login">
                    Login here
                </RouterLink>
            </p>
        </div>
    </div>
</template>

<script>
import {registerUser, loginUser} from "../services/auth";

export default {
    name: "RegisterView",
    data() {
        return {
            username: "",
            password: "",
            confirmPassword: "",
            message: "",
            messageType: "",
            registered: false
        };
    },
    computed: {
        formValid() {
            return (
                this.username.trim().length >= 3 &&
                this.password.length >= 4 &&
                this.confirmPassword === this.password
            );
        }
    },
    methods: {
        handleRegister() {
            if (!this.formValid) {
                this.message = "Please complete all fields correctly.";
                this.messageType = "error";
                return;
            }
            const result = registerUser(
                this.username.trim(),
                this.password
            );
            if (!result.success) {
                this.message = result.message;
                this.messageType = "error";
                return;
            }
            this.message = "Registration successful. Logging you in...";
            this.messageType = "success";
            this.registered = true;

            const loginResult = loginUser(
                this.username.trim(),
                this.password
            );
            if (loginResult.success) {
                window.dispatchEvent(
                    new Event ("auth-changed")
                );
                setTimeout(() => {
                    this.$router.push("/");
                }, 1000);
            }
        }
    }
};
</script>