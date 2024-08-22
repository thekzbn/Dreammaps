<script setup>
import { defineComponent, ref } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps({
    chartData: Object,
    chartOptions: Object
});
</script>

<template>
    <Pie :data="props.chartData" :options="props.chartOptions" />
</template>
