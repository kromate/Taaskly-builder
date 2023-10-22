<template>
	<Modal modal="$atts.modal" title="Create a new site" :is-full-height="false">
		<form class="auth-form" @submit.prevent="create">
			<div class="field">
				<label for="name">Site Name</label>
				<input id="name" v-model="createSiteForm.name.value" placeholder="My Site" type="text" class="input-field" required minlength="3">
			</div>
			<div class="field">
				<label for="desc">Site Description</label>
				<textarea id="desc" v-model="createSiteForm.desc.value" placeholder="This is My site" type="text" rows="4" class="input-field h-24 pt-3" required minlength="3" />
			</div>
			<div class="field">
				<label for="type">Site Framework</label>
				<select id="type" name="type" class="input-field" v-model="createSiteForm.framework.value">
					<option value="vanilla">
						Vanilla
					</option>
				</select>
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
