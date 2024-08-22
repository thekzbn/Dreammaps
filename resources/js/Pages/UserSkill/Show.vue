<script setup>
import { Head } from "@inertiajs/vue3";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";

const props = defineProps({
    video: Object,
});
</script>

<template>
    <Head title="Video Details" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-2xl text-gray-800 leading-tight">Video Details</h2>
        </template>

        <div class="bg-gray-100 py-16">
            <div class="mx-auto max-w-6xl">
                <div class="bg-white shadow-xl rounded-lg overflow-hidden">
                    <!-- Video and Details -->
                    <div class="flex flex-col lg:flex-row">
                        <!-- Video Section -->
                        <div class="lg:w-3/4">
                            <div class="relative">
                                <iframe :src="`https://www.youtube.com/embed/${props.video.video_link.split('v=')[1]}`" frameborder="0" class="w-full h-[30rem] rounded-lg shadow-lg"></iframe>
                            </div>
                        </div>
                        <!-- Details Section -->
                        <div class="lg:w-1/4 lg:pl-10 p-8 lg:py-12 bg-gray-50">
                            <h3 class="text-3xl font-bold text-gray-900">{{ props.video.title }}</h3>
                            <p class="mt-6 text-xl text-gray-700">
                                <strong>Skill:</strong> {{ props.video.skill.name }}
                            </p>
                            <p class="mt-4 text-xl text-gray-700">
                                <strong>Category:</strong> {{ props.video.category.name }}
                            </p>
                            <p class="mt-6 text-gray-600">{{ props.video.description }}</p>

                            <!-- Additional Details -->
                            <div class="mt-8">
                                <h4 class="text-2xl font-semibold text-gray-800">Details</h4>
                                <ul class="mt-4 space-y-3 text-gray-600 text-lg">
                                    <li><strong>Instructor:</strong> John Doe</li>
                                    <li><strong>Duration:</strong> 15 minutes</li>
                                    <li><strong>Level:</strong> {{ props.video.category.name }}</li>
                                    <li><strong>Published:</strong> August 2024</li>
                                    <li><strong>Tags:</strong> {{ props.video.tags ? props.video.tags.join(', ') : 'N/A' }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Content Section -->
                    <div class="p-8 lg:px-12 lg:py-14 border-t border-gray-200 bg-white">
                        <h4 class="text-3xl font-semibold text-gray-800">Content Overview</h4>
                        <p class="mt-6 text-lg text-gray-700 leading-relaxed">
                            This video is designed to help you enhance your skills in {{ props.video.skill.name }}. The content is carefully curated to ensure that you gain a comprehensive understanding of the topic, including practical examples and hands-on exercises.
                        </p>
                        <p class="mt-6 text-lg text-gray-700 leading-relaxed">
                            You will learn how to effectively apply these techniques in real-world scenarios, improving your proficiency and confidence in {{ props.video.skill.name }}. The video aims to provide you with a solid foundation that you can build upon as you continue to develop your skills.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
iframe {
    border-radius: 0.75rem;
    box-shadow: 0 15px 20px rgba(0, 0, 0, 0.15);
}

h3, h4 {
    color: #1a202c;
}

p {
    color: #4a5568;
}

.bg-gray-50 {
    background-color: #f9fafb;
}

.shadow-lg {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.shadow-xl {
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
}
</style>
