<template>
  <aside
    class="pc min-h-screen flex-col justify-between w-[20%] max-w-[14rem] bg-transparent fixed inset-y-0 z-50"
  >
    <div class="h-full relative py-4">
      <div class="w-full flex justify-start pl-6">
        <img src="/logo-site.svg" alt="logo" class="w-36">
      </div>

      <div class="relative mt-[70px]">
        <div
          v-for="n in mainRoutes"
          :key="n.name"
          class="w-full flex flex-col gap-4"
        >
          <span v-if="!n.children">
            <nuxt-link :to="n.route" class="flex items-center black use-hover">
              <component :is="n.icon" class="mr-4" />
              <p class="text-lg">
                {{ n.name }}
              </p>
            </nuxt-link>
          </span>

          <details v-else>
            <summary
              class="flex py-1.5 items-center px-6 mt-3 duration-75 black"
            >
              <component :is="n.icon" class="mr-4" />
              <p class="text-base font-medium text-gray300">
                {{ n.name }}
              </p>
              <button class="ml-auto rotate-90">
                <svg
                  class="fill-current opacity-75 w-4 h-4 -mr-1 turn"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"
                  />
                </svg>
              </button>
            </summary>

            <div class="flex flex-col">
              <nuxt-link
                v-for="child in n.children"
                :key="child.name"
                :to="child.route"
                class="flex items-center py-1.5 pl-14 mt-3 duration-75 black"
              >
                <p class="text-sm font-medium">
                  {{ child.name }}
                </p>
              </nuxt-link>
            </div>
          </details>
        </div>
      </div>

      <button class="menu-btn transite" @click="useAuthModal().openLogout()">
        <signOut class="w-6 mr-4" />
        <p class="text-base">
Logout
</p>
      </button>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { mainRoutes } from '@/composables/utils/menu'
import { useAuthModal } from '@/composables/core/modals'
import signOut from '~~/src/assets/icons/src/signOut.vue'
</script>

<style scoped lang="scss">
.bg-shadow {
  box-shadow: 0px 2px 16px rgba(31, 41, 55, 0.12);
}
a {
  @apply text-grey_two w-[190px] h-11 px-6 text-4xl duration-75 rounded-md mt-1;
  &:hover.use-hover {
    @apply border border-dark;
  }
}

.menu-btn {
  @apply flex items-center font-semibold  border-2
	  border-primary text-primary fixed bottom-4 hover:scale-105
	   duration-200 w-[190px] h-11 px-6 text-4xl rounded-md;
  &:hover {
    @apply bg-primary text-light;
  }
}
/* exact link will show the primary color for only the exact matching link */
a.router-link-exact-active.black {
  @apply text-primary font-bold;
  color: var(--primary);
  // background-color: var(--primary);
  & > svg {
    color: var(--primary);
  }
}

details {
  user-select: none;
  & summary svg.turn {
    color: var(--grey);
  }
  & summary svg {
    color: var(--grey);
  }
}
details[open] {
  & summary svg {
    color: var(--grey);
  }
  & summary svg.turn {
    transform: rotate(-180deg);
  }
}
summary {
  cursor: pointer;
}
svg {
  transition: all 0.15s;
}
summary::-webkit-details-marker {
  display: none;
}
:focus {
  outline: none;
}
</style>
