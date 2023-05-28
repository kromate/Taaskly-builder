<template>
	<Modal
		modal="$atts.modal"
		title="Create a new site"
		:is-full-height="false"
	>
		<form class="auth-form" @submit.prevent="">
				<div class="field">
					<label for="Site Name">Site Name</label>
					<input
						id="Site Name"
						placeholder="My Site"
						type="text"
						class="input-field"
						required
					>
				</div>
				<button class="btn-primary w-full mt-2" type="submit">
					<span v-if="true">Create Site</span>
					<Spinner v-else />
				</button>
			</form>
	</Modal>
</template>

<script setup lang="ts">
import { useAuthModal } from '@/composables/core/modals'
import { useSignin } from '@/composables/auth/auth'
import Modal from '@/components/core/modal/Modal.vue'

const { googleSignin, loading } = useSignin()

</script>

<style>

</style>
