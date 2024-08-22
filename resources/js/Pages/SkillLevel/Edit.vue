<script setup>
import { Head, Link, useForm, usePage } from "@inertiajs/vue3";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";

const { skillLevel, skills, categories } = usePage().props;

const form = useForm({
    skill_id: skillLevel.data.skill_id || "",
    category_id: skillLevel.data.category_id || "",
    video_link: skillLevel.data.video_link || "",
});

const submit = () => {
    form.put(route('skill-level.update', skillLevel.data.id));
};
</script>

<template>
    <Head title="Edit Skill Level" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Edit Skill Level</h2>
        </template>

        <div class="bg-gray-100 py-10">
            <div class="mx-auto max-w-7xl">
                <div class="px-4 sm:px-6 lg:px-8">
                    <div class="sm:flex sm:items-center sm:justify-between">
                        <div>
                            <h1 class="text-2xl font-semibold text-gray-900">Edit Skill Level</h1>
                            <p class="mt-2 text-sm text-gray-700">Update the details of the Skill Level.</p>
                        </div>
                        <Link 
                            :href="route('skill-level.index')"
                            class="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500">
                            Back to List
                        </Link>
                    </div>

                    <form @submit.prevent="submit" class="mt-8 space-y-6">
                        <div class="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label for="skill_id" class="block text-sm font-medium text-gray-700">Skill</label>
                                <select v-model="form.skill_id" id="skill_id" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                    <option v-for="skill in skills.data" :key="skill.id" :value="skill.id">{{ skill.name }}</option>
                                </select>
                            </div>
                            <div>
                                <label for="category_id" class="block text-sm font-medium text-gray-700">Category</label>
                                <select v-model="form.category_id" id="category_id" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                    <option v-for="category in categories.data" :key="category.id" :value="category.id">{{ category.name }}</option>
                                </select>
                            </div>
                            <div>
                                <label for="video_link" class="block text-sm font-medium text-gray-700">Video Link</label>
                                <input v-model="form.video_link" id="video_link" type="url" class="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
                            </div>
                        </div>

                        <div class="flex items-center justify-end mt-4">
                            <button 
                                type="submit" 
                                class="ml-3 inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 active:bg-indigo-600 disabled:opacity-25 transition"
                            >
                                Update Skill Level
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
