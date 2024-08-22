<script setup>
import { Head, Link, useForm, usePage } from "@inertiajs/vue3";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";


const category = usePage().props.category;

const form = useForm({
    name: category.data.name || '',
});


const submit = () => {
    form.put(route('categories.update', category.data.id), {
        preserveScroll: true,
    });
};

</script>

<template>
     <Head title="Edit Category" />
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Edit Category</h2>
        </template>

        <div class="py-6 bg-gray-100">
            <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div class="bg-white shadow-sm rounded-md p-6">
                    <h3 class="text-lg font-semibold mb-4">Edit Category</h3>
                    <form @submit.prevent="submit">
                        <div class="mb-4">
                            <label for="name" class="block text-sm font-medium text-gray-700">Category Name</label>
                            <input
                                id="name"
                                v-model="form.name"
                                type="text"
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                required
                            />
                        </div>
                        <div class="flex space-x-4">
                            <button
                                type="submit"
                                class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500"
                            >
                                Update
                            </button>
                            <Link
                                :href="route('categories.index')"
                                class="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
