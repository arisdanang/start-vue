<script setup>
import ButtonComponent from './ButtonComponent.vue'
import SectionCard from './SectionCard.vue'
</script>

<template>
  <SectionCard>
    <div class="flex justify-between">
      <div>hello world</div>
      <ButtonComponent variant="danger"> Cancel </ButtonComponent>
    </div>
  </SectionCard>
</template>
