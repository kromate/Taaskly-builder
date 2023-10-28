<template>
    <main class="p-6 border-2 w-full h-full flex flex-col">
        preview

    <DashboardPagesPreview hash="123" :html="comp.code.html" :css="comp.code.css" :js="comp.code.javascript" v-for="comp in mountedComponent" :key="comp.id" />
    </main>
</template>

<script setup lang="ts">
import { useMountComponent } from '@/composables/sites/pages/builder'

const { mountedComponent } = useMountComponent()
</script>

<style scoped></style>