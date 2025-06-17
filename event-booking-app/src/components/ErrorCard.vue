<script setup>
import SectionCard from './SectionCard.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

defineProps({
  retry: {
    type: Function,
    required: false,
  },
})
</script>

<template>
  <SectionCard>
    <div class="space-y-4 flex flex-col items-center">
      <p class="text-red-500">
        <slot></slot>
      </p>
      <ButtonComponent @click="retry" v-if="retry">Retry now</ButtonComponent>
    </div>
  </SectionCard>
</template>
