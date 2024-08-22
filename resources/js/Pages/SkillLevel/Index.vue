<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, Link, router } from "@inertiajs/vue3";

defineProps({
    skillLevels: {
        type: Object,
        required: true,
    },
});

const deleteSkillLevel = (id) => {
    if (confirm("Are you sure you want to delete this skill level?")) {
        router.delete(route('skillLevels.destroy', id), {
            onSuccess: () => {
                alert("Skill level deleted successfully.");
            },
            onError: () => {
                alert("An error occurred while deleting the skill level.");
            },
        });
    }
};
</script>

<template>
    <Head title="Skill Levels" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Skill Levels</h2>
        </template>

        <div class="bg-gray-100 py-10">
            <div class="mx-auto max-w-7xl">
                <div class="px-4 sm:px-6 lg:px-8">
                    <div class="sm:flex sm:items-center sm:justify-between">
                        <div>
                            <h1 class="text-2xl font-semibold text-gray-900">Skill Levels</h1>
                            <p class="mt-2 text-sm text-gray-700">A list of all Skill Levels.</p>
                        </div>
                        <Link 
                            :href="route('skill-level.create')"
                            class="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500">
                            Add Skill Level
                        </Link>
                    </div>

                    <div class="mt-8 flex flex-col">
                        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-300">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">ID</th>
                                                <th class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Skill</th>
                                                <th class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Category</th>
                                                <th class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Video Link</th>
                                                <th class="relative py-3.5 pl-3 pr-4 sm:pr-6">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y divide-gray-200 bg-white">
                                            <tr v-for="skillLevel in skillLevels.data" :key="skillLevel.id">
                                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">{{ skillLevel.id }}</td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{{ skillLevel.skill.name }}</td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{{ skillLevel.category.name }}</td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{{ skillLevel.video_link }}</td>
                                                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <Link :href="route('skill-level.edit', skillLevel.id)"
                                                          class="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                                    <button @click="deleteSkillLevel(skillLevel.id)"
                                                            class="ml-2 text-red-600 hover:text-red-900">Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
