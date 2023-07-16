<template>
  <article
    class="border border-primary rounded-md w-full h-[200px] shadow-xl p-4 flex flex-col justify-between relative"
  >
    <div class="flex flex-col gap-1">
      <h3 class="font-bold text-xl md:pr-6 pr-12">
        {{ data.name }}
      </h3>
      <span>{{ data.desc }}</span>
    </div>

    <button class="modal-btn" @click="openSite(data)">
      Explore
    </button>
  </article>
</template>

<script setup lang='ts'>
  const openSite = (site) => {
    localStorage.removeItem('site')
    localStorage.setItem('site', JSON.stringify(site))
    useRouter().push(`/sites/${site.id}`)
  }
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
<style scoped></style>
