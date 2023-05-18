<template>
  <Modal
    modal="$atts.modal"
    title="Verification"
    :auto-close="false"
    :no-close="true"
  >
    <p class="text-primary text-lg tracking-[0.1rem] text-center">
      Confirming Payment...
    </p>

    <div class="flex items-center gap-10 w-full">
      <button class="modal-btn hover:bg-transparent" :disabled="loading">
        <Spinner class="!border-t-dark !border-[#0c030366]" />
      </button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { useAuthModal } from '@/composables/core/modals'
import { useSignin } from '@/composables/auth/auth'
import Modal from '@/components/core/modal/Modal.vue'

const { signOut, loading } = useSignin()
</script>

<style>
</style>
