<template>
	<Modal modal="$atts.modal" title="Create a new site" :is-full-height="false">
		<form class="auth-form" @submit.prevent="create">
			<div class="field">
				<label for="Site Name">Site Name</label>
				<input id="Site Name" v-model="createSiteForm.name.value" placeholder="My Site" type="text" class="input-field" required minlength="3">
			</div>
			<button class="btn-primary w-full mt-2" type="submit">
				<span v-if="!loading">Create Site</span>
				<Spinner v-else />
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/core/modal/Modal.vue'
import { useCreateSite } from '@/composables/sites/create'

const { create, createSiteForm, loading } = useCreateSite()

</script>

<style></style>
