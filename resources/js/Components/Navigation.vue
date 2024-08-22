<template>
    <div class="navigation">
        <Link href="/">
            <div class="logo">
                <span class="dream-maps">DreamMaps</span>
            </div>
        </Link>
        <div class="menu-items">
            <Link :href="route('feature')"><span class="features">Features</span> </Link>
            <Link :href="route('pricing')"><span class="pricing">Pricing</span> </Link>
            <Link :href="route('aboutus')"><span class="about-us">About Us</span> </Link>
        </div>
    </div>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
</script>

<style scoped>
.navigation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    box-sizing: border-box;
    margin-bottom: 100px;
}

.logo {
    display: flex;
    box-sizing: border-box;
}

.dream-maps {
    font-family: 'Plus Jakarta Sans';
    font-weight: 800;
    font-size: 30px;
    letter-spacing: 3px;
    line-height: 1.333;
    text-transform: uppercase;
    color: var(--gray-900, #18181b);
}

.menu-items {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 327.2px;
    height: fit-content;
    box-sizing: border-box;
}

.features,
.pricing,
.about-us {
    font-family: 'Plus Jakarta Sans';
    font-weight: 500;
    font-size: 20px;
    line-height: 1.2;
    color: var(--gray-900, #18181b);
}
</style>
