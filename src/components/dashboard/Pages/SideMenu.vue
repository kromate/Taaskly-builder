<template>
    <aside class="flex flex-col py-4 gap-5 border shadow min-w-[250px]">
        <header class="px-4">
            <img src="/logo-text.svg" alt="logo" class="h-8">
        </header>

        <h3 class="font-bold text-gray-500  text-sm   p-1.5 pl-5 ">
            Your Components
        </h3>

        <section class="flex flex-col px-5 gap-3" v-if="!loading && component_list.length > 0">
            <div class="flex items-center gap-3 bg-gray-100 p-2 rounded cursor-grab" v-for="component in component_list" :key="component.id" @click="mountComponent(component)">
                <Avatar :name="component.name" :radius="24" :size="24" />
                <span class="font-semibold">{{ component.name }}</span>
            </div>
        </section>

        <section class="flex flex-col px-5 gap-3" v-else-if="loading">
            <Skeleton height="40px" radius="4px" v-for="n in 3" :key="n" />
        </section>

        <section class="flex flex-col px-5 gap-3" v-else>
            You have no components yet
        </section>
    </aside>
</template>

<script setup lang="ts">
import { useFetchSiteComponents } from '@/composables/sites/components/fetch'
import { useMountComponent } from '@/composables/sites/pages/builder'

const { mountComponent } = useMountComponent()

const { fetch, loading, component_list } = useFetchSiteComponents()
const site_id = useRoute().params.id as string
fetch(site_id)

</script>

<style scoped></style>