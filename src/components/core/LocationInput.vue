<template>
	<div class="relative flex w-full">
		<input
			id="autocomplete"
			ref="autocompleteInput"
			type="text"
			:placeholder="placeholder"
			class="input-field"
			:disabled="disabled"
			required
			@keypress="loading = true"
			@keydown.backspace="loading = false"
		>
		<Spinner v-if="loading" class="!border-t-dark !border-[#0c030366] absolute right-4 top-2" />
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as geofire from 'geofire-common'
import { GeoPoint } from 'firebase/firestore'
import { loader } from '@/composables/location/map'

const props = defineProps({
  modelValue: { type: Object, default: () => {} },
	placeholder: { type: String, default: 'Enter a Location ' },
  disabled: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])
const loading = ref(false)
const options = {
     componentRestrictions: { country: ['NG'] },
    fields: ['address_components', 'geometry', 'name']

}

const autocompleteInput = ref(null)
const autocomplete = ref()

onMounted(() => {
	(document.getElementById('autocomplete')as any).value = props.modelValue.name ?? ''

	const fillInAddress = () => {
		loading.value = false
		const place = autocomplete.value.getPlace()
		const lat = place.geometry.location.lat()
		const lng = place.geometry.location.lng()

		const latlng = { lat, lng }
		const hash = geofire.geohashForLocation([lat, lng])
		const point = new GeoPoint(lat, lng)
		const emitter = {
				geohash: hash,
				geo_point: point,
				location: { name: (document?.getElementById('autocomplete')as any).value, ...latlng }
		}
		emit('update:modelValue', emitter)
	}
	loader.load().then(() => {
		autocomplete.value = new window.google.maps.places.Autocomplete(
			document.getElementById('autocomplete') as HTMLInputElement,
			options
		)
        autocomplete.value.addListener('place_changed', fillInAddress)
	})
	if (props.modelValue.geohash) {
		(document?.getElementById('autocomplete')as any).value = props.modelValue.location.name
	}
})
</script>

<style scoped></style>
