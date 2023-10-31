<template>
    <aside class="flex flex-col py-4 gap-5 border shadow min-w-[250px]">
        <header class="px-4">
            <img src="/logo-text.svg" alt="logo" class="h-8">
        </header>

        <!-- <h3 class="font-bold text-gray-500  text-sm   p-1.5 pl-5 ">
            Your Components
        </h3> -->
        <div class="flex w-full justify-start px-3">
            <Tabs :selected="selected" :tabs="tabViews" @changed="updateTab($event)" />
        </div>

        <div class="mb-12">
            <keep-alive>
                <component :is="tabs[selected]" @changed="updateTab($event)" />
            </keep-alive>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { useTabs } from '@/composables/utils/tabs'
import Comp from '@/components/dashboard/Pages/SideMenu/Comp.vue'
import Board from '@/components/dashboard/Pages/SideMenu/Board.vue'

const { initTabs, selected, tabViews, updateTab, tabs, onTabMounted } = useTabs()
initTabs('Comp', ['Comp', 'Board'], markRaw({ Comp, Board }))

onMounted(() => {
    onTabMounted()
})

definePageMeta({
    layout: 'dashboard'
})
</script>

<style scoped></style>
