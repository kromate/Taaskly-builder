<template>
	<div class="flex w-full h-screen bg-light relative  px-0 overflow-y-hidden">
		<div class="relative bg-light page w-full border-l  border-dark mx h-screen sm:h-auto mt overflow-hidden">
			<div class="w-full h-full relative overflow-x-hidden bg-light pb-40">
				<section class="flex-col flex items-stretch p-5">
					<slot />
				</section>
			</div>
		</div>
	</div>
	<ModalBase />
	<Alert />
</template>

<script setup lang="ts">
import { useProfile } from '@/composables/auth/profile/create'

const { getProfile } = useProfile()
onMounted(() => {
  getProfile()
  if (document.getElementById('tidio-chat'))
    document.getElementById('tidio-chat')!.style.display = 'none'
})
</script>

<style scoped lang="scss">
.page {
  background-color: #fff;
  box-shadow: -3px 3px 12px rgb(10 46 101 / 3%);

  @media (max-width: 680px) {
    border-radius: 0;
    width: 100%;
    padding: 0px;
    box-shadow: none;
  }
}

</style>
