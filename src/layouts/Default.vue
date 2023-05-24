<template>
  <div
    class="flex w-full h-screen bg-light relative md:py-0 lg:pl-4 px-0 overflow-y-hidden"
  >
    <SidebarsLeftSidebar />

    <div
      class="relative bg-light page w-full border-l  border-dark mx h-screen sm:h-auto mt overflow-hidden"
    >
      <TopbarMainDefaultTopbar />
      <Alert />
      <div
        class="w-full h-full relative overflow-x-hidden bg-light mt-[98px] pb-40"
      >
        <section class="flex-col flex items-stretch">
          <slot />
        </section>
      </div>
      <LazyModalBase />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProfile } from '@/composables/auth/profile'

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
.mx {
  margin-left: min(20%, 14rem);
  @media (max-width: 1024px) {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
