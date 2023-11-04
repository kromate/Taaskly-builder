<template>
	<Modal
		modal="$atts.modal"
		title="Referral"
	>
		<section class="flex flex-col gap-4 w-full justify-center items-start">
			<p>Your referral ID is <b>{{ username }}</b> </p>

			<button class="btn w-full h-11 border-2 border-dark rounded-md hover:bg-dark hover:text-light" @click="copyUrl">
				copy referral link
			</button>
		</section>
	</Modal>
</template>

<script setup lang="ts">
import { useCoreModal } from '@/composables/core/modals'
import { useCopyToClipboard } from '@/composables/utils/share'
import Modal from '@/components/core/modal/Modal.vue'
import { useUser } from '@/composables/auth/user'

const { username } = useUser()
const { copyData } = useCopyToClipboard()

const copyUrl = () => {
	copyData({ info: `${location.host}/auth/register/?refer=${username.value}`, msg: 'referral link copied to clipboard' })
	useCoreModal().closeReferral()
}

</script>
