<template>
	<Modal modal="$atts.modal" title="Create a new Component" :is-full-height="false">
		<form class="auth-form" @submit.prevent="create(id)">
			<div class="field">
				<label for="name">Component Name</label>
				<input id="name" v-model="createComponentForm.name.value" placeholder="My Component" type="text" class="input-field" required minlength="3">
			</div>
			<div class="field">
				<label for="desc">Component Description</label>
				<textarea id="desc" v-model="createComponentForm.desc.value" placeholder="This is My Component" type="text" rows="4" class="input-field h-24 pt-3" required minlength="3" />
			</div>
			<button class="btn-primary w-full mt-2" type="submit">
				<span v-if="!loading">Create Component</span>
				<Spinner v-else />
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/core/modal/Modal.vue'
import { useCreateComponent } from '@/composables/sites/components/create'

const id = useRoute().params.id as string

const { create, createComponentForm, loading } = useCreateComponent()

</script>

<style></style>
