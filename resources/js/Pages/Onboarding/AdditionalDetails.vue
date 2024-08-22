<script setup>
import { ref, defineProps } from 'vue';
import Footer from '@/Components/Footer.vue';
import AuthNavigation from '@/Components/AuthNavigation.vue'

// Define the props for the component
defineProps({
    categories: {
        type: Object,
        required: true
    }
});

const form = ref({
  school: '',
  category_id: '',
  department: '',
  school_level: ''
});

const submitForm = () => {
    form.post(route('onboarding.save-additional-details'));
}
</script>

<template>
  <div class="full-page">
    <!-- Navigation Bar -->
    <AuthNavigation />
    <!-- Title Section -->
    <div class="title-section">
      <span class="title-text">Sign Up</span>
    </div>

    <!-- Form Section -->
    <div class="form-section">
      <!-- School Input -->
      <div class="form-group">
        <label for="school" class="form-label">School</label>
        <div class="input-container">
          <input id="school" v-model="form.school" class="custom-input" type="text" placeholder="Enter your school" maxlength="255">
        </div>
      </div>

      <!-- Category Select -->
      <div class="form-group">
        <label for="category" class="form-label">How good can you say you are at following courses</label>
        <div class="select-container">
          <select id="category" v-model="form.category_id" class="custom-select">
            <option value="" disabled>Category</option>
            <option v-for="(label, index) in categories.data" :key="index" :value="index">
              {{ label.name }}
            </option>
          </select>
          <img class="input-icon" src="/assets/vectors/vector_23_x2.svg" alt="Dropdown Icon">
        </div>
      </div>

      <!-- School Level Select -->
      <div class="form-group">
        <label for="school_level" class="form-label">Your School Level</label>
        <div class="select-container">
          <select id="school_level" v-model="form.school_level" class="custom-select">
            <option value="" disabled>School Level</option>
            <option value="high-school">High School</option>
            <option value="college">College</option>
            <option value="university">University</option>
          </select>
          <img class="input-icon" src="/assets/vectors/vector_23_x2.svg" alt="Dropdown Icon">
        </div>
      </div>

      <!-- Department Select -->
      <div class="form-group">
        <label for="department" class="form-label">Your Department</label>
        <div class="select-container">
          <select id="department" v-model="form.department" class="custom-select">
            <option value="" disabled>Department</option>
            <option value="science">Science</option>
            <option value="art">Art</option>
            <option value="commerce">Commerce</option>
            <option value="humanities">Humanities</option>
          </select>
          <img class="input-icon" src="/assets/vectors/vector_30_x2.svg" alt="Dropdown Icon">
        </div>
      </div>

      <!-- Submit Button -->
      <div class="form-submit">
        <button class="form-submit-button" @click="submitForm">Continue</button>
      </div>
    </div>

    <Footer />
  </div>
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
  margin: 150px 0 20px;
}

.title-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 52px;
  background: linear-gradient(91.19deg, #D6AD60 33.5%, #705B32 64.3%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
}

/* Form Section */
.form-section {
  width: 100%;
  max-width: 1000px;
  margin-bottom: 100px;
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

.input-container {
  position: relative;
  border-radius: 6px;
  border: 1px solid #8692A6;
  display: flex;
  align-items: center;
  padding: 23.2px 16.8px;
  margin-bottom: 19px;
  width: 100%;
  max-width: 988px;
  height: 64px;
  box-sizing: border-box;
}

.custom-input {
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
  padding-right: 50px;
}

.input-icon {
  position: absolute;
  right: 16.8px;
  width: 31px;
  height: 19.1px;
  pointer-events: none;
}

.select-container {
  position: relative;
  border-radius: 6px;
  border: 1px solid #8692A6;
  display: flex;
  align-items: center;
  padding: 23.2px 16.8px;
  margin-bottom: 19px;
  width: 100%;
  max-width: 988px;
  height: 64px;
  box-sizing: border-box;
}

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
  padding-right: 50px;
}

.form-submit {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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
  width: 100%;
  cursor: pointer;
  text-align: center;
}
</style>
