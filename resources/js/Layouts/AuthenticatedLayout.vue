<script setup>
import { ref } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import NavLink from '@/Components/NavLink.vue';

const showingNavigationDropdown = ref(false);

const page = usePage();
const userRole = page.props.auth.user.role;

const isAdmin = ref(userRole === 'admin');
const isUser = ref(userRole === 'user');
</script>

<template>
    <div class="min-h-screen flex">
        <!-- Sidebar -->
        <aside class="w-64 bg-gray-800 text-white flex flex-col">
            <div class="p-4 flex justify-center items-center">
                <Link :href="route('dashboard')">
                    <div class="logo">
                        <span class="dream-maps">DreamMaps</span>
                    </div>
                </Link>
            </div>
            <nav class="mt-6 space-y-2">
                <NavLink :href="route('dashboard')" :active="route().current('dashboard')">
                    Dashboard
                </NavLink>
                <NavLink v-if="isAdmin" :href="route('users.index')" :active="route().current('users.index')">
                    Users
                </NavLink>
                <NavLink v-if="isAdmin" :href="route('categories.index')" :active="route().current('categories.index')">
                    Categories
                </NavLink>
                <NavLink v-if="isAdmin" :href="route('skills.index')" :active="route().current('skills.index')">
                    Skills
                </NavLink>
                <NavLink v-if="isAdmin" :href="route('skill-level.index')" :active="route().current('skill-level.index')">
                    Skill Levels
                </NavLink>
                <NavLink v-if="isUser || isAdmin" :href="route('user-skill.index')" :active="route().current('user-skill.index')">
                    Learning
                </NavLink>
            </nav>
        </aside>

        <!-- Content Area -->
        <div class="flex-1 flex flex-col">
            <!-- Top Bar -->
            <nav class="bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center">
                <!-- Left: Page Title or Logo -->
                <div>
                    <h2 class="text-xl font-semibold text-gray-800">
                        <slot name="header">Dashboard</slot>
                    </h2>
                </div>

                <!-- Right: User Dropdown -->
                <div class="relative">
                    <button
                        @click="showingNavigationDropdown = !showingNavigationDropdown"
                        class="flex items-center text-gray-800 focus:outline-none"
                    >
                        {{ $page.props.auth.user.name }}
                        <svg
                            class="ms-2 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>

                    <div
                        v-if="showingNavigationDropdown"
                        class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
                    >
                        <Link :href="route('profile.edit')" class="block px-4 py-2 text-gray-800">Profile</Link>
                        <Link :href="route('logout')" method="post" as="button" class="block px-4 py-2 text-gray-800">
                            Log Out
                        </Link>
                    </div>
                </div>
            </nav>

            <!-- Main Content -->
            <main class="flex-1 p-6 bg-gray-100">
                <slot />
            </main>
        </div>
    </div>
</template>

<style scoped>
.logo {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

.dream-maps {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 16px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #ffffff;
}

aside {
    border-right: 1px solid #e5e7eb;
}

nav a {
    display: block;
    padding: 1rem;
    text-decoration: none;
    font-size: 1.125rem;
}

nav a:hover,
nav a.active {
    background-color: #4b5563; /* Background color for hover and active states */
    color: #ffffff; /* Text color for hover and active states */
}

main {
    min-height: calc(100vh - 4rem); /* Adjust height based on header and footer */
}

.bg-gray-100 {
    background-color: #f3f4f6;
}
</style>
