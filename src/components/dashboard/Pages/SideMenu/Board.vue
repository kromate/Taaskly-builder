<template>
	<section v-if="mountedComponent.length > 0" class="flex flex-col px-5 gap-3">
		<VueDraggableNext class="w-full flex flex-col gap-3" :list="(mountedComponent as unknown[])" @change="reArrangeCompPosAfterDrag">
			<div v-for="component in mountedComponent" :key="component.id" class="flex items-center gap-3 bg-gray-100 p-2 rounded ">
				<Avatar :name="component.name" :radius="24" :size="24" />
				<span class="font-semibold">{{ component.name }}</span>

				<div class="flex ml-auto">
					<Icon name="trash" class="w-6 cursor-pointer" @click="unMountComponent(component.comp_pos)" />
				</div>
			</div>
		</VueDraggableNext>
	</section>

	<section v-else class="flex flex-col px-3 gap-3 text-center text-sm font-semibold">
		You have no mounted components on board
	</section>
</template>

<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
import { useMountComponent } from '@/composables/sites/pages/builder'

const { mountedComponent, unMountComponent, reArrangeCompPosAfterDrag } = useMountComponent()

const site_id = useRoute().params.id as string

</script>

<style scoped></style>
