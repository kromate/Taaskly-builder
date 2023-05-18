<template>
	<main class="main-layout">
		<div class="auth-box">
			<h1 class="auth-title">
				Create an account
			</h1>
			<h1 v-if="referred" class="auth-title text-sm ">
				You have been referred by {{ referred }}
			</h1>
			<p class="text-sm text-center mb-2">
				We encourage passwordless sign up being more secure and safe
			</p>
			<form class="auth-form" @submit.prevent="send_email()">
				<div class="field">
					<label for="email">Email</label>
					<input
						id="email"
						v-model="credentienals.email.value"
						placeholder="Enter a valid Email address"
						type="email"
						class="input-field"
						required
					>
				</div>

				<button class="btn-primary w-full mt-2" :disabled="passwordlessLoginLoading || disabled" type="submit">
					<span v-if="!passwordlessLoginLoading"> 	Send link to email</span>
					<Spinner v-else />
				</button>
			</form>
			<div class="flex justify-between items-center gap-2 my-2 w-full">
				<div class="border-line border-b h-1 flex-1" />
				<span class="text-primary leading-none font-bold">OR</span>
				<div class="border-line border-b h-1 flex-1" />
			</div>
			<button class="btn-secondary w-full" :disabled="loading" @click="googleSignin()">
				<span v-if="!loading" class="flex items-center gap-3"> <icon name="google" class="w-4" /> 	Sign up with Google</span>
				<Spinner v-else />
			</button>

			<p class="text-sm mt-4 text-center">
				Already have an Account? <nuxt-link to="/auth/login" class="font-bold italic">
					Sign in
				</nuxt-link>
			</p>
		</div>
	</main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSignin, usePasswordlessSignin } from '@/composables/auth'
const { googleSignin, loading } = useSignin()

const { credentienals, loading: passwordlessLoginLoading, disabled, send_email } = usePasswordlessSignin()

const referred = ref('')
onMounted(() => {
	referred.value = useRoute().query.refer as string
	localStorage.setItem('taaskly_referral', referred.value)
})

definePageMeta({
	layout: 'auth',
	middleware: 'is-not-authenticated'
})

</script>

<style scoped></style>
