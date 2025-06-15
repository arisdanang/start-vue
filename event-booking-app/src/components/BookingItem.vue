<script setup>
import { computed } from 'vue'
import ButtonComponent from './ButtonComponent.vue'
import SectionCard from './SectionCard.vue'
import { Loader, Check } from 'lucide-vue-next'

const props = defineProps({
  title: String,
  status: String,
})

const pending = computed(() => props.status === 'pending')
const icon = computed(() => (pending.value ? Loader : Check))

defineEmits(['cancel-booking'])
</script>

<template>
  <SectionCard>
    <div class="flex justify-between">
      <div class="flex space-x-3">
        <div>{{ title }}</div>
        <div>
          <component :is="icon" :class="{ 'animate-spin': pending }" />
        </div>
      </div>
      <ButtonComponent variant="danger" @click="$emit('cancel-booking')"> Cancel </ButtonComponent>
    </div>
  </SectionCard>
</template>
