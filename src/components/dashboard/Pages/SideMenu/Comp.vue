<template>
<section class="flex flex-col px-5 gap-3" v-if="!loading && component_list.length > 0">
            <div class="flex items-center gap-3 bg-gray-100 p-2 rounded " v-for="component in component_list" :key="component.id" @click="mountComponent(component)">
                <Avatar :name="component.name" :radius="24" :size="24" />
                <span class="font-semibold">{{ component.name }}</span>

                <div class="flex ml-auto">
                    <Icon name="righty" class="w-6 cursor-pointer" />
                </div>
            </div>
        </section>

        <section class="flex flex-col px-5 gap-3" v-else-if="loading">
            <Skeleton height="40px" radius="4px" v-for="n in 3" :key="n" />
        </section>

        <section class="flex flex-col px-5 gap-3" v-else>
            You have no components yet
        </section>
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