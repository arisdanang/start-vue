<script setup>
import ButtonComponent from './ButtonComponent.vue'
import SectionCard from './SectionCard.vue'

defineProps({
  title: String,
})
</script>

<template>
  <SectionCard>
    <div class="flex justify-between">
      <div>{{ title }}</div>
      <ButtonComponent variant="danger"> Cancel </ButtonComponent>
    </div>
  </SectionCard>
</template>
