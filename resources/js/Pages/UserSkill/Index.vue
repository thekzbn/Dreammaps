<script setup>
import { ref, computed } from "vue";
import { Head, Link } from "@inertiajs/vue3";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import YoutubeLogo from "@/Components/YoutubeLogo.vue";
import CustomModal from "@/Components/CustomModal.vue";

const props = defineProps({
    videos: Array,
    userSkills: Array,
});

const selectedSkill = ref(null);
const showModal = ref(false);
const modalVideoLink = ref('');

// Filter videos based on selected skill
const filteredVideos = computed(() => {
    if (selectedSkill.value === null) {
        return props.videos; // Show all videos if no skill is selected
    }

    return props.videos.filter(video => video.skill.id === selectedSkill.value);
});

// Play video function
function playVideo(videoLink) {
    if (videoLink) {
        const videoId = extractVideoId(videoLink);
        if (videoId) {
            modalVideoLink.value = videoId;
            showModal.value = true;
        }
    }
}

// Extract video ID from YouTube link
function extractVideoId(url) {
    const match = url.match(/v=([^&]+)/);
    return match ? match[1] : null;
}

// Close modal function
function closeModal() {
    showModal.value = false;
    modalVideoLink.value = '';
}
</script>

<template>
    <Head title="User Skills" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Your Skill Videos</h2>
        </template>

        <!-- Tabs for filtering -->
        <div class="bg-white shadow sm:rounded-lg mb-6">
            <div class="px-4 py-5 sm:px-6">
                <div class="flex items-center">
                    <button @click="selectedSkill = null" :class="{'text-indigo-600': selectedSkill === null}" class="mr-4 text-gray-600 hover:text-indigo-600">
                        All Skills
                    </button>
                    <button v-for="skill in props.userSkills" :key="skill.id" @click="selectedSkill = skill.skill.id" :class="{'text-indigo-600': selectedSkill === skill.id}" class="mr-4 text-gray-600 hover:text-indigo-600">
                        {{ skill.skill.name }}
                    </button>
                </div>
            </div>
        </div>

        <div class="bg-gray-100 py-10">
            <div class="mx-auto max-w-7xl">
                <div class="px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="video in filteredVideos" :key="video.id" class="bg-white rounded-lg shadow-lg relative group overflow-hidden">
                            <div class="relative">
                                <img v-if="video.video_link" :src="`https://img.youtube.com/vi/${extractVideoId(video.video_link)}/hqdefault.jpg`" alt="Thumbnail" class="w-full h-40 object-cover rounded-lg cursor-pointer" @click="playVideo(video.video_link)" />
                                <YoutubeLogo class="absolute inset-0 m-auto cursor-pointer" />
                                <div class="p-4">
                                    <h3 class="text-lg font-semibold mb-2">{{ video.skill.name }} - {{ video.category.name }}</h3>
                                    <Link :href="route('user-skill.show', video.id)" class="text-indigo-600 hover:text-indigo-900 block">
                                        View More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Custom Modal Component to play video -->
        <CustomModal v-if="showModal" @close="closeModal" :show="showModal">
            <template #video>
                <iframe v-if="modalVideoLink" :src="`https://www.youtube.com/embed/${modalVideoLink}`" frameborder="0" class="w-full h-96" allowfullscreen></iframe>
            </template>
            <template #content>
                <div class="mt-4">
                    <h3 class="text-lg font-semibold">Video Details</h3>
                    <p class="mt-2">Additional details about the video can be displayed here, including the skill and category associated with the video.</p>
                </div>
            </template>
        </CustomModal>
    </AuthenticatedLayout>
</template>

<style scoped>
.group {
    position: relative;
}

.relative img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.relative .absolute {
    width: 24px;
    height: 24px;
    pointer-events: none;
}

.relative:hover .absolute {
    cursor: pointer;
}

.grid div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
