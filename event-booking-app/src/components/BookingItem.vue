<script setup>
import ButtonComponent from './ButtonComponent.vue'
import SectionCard from './SectionCard.vue'

defineProps({
  title: String,
  status: String,
})

defineEmits(['cancel-booking'])
</script>

<template>
  <SectionCard>
    <div class="flex justify-between">
      <div class="flex space-x-3">
        <div>{{ title }}</div>
        <div>{{ status }}</div>
      </div>
      <ButtonComponent variant="danger" @click="$emit('cancel-booking')"> Cancel </ButtonComponent>
    </div>
  </SectionCard>
</template>
