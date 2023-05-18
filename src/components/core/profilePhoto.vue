<template>
	<div class="flex items-center gap-5">
		<input ref="fileInput" class="hidden" type="file" accept="image/jpeg,image/png" @change="handleFileInputChange">
		<div class="rounded-lg flex items-center justify-center border overflow-hidden" :style="`width:${size}; height:${size}`">
			<img v-if="photoUrl" :src="photoUrl" class="h-full w-full object-cover" alt="">
			<img v-else src="/front-demo.svg" class="h-full w-full object-cover" alt="">
		</div>
		<button class=" font-medium btn-primary min-w-[100px]" :disabled="loading" type="button" @click="selectPhoto">
			<span v-if="!loading">{{ btnName }}</span>
			<Spinner v-else />
		</button>
	</div>
</template>

<script setup lang="ts">
import { uploadFirebasetorage } from '@/firebase/storage'

const emit = defineEmits(['update'])
const props = defineProps({
	photoUrl: {
		default: '',
		type: String,
		required: true
	},
	folderName: {
		default: '',
		type: String,
		required: true
	},
	btnName: {
		default: 'Change Photo',
		type: String,
		required: true
	},
	size: {
		default: '150px',
		type: String,
		required: false
	}
})
const file = ref() as Ref<File>
const fileInput = ref() as Ref<HTMLInputElement>
const { percentage, downloadURL, upload, loading } = uploadFirebasetorage()
const handleFileInputChange = () => {
	if (fileInput.value.files?.[0]) {
	file.value = fileInput.value.files?.[0] as File
	upload(props.folderName, file)
	}
}

const selectPhoto = () => {
	fileInput.value.click()
}

watch(downloadURL, () => {
	emit('update', downloadURL.value)
})
</script>
