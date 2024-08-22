<template>
  <div class="skills-picked">
    <div class="navigation-wrapper">
      <Navigation />
    </div>
    <div class="group-45">
      <div class="container-1">
        <div class="celebration-1"></div>
        <div class="container">
          <span class="container-text">
            Now that I know what skills you like, I just need to know a bit more about you to create the perfect space for you <br />
          </span>
        </div>
      </div>
      <Link :href="route('onboarding.additional-details')">
      <div class="group-42">
        <span class="sure">
          Sure
        </span>
      </div>
    </Link>
    </div>
  </div>
</template>

<script setup>
  import Navigation from '@/Components/Navigation.vue';
  import { Link } from "@inertiajs/vue3";
</script>

<style scoped>
.skills-picked {
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 73.8px 701px 72px;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
}
.navigation-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
.skills-picked .group-45 {
  position: relative;
  margin: 20px 26.2px 0 27px;
  padding: 0 0 77.1px 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 1300px;
}
.skills-picked .container-1 {
  border-radius: 30px;
  background-color: #D6AD60;
  position: relative;
  display: flex;
  align-items: center;
  padding: 29.7px 36.9px 38.7px 36.9px;
  box-sizing: border-box;
  width: 100%;
}
.skills-picked .container {
  border-radius: 30px;
  background-color: #D6AD60;
  display: flex;
  padding: 116.3px 15.3px 108.2px 15.3px;
  box-sizing: border-box;
  flex: 1;
}
.skills-picked .container-text {
  word-wrap: break-word;
  font-family: 'Plus Jakarta Sans';
  font-weight: 300;
  font-size: 40px;
  color: #000000;
}
.skills-picked .celebration-1 {
  border-radius: 160.5px;
  background: url('../assets/images/celebration_1.png') center center / cover no-repeat;
  width: 307px;
  height: 289px;
  margin-right: 20px; /* Add space between image and text */
}
.skills-picked .group-42 {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: 3px solid #000000;
  background-color: #000000;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 36px 0 48px 0;
  width: 446px;
  box-sizing: border-box;
}
.skills-picked .sure {
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: 50px;
  line-height: 0.48;
  color: #D6AD60;
}
</style>
