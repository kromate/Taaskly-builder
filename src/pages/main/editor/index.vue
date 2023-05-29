<template>
    <main>
        <div class="flex h-screen">
                <div class="flex-1">
                    <h3>HTML</h3>
                    <HTMLEditor />
                </div>
            <div>display</div>
        </div>
    </main>
</template>

<script setup>
// import { ref } from 'vue'
import HTMLEditor from '@/components/editor/HTMLEditor.vue'
definePageMeta({
    layout: 'default'
})
</script>
