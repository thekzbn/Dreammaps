<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";

defineProps({
    skills: {
        type: Object,
        required: true,
    },
    categories: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    skill_id: '',
    category_id: '',
    video_link: '',
});

const submit = () => {
    form.post(route('skill-level.store'), {
        onSuccess: () => {
            alert('Skill level created successfully.');
        },
        onError: () => {
            alert('An error occurred while creating the skill level.');
        },
    });
};
</script>

<template>
    <Head title="Create Skill Level" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Create Skill Level</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200">
                        <form @submit.prevent="submit">
                            <div>
                                <label for="skill_id" class="block text-sm font-medium text-gray-700">Skill</label>
                                <select id="skill_id" v-model="form.skill_id" class="mt-1 block w-full">
                                    <option value="">Select a skill</option>
                                    <option v-for="skill in skills.data" :key="skill.id" :value="skill.id">{{ skill.name }}</option>
                                </select>
                            </div>

                            <div class="mt-4">
                                <label for="category_id" class="block text-sm font-medium text-gray-700">Category</label>
                                <select id="category_id" v-model="form.category_id" class="mt-1 block w-full">
                                    <option value="">Select a category</option>
                                    <option v-for="category in categories.data" :key="category.id" :value="category.id">{{ category.name }}</option>
                                </select>
                            </div>

                            <div class="mt-4">
                                <label for="video_link" class="block text-sm font-medium text-gray-700">Video Link</label>
                                <input id="video_link" type="text" v-model="form.video_link" class="mt-1 block w-full" />
                            </div>

                            <div class="mt-6">
                                <button type="submit" class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500">
                                    Create Skill Level
                                </button>
                                <Link 
                                    :href="route('skill-level.index')" 
                                    class="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
