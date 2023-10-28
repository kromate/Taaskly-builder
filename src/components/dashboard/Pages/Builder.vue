<template>
    <button class="btn-primary" @click="preview">
Preview
</button>
    <main class="p-6 border-2 w-full h-full flex flex-col">
<!-- <DashboardPagesPreview :html="comp.hashed_code.html" :css="comp.hashed_code.css" :js="comp.hashed_code.javascript" v-for="comp in mountedComponent" :key="comp.id" /> -->
        <iframe :srcdoc="iframe_srcdoc" />
</main>
</template>

<script setup lang="ts">
import { useMountComponent, iframe_content } from '@/composables/sites/pages/builder'

const { mountedComponent, iframe_srcdoc } = useMountComponent()

const preview = () => {
    const iframe = document.querySelector('iframe')
    const iframeDocument = iframe?.contentDocument || iframe?.contentWindow?.document

    if (!iframeDocument || !iframeDocument.documentElement) {
        console.error('Could not access iframe content')
        return
    }

    const iframeHTML = iframeDocument.documentElement.outerHTML

    iframe_content.value = iframeHTML
    const fullPath = useRoute().fullPath

     window.open(`${fullPath}/preview`, '_blank')
}

</script>

<style>
iframe{
width: 100%;
  height: 100%;
  border: none;
  background-color: #fff;
}
</style>