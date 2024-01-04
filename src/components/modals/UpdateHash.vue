<template>
	<Modal modal="$atts.modal" title="Update hash" :is-full-height="false" custom-width="800px">
		<form class="auth-form" @submit.prevent="updateUsedHashedHTML_CSS_JS(hashFunctionRef)">
			<div class="field">
				<label for="desc">hash function</label>
				<textarea
					id="desc"
					v-model="hashFunctionRef"
					placeholder="This is My site"
					type="text"
					rows="4"
					class="input-field h-[500px] pt-3"
				/>
			</div>

			<button class="btn-primary w-full mt-2" type="submit">
				<span>update</span>
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/core/modal/Modal.vue'
import { updateUsedHashedHTML_CSS_JS, usedHashedHTML_CSS_JS } from '@/editors/vanilla/utils/test'

const hashFunctionRef = ref()
onMounted(() => {
    hashFunctionRef.value = usedHashedHTML_CSS_JS.value
})
</script>

<style></style>
