<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { Link } from "@inertiajs/vue3";

defineProps({
  skills: {
    type: Object,
  },
});

const form = useForm({
  selectedSkills: [],
});

// Function to handle skill selection
const toggleSkill = (skillId) => {
  console.log(skillId)
  const index = form.selectedSkills.indexOf(skillId);
  if (index > -1) {
    form.selectedSkills.splice(index, 1);
  } else {
    form.selectedSkills.push(skillId);
  }
};

// Function to handle form submission
const submitForm = () => {
  form.post(route('onboarding.add-user-skills'));
};
</script>

<template>
  <div class="skill-selection-container">
    <div class="background-layer"></div>
    <div class="decoration-left-image"></div>
    <div class="decoration-left-skill-1"></div>
    <div class="decoration-left-skill-2"></div>
    <div class="decoration-right-skill-1"></div>
    <div class="decoration-right-skill-2"></div>
    <div class="content-wrapper">
      <div class="image-section">
        <div class="main-image">
          <div class="image-text-wrapper">
            <img class="decoration-main" src="/assets/images/elated_1.png" />
            <span class="intro-text">
              Now that You’re ready, We just need to know a bit more about you so that I can calculate the best path for you.
            </span>
          </div>
        </div>
      </div>
      
      <div class="skill-selection-section">
        <div class="section-header">What Skills Are You Interested In Learning?</div>
        <div class="section-subheader">(Click all that Apply)</div>
        <div class="divider"></div>
        <div class="skills-grid">
          <div v-for="skill in skills.data" :key="skill.id" class="skill-item" :class="{ 'selected': form.selectedSkills.includes(skill.id) }" @click="toggleSkill(skill.id)">
            {{ skill.name }}
          </div>
        </div>
        <button class="cta-button" @click="submitForm">I’m Done!</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Your existing CSS styles */
.skill-selection-container {
  background-color: #FFFFFF;
  display: flex;
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  min-height: 100vh; /* Full viewport height */
  position: relative;
  padding: 20px; /* Add padding to the container */
}
.background-layer {
  background-color: #FAFAFA;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
}
.decoration-left-image {
  background: url('../assets/images/gold_transformed_1.png') center center/cover no-repeat;
  position: absolute;
  left: 0px; /* Adjusted position */
  top: 50%;
  transform: translateY(-50%);
  width: 150px;
  height: 100px;
}
.decoration-left-skill-1 {
  background: url('../assets/images/gold_transformed_1.png') center center/cover no-repeat;
  position: absolute;
  left: 0px; /* Adjusted position */
  top: calc(50% + 150px);
  width: 150px;
  height: 100px;
}
.decoration-left-skill-2 {
  background: url('../assets/images/gold_transformed_1.png') center center/cover no-repeat;
  position: absolute;
  left: 0px; /* Adjusted position */
  top: calc(50% + 300px);
  width: 150px;
  height: 100px;
}
.decoration-right-skill-1 {
  background: url('../assets/images/gold_transformed_1.png') center center/cover no-repeat;
  position: absolute;
  right: 0px; /* Adjusted position */
  top: calc(50% + 150px);
  width: 150px;
  height: 100px;
}
.decoration-right-skill-2 {
  background: url('../assets/images/gold_transformed_1.png') center center/cover no-repeat;
  position: absolute;
  right: 0px; /* Adjusted position */
  top: calc(50% + 300px);
  width: 150px;
  height: 100px;
}
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */
  width: 100%; /* Full width */
  max-width: 1200px; /* Limit content width */
  box-sizing: border-box;
  position: relative;
  padding: 20px; /* Add padding */
}
.image-section {
  display: flex;
  justify-content: center;
  padding: 20px 0 0 0; /* Reduced padding */
  width: 100%; /* Full width */
  max-width: 1100px; /* Limit content width */
  height: auto; /* Allow height to adjust based on content */
  overflow: hidden; /* Hide overflow content */
}
.main-image {
  border-radius: 50px;
  background-color: #D6AD60;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px; /* Reduced padding */
  max-width: 1000px; /* Limit content width */
  box-sizing: border-box;
  position: relative;
}
.image-text-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column; /* Stack vertically */
}
.decoration-main {
  width: 300px; /* Reduced size */
  height: 300px; /* Reduced size */
}
.intro-text {
  margin-top: 20px; /* Add top margin */
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 300;
  font-size: 30px; /* Reduced font size */
  color: #000000;
  text-align: center; /* Center align text */
}
.skill-selection-section {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid #000000;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */
  padding: 20px; /* Reduced padding */
  margin: 20px; /* Adjusted margin */
  width: 100%; /* Full width */
  max-width: 900px; /* Limit content width */
  box-sizing: border-box;
  position: relative; /* Add relative positioning */
}
.section-header {
  margin: 0 50px 30px 50px; /* Reduced margin */
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 400;
  font-size: 35px; /* Reduced font size */
  color: #000000;
  text-align: center; /* Center align text */
}
.section-subheader {
  margin: 0 20px 20px 0; /* Reduced margin */
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 400;
  font-size: 30px; /* Reduced font size */
  color: #000000;
  text-align: center; /* Center align text */
}
.divider {
  background-color: #000000;
  margin: 0 0 20px 0;
  width: 100%; /* Full width */
  max-width: 800px; /* Limit divider width */
  height: 1px;
}
.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Reduced gap */
  margin: 0 10px 20px 10px; /* Reduced margin */
  justify-content: center; /* Center align skills */
}
.skill-item {
  border-radius: 1000px;
  border: 3px solid #D6AD60; /* Reduced border */
  background-color: #D9D9D9;
  padding: 20px; /* Adjusted padding */
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 25px; /* Reduced font size */
  color: #000000;
  cursor: pointer;
  text-align: center; /* Center align text */
}
.skill-item.selected {
  background-color: #D6AD60;
}
.cta-button {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: 3px solid #000000;
  background-color: #D6AD60;
  position: absolute;
  left: 50%; /* Center horizontally */
  transform: translateX(-50%) translateY(50%); /* Center horizontally and move half outside */
  bottom: -20px; /* Adjust position */
  padding: 20px; /* Reduced padding */
  width: 300px; /* Adjusted width */
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 30px; /* Reduced font size */
  color: #000000;
  cursor: pointer;
}

@media (max-width: 1200px) {
  .image-text-wrapper {
    flex-direction: column;
  }

  .intro-text {
    margin-top: 10px;
    font-size: 24px;
  }

  .section-header {
    font-size: 30px;
  }

  .section-subheader {
    font-size: 24px;
  }

  .divider {
    max-width: 600px;
  }

  .cta-button {
    width: 250px;
    font-size: 24px;
  }
}

@media (max-width: 768px) {
  .intro-text {
    font-size: 20px;
  }

  .section-header {
    font-size: 24px;
  }

  .section-subheader {
    font-size: 20px;
  }

  .divider {
    max-width: 400px;
  }

  .skills-grid {
    flex-direction: column;
    align-items: center;
  }

  .skill-item {
    padding: 10px;
    font-size: 20px;
  }

  .cta-button {
    width: 200px;
    font-size: 20px;
  }
}
</style>
