<template>
  <article
    class="border border-primary rounded-md w-w-full h-[450px] shadow-xl p-4 flex flex-col justify-between relative"
  >
    <div class="h-[250px] border-2 rounded-lg mb-5" />
    <div class="flex flex-col gap-1 mb-5">
      <h3 class="font-bold text-xl md:pr-6 pr-12">
        {{ data.name }}
      </h3>
      <span>{{ data.desc }}</span>
    </div>

    <nuxt-link :to="`/sites/${site_id}/components/${data.id}`" class="modal-btn">
      View Component
    </nuxt-link>
  </article>
</template>

<script setup lang='ts'>
const site_id = useRoute().params.id as string

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
<style scoped></style>
