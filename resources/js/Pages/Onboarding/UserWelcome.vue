<script setup>
import { Link } from "@inertiajs/vue3";
import Navigation from '@/Components/Navigation.vue';

const goToSelectSkills = () => {
    console.log("here we go")
    this.$router.push('onboarding/select-skills');
}
</script>
<template>
    <div class="the-home-lets-go-page">
        <div class="bg"></div>
        <div class="gold-transformed-2"></div>
        <div class="container-3">
            <Navigation />
            <div class="container">
                <div class="group-43">
                    <div class="container-1">
                        <svg
                            class="rectangle-34"
                            width="2140"
                            height="1816"
                            viewBox="0 0 2140 1816"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                            <path
                                d="M0,50C0,22.386 22.386,0 50,0L2090,0C2117.62,0 2140,22.386 2140,50L2140,908L2140,1766C2140,1793.614 2117.62,1816 2090,1816L50,1816C22.386,1816 0,1793.614 0,1766L0,50Z"
                                fill="#D6AD60"
                            />
                        </svg>
                        <Link :href="route('onboarding.select-skills')">
                            <div class="group-35">
                                <span class="lets-gooo">Let’s Gooo!</span>
                            </div>
                        </Link>
                        <div class="wave-1"></div>
                    </div>
                    <span class="hey-there-my-name-is-emeka">
                        Hey there! My name is Emeka, your AI Companion and I
                        welcome you to DreamMaps. <br />
                        You have taken a big step towards achieving your dream
                        of success.<br />
                        I'm here to guide you on an exciting journey of
                        self-discovery and growth. Together, we'll explore your
                        interests, build on your skills, and find the perfect
                        career path for you.<br />
                        Let's start unlocking your potential and mapping out
                        your future, one dream at a time.<br />
                        Ready to begin?
                    </span>
                </div>
                <div class="gold-transformed-1"></div>
            </div>
            <div class="container-2">
                <div class="gold-transformed-4"></div>
                <div class="gold-transformed-6"></div>
                <div class="gold-transformed-11"></div>
            </div>
        </div>
        <div class="gold-transformed-3"></div>
    </div>
</template>

<style src="../../../css/welcome.css"></style>
