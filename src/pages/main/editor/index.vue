<template>
    <main>
        <div class="grid grid-cols-2 h-screen">
                <div>
                    <h3>HTML</h3>
                    <HTMLEditor @change="onChange" />
                </div>
            <div><iframe ref="iframe" class="w-full h-full" sandbox="allow-scripts allow-same-origin" /></div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HTMLEditor from '@/components/editor/HTMLEditor.vue'
definePageMeta({
    layout: 'default'
})

const iframe = ref<HTMLIFrameElement>()

const onChange = (payload) => {
    iframe.value!.srcdoc = payload.html
}
</script>
