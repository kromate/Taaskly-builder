
<template>
	<div class="tab-body border border-grey_two">
		<span v-for="tab in (tabs as string[])" :key="tab" :class="['tab-item transite', tab==selected ? 'active' :''] " @click="onClick(tab)">{{ tab }}</span>
	</div>
</template>

<script setup lang="ts">

defineProps({
    tabs: {
        type: Array,
        default: () => [],
        reuired: true
    },
    selected: {
        type: String,
        default: '',
        required: false
    }
})

const emit = defineEmits(['changed'])

const onClick = (selected) => {
    emit('changed', selected)
}
</script>

<style scoped lang="scss">

</style>
