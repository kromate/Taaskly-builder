<template>
	<div class="w-full h-4/5">
		<Bar :data="chartData" :options="options" />
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps({
	chartData: {
		type: Object as PropType<{
			labels: string[];
			datasets: {
				data: number[]
			}[]
		}>,
		required: true
	},
	options: {
		type: Object as PropType<{responsive: boolean}>,
		required: true
	}
})
</script>
