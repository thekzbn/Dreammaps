<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import LineChart from '@/Components/LineChart.vue';
import BarChart from '@/Components/BarChart.vue';

// Reactive state for counts
const getUsersCount = ref(0);
const getCategoriesCount = ref(0);
const getSkillsCount = ref(0);
const getSkillLevelsCount = ref(0);

// Fetch data from API
const fetchDashboardData = async () => {
    try {
        const usersResponse = await axios.get('/api/dashboard/users-count');
        const categoriesResponse = await axios.get('/api/dashboard/categories-count');
        const skillsResponse = await axios.get('/api/dashboard/skills-count');
        const skillLevelsResponse = await axios.get('/api/dashboard/skill-levels-count');

        getUsersCount.value = usersResponse.data.count;
        getCategoriesCount.value = categoriesResponse.data.count;
        getSkillsCount.value = skillsResponse.data.count;
        getSkillLevelsCount.value = skillLevelsResponse.data.count;
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
    }
};

// Fetch data on component mount
onMounted(() => {
    fetchDashboardData();
});

// Sample data for charts, to replace with actual data
const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
        {
            label: 'User Growth',
            backgroundColor: '#3b82f6',
            borderColor: '#1e3a8a',
            data: [10, 20, 30, 40, 50],
        },
    ],
};

const barChartData = {
    labels: ['Category A', 'Category B', 'Category C', 'Category D'],
    datasets: [
        {
            label: 'Skills Distribution',
            backgroundColor: '#10b981',
            borderColor: '#065f46',
            data: [15, 25, 35, 45],
        },
    ],
};
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-2xl text-gray-800 leading-tight">Dashboard</h2>
        </template>

        <div class="py-6 px-4">
            <div class="max-w-full mx-auto lg:px-4">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div class="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
                                <h3 class="text-lg font-semibold">Total Users</h3>
                                <p class="text-2xl font-bold mt-2">{{ getUsersCount }}</p>
                                <p class="mt-2">Total registered users in the system.</p>
                            </div>
                            <div class="bg-green-500 text-white p-4 rounded-lg shadow-lg">
                                <h3 class="text-lg font-semibold">Total Skill Levels</h3>
                                <p class="text-2xl font-bold mt-2">{{ getSkillLevelsCount }}</p>
                                <p class="mt-2">Number of skill levels available for users.</p>
                            </div>
                            <div class="bg-yellow-500 text-white p-4 rounded-lg shadow-lg">
                                <h3 class="text-lg font-semibold">Total Categories</h3>
                                <p class="text-2xl font-bold mt-2">{{ getCategoriesCount }}</p>
                                <p class="mt-2">Total number of categories available.</p>
                            </div>
                            <div class="bg-red-500 text-white p-4 rounded-lg shadow-lg">
                                <h3 class="text-lg font-semibold">Total Skills</h3>
                                <p class="text-2xl font-bold mt-2">{{ getSkillsCount }}</p>
                                <p class="mt-2">Total number of skills available for users.</p>
                            </div>
                        </div>

                        <!-- Chart Section -->
                        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="bg-white p-4 rounded-lg shadow-lg">
                                <h3 class="text-xl font-semibold mb-4">User Growth Overview</h3>
                                <div class="chart-wrapper">
                                    <LineChart :chartData="lineChartData" />
                                </div>
                            </div>

                            <div class="bg-white p-4 rounded-lg shadow-lg">
                                <h3 class="text-xl font-semibold mb-4">Skills Distribution Overview</h3>
                                <div class="chart-wrapper">
                                    <BarChart :chartData="barChartData" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
.chart-wrapper {
    max-width: 100%;
    max-height: 300px;
    margin: 0 auto;
}

.bg-blue-500 {
    background-color: #3b82f6;
}

.bg-green-500 {
    background-color: #10b981;
}

.bg-yellow-500 {
    background-color: #fbbf24;
}

.bg-red-500 {
    background-color: #ef4444;
}

.text-white {
    color: #ffffff;
}
</style>
