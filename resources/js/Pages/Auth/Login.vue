<script setup>
import InputError from '@/Components/InputError.vue';
import { Link, useForm } from '@inertiajs/vue3';
import Footer from '@/Components/Footer.vue';
import AuthNavigation from '@/Components/AuthNavigation.vue'

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>
<template>
  <div class="full-page">
    <!-- Navigation Bar -->
    <AuthNavigation />
    <!-- Title Section -->
    <div class="title-section">
      <span class="title-text">Login</span>
    </div>

    <!-- Form Section -->
    <form @submit.prevent="submit">
        <div class="form-section">

        <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <div class="input-container">
            <input type="email" id="email" v-model="form.email" required autocomplete="username" class="custom-input" />
            </div>
            <InputError class="mt-2" :message="form.errors.email" />
        </div>
        <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <div class="input-container">
            <input type="password" id="password" autocomplete="current-password" v-model="form.password" class="custom-input" />
            </div>
            <InputError class="mt-2" :message="form.errors.password" />
        </div>
        <div class="form-group">
            <Link
                :href="route('register')"
                class="login-redirect"
            >
                Don't have an account? Sign up!
            </Link>
        </div>
        <div class="form-submit" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
            <button class="form-submit-button">Continue</button>
        </div>
        </div>
    </form>
</div>
  <Footer />
</template>

<style scoped>
.full-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FAFAFA;
  padding: 20px;
}

/* Title Section */
.title-section {
  margin: 150px 0 20px 0; /* Added margin-top */
}

.title-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 52px;
  background: linear-gradient(91.19deg, #D6AD60 33.5%, #705B32 64.3%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap; /* Prevent text from breaking */
}

/* Form Section */
.form-section {
  width: 100%;
  max-width: 1000px;
  margin-bottom: 100px; /* Added margin-bottom */
}

.form-group {
  margin-bottom: 30px;
}

.form-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #18181B;
}

.input-container,
.select-container {
  position: relative;
  border-radius: 6px;
  border: 1px solid #8692A6;
  display: flex;
  align-items: center;
  padding: 23.2px 16.8px;
  margin-bottom: 19px;
  width: 988px;
  height: 64px;
  box-sizing: border-box;
}

.custom-input,
.custom-select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  outline: none;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #18181B;
  width: 100%;
  background-color: transparent;
  padding-right: 50px; /* Adjust padding to make room for icon */
}

.input-icon {
  position: absolute;
  right: 16.8px;
  width: 31px;
  height: 19.1px;
  pointer-events: none;
}

.label-row,
.input-row {
  display: flex;
  justify-content: space-between;
}

.input-row .input-container {
  width: 463px;
}

.login-redirect {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 16px;
  color: #71717A;
  cursor: pointer;
}

.form-submit {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Full width */
}

.form-submit-button {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #FFFFFF;
  background: linear-gradient(270deg, #D6AD60, #D6AD60);
  border: none;
  border-radius: 10px;
  padding: 15px;
  width: 100%; /* Full width */
  cursor: pointer;
  text-align: center; /* Center the text */
}
</style>
