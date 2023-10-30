<template>
	<main class="main-layout">
		<div class="auth-box">
			<h1 class="auth-title">
				<icon class="w-7 cursor-pointer absolute left-0" name="back" @click="formStep == 1 ? useAuthModal().openLogout() : formStep--" />
				{{ formStep == 1 ? 'Create a profile ' : 'Almost done' }}
			</h1>
			<p v-if="profileFormState.referrer.value" class="text-sm text-center mb-2 max-w-xs text-dark"
				v-html="formStep == 1 ? `Basic details to get you started on your Journey with <b class='text-lg '> ${profileFormState.referrer.value}</b>  on Taaskly` : 'What is your main reason for using Taaskly? (You can select multiple options)'" />
			<p v-else class="text-sm text-center  mb-2 max-w-xs text-dark">
				{{ formStep == 1 ? 'Basic details to get you started on your Journey with taaskly' : 'What is your main reason for using Taaskly? (You can select multiple options)' }}
			</p>
			<form class="auth-form " @submit.prevent="createProfile">
				<div v-if="formStep == 1" id="step 1" class="auth-form">
					<div class="field relative">
						<label for="username">Username
							<icon v-tooltip="{ text: 'You can only set this once' }" name="info" class="w-4 text-dark cursor-pointer" />
						</label>
						<input id="username" v-model="profileFormState.username.value" type="text" class="input-field" :class="[isUsernameAvailable ? '' : '!border-rose-500']" required>
						<Spinner v-if="usernameLoading" class="!border-t-dark !border-[#0c030366] absolute right-4 top-9" />
						<span v-if="!isUsernameAvailable" class="text-rose-500 font-bold">This username is taken</span>
					</div>
					<div class="grid grid-cols-2 gap-4">
						<div class="field">
							<label for="first_name">First Name</label>
							<input id="first_name" v-model="profileFormState.first_name.value" type="text" class="input-field" required>
						</div>
						<div class="field">
							<label for="last_name">Last Name</label>
							<input id="last_name" v-model="profileFormState.last_name.value" type="text" class="input-field" required>
						</div>
					</div>

					<div class="field">
						<label for="email">Email</label>
						<input id="email" v-model="profileFormState.email.value" type="text" class="input-field" disabled required>
					</div>

					<div class="field">
						<label for="phone">Phone No (whatsapp preferred)</label>
						<input id="phone" v-model="profileFormState.phone.value" type="number" class="input-field" :class="[phoneNumError ? '!border-rose-500' : '']" required>

						<span v-if="phoneNumError" class="text-rose-500 font-bold">{{ phoneNumError }}</span>
					</div>
					<div class="field">
						<label for="phone">Referral Code (Optional)</label>
						<input id="referrer" v-model="profileFormState.referrer.value" type="text" class="input-field">
					</div>
				</div>

				<div v-else id="step 2" class="auth-form pt-5">
					<label v-for="item in [
						{ text: 'To Find Products and Services', id: 1 },
						{ text: 'To Create a Shop or Service', id: 1 },
						{ text: 'To Post and Accept Task', id: 3 }]" :key="item.id" class="border border-dark p-2 py-3 w-full rounded cursor-pointer pl-4">
						<input v-model="profileFormState.reason.value" type="checkbox" :value="item" class="">
						<span>{{ item.text }}</span>
					</label>
				</div>

				<button class="btn-primary w-full mt-4" :disabled="loading || !isUsernameAvailable || usernameLoading || phoneNumError">
					<span v-if="!loading"> {{ formStep == 1 ? 'Next' : 'Create' }}</span>
					<Spinner v-else />
				</button>
			</form>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useCreateProfile, useUsername } from '@/composables/auth/profile/create'
import { useAuthModal } from '@/composables/core/modals'
const { loading, profileFormState, formStep, createProfile, initForm, phoneNumError } = useCreateProfile()
const { isUsernameAvailable, loading: usernameLoading } = useUsername()

initForm()

definePageMeta({
	layout: 'auth',
	middleware: ['is-authenticated', 'has-profile']
})

</script>

<style scoped lang='scss'>
input:checked {
	@apply hidden
}

label:has(input:checked) {
	@apply bg-grey_two text-light rounded-md relative;

	&::after {
		@apply absolute top-0 right-0 bottom-0 left-0 rounded-md;
		content: '';
		background: url('@/assets/icons/source/check.svg') transparent no-repeat 90% center;
	}
}
</style>
