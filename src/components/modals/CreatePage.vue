<template>
	<Modal modal="$atts.modal" title="Create a new Page" :is-full-height="false">
		<form class="auth-form" @submit.prevent="create(id)">
			<div class="field relative">
				<label for="name">Page Name</label>
				<input id="name" v-model="createPageForm.name.value" @input="createPageForm.name.value = createPageForm.name.value.trim()" placeholder="My Page" type="text" class="input-field" required minlength="3">
			</div>
			<div class="field">
				<label for="desc">Page Description</label>
				<textarea id="desc" v-model="createPageForm.desc.value" placeholder="This is My Page" type="text" rows="4" class="input-field h-24 pt-3" required minlength="3" />
			</div>
			<button class="btn-primary w-full mt-2" type="submit">
				<span v-if="!loading">Create Page</span>
				<Spinner v-else />
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/core/modal/Modal.vue'
import { useCreatePage } from '@/composables/sites/pages/create'

const id = useRoute().params.id as string

const { create, createPageForm, loading } = useCreatePage()

</script>

<style></style>
