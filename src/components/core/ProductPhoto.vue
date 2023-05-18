<template>
	<div class="border border-primary rounded-md px-4 py-8 flex  gap-4 items-center">
		<div v-if="photo_url_array.length !== 0" class="flex flex-wrap justify-center gap-4">
			<div v-for="(photo, index) in (photoUrlArray as string[])" :key="photo" class=" img-container  rounded-lg flex items-center justify-center border overflow-hidden relative" :class="smallBox ? 'w-[60px] h-[60px]' : 'w-[120px] h-[120px]'">
				<icon
					name="close"
					class="icon transite z-30"
					@click="deleteFileFromArray(photo, index)"
				/>
				<div v-if="del_loading" class="h-full w-full center absolute">
					<Spinner />
				</div>

				<div class="w-full h-full bg-[#41376054]  absolute bg hidden transite" />
				<img :src="photo" class="h-full w-full object-cover" alt="">
			</div>
		</div>

		<div v-if="photo_url_array.length < 3" class="field relative ml-4" :class="smallBox ? 'w-[60px] h-[60px]' : 'w-[120px] h-[120px]'">
			<input id="product-images" class="hidden" type="file" accept="image/jpeg,image/png" @change="handleFileInputChange">
			<label v-if="!loading && !del_loading" for="product-images" :class="smallBox ? 'py-3' : 'py-6'" class="h-full w-full flex flex-col center border border-primary border-dashed rounded-md cursor-pointer">
				<Add class="w-6 h-6 mx-auto" />
				<span v-if="!smallBox" class="text-xs">Upload Images</span>
			</label>
			<div v-else class="w-full h-full center border border-primary border-dashed rounded-md ">
				<Spinner class="text-primary !border-t-primary" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { useAlert } from '../../composables/core/useNotification'
import Add from '@/assets/icons/src/add.vue'
import { uploadFirebasetorage, deleteStorageFileByURL } from '@/firebase/storage'

const file = ref() as Ref<File>
const fileName = ref('')
const photo_url_array = ref([] as string[])
const photo_count = ref(0)

const emit = defineEmits(['update'])
const props = defineProps({
    photoUrlArray: {
        default: () => [],
        type: Array,
        required: true
    },
    basePathUrl: {
        default: 'default',
        type: String,
        required: true
    },
	smallBox: {
		default: false,
		type: Boolean,
		required: false
	}
})

onMounted(() => {
	photo_url_array.value = props.photoUrlArray as string[]
})

const { percentage, downloadURL, upload, loading } = uploadFirebasetorage()
const { deleteFile, loading: del_loading } = deleteStorageFileByURL()

const deleteFileFromArray = async (data, index) => {
	try {
		await deleteFile(data)
		photo_url_array.value.splice(index, 1)
		emit('update', photo_url_array.value)
	} catch {
		useAlert().openAlert({ msg: 'Image delete failed', type: 'ERROR' })
	}
}
const handleFileInputChange = (e) => {
	file.value = e.target.files[0] as File
	fileName.value = e.target.files[0].name
	upload(`${props.basePathUrl}/${uuidv4()}`, file)
}

watch(downloadURL, () => {
	photo_url_array.value.push(downloadURL.value)
	emit('update', photo_url_array.value)
})

</script>

<style scoped lang='scss'>
.icon { @apply hidden text-light w-5 top-2 right-2 cursor-pointer  border-[1.5px] border-dark rounded-full bg-dark absolute}
.img-container:hover{
	.icon, .bg{
		@apply block
	}
}
</style>
