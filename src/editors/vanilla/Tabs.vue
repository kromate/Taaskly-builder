<script setup lang="ts">
interface Item {
  text: string
  value: string
}

const props = defineProps<{
  modelValue: string
  items: Item[]
}>()
const emit = defineEmits<(e: 'update:modelValue', tab: string) => void>()
</script>

<template>
  <div
    class="bg-dark"
  >
    <a
      v-for="item in items"
      :key="item.value"
      :class="props.modelValue === item.value ? 'code_tab-item-active' : 'code_tab-item'"
      href="#"
      @click.prevent="emit('update:modelValue', item.value)"
    >
      {{ item.text }}
    </a>
  </div>
</template>

<style>
.code_tab-item {
  @apply inline-block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 text-sm;
}

.code_tab-item-active {
  @apply inline-block px-4 py-2 border-b-2 border-indigo-500 text-indigo-500 font-semibold text-sm;
}
</style>
