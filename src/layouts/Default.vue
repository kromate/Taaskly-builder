<template>
  <div class="w-full h-full">
     <slot />
  </div>

	<ModalBase />
		<PageLoading />
		<Alert />
</template>

<script setup lang="ts">
import { useProfile } from '@/composables/auth/profile/create'

const { getProfile } = useProfile()
onMounted(() => {
  getProfile()
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
.mx {
  margin-left: min(20%, 14rem);
  @media (max-width: 1024px) {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
