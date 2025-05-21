<script setup>
import ButtonCompoent from './ButtonComponent.vue'
import SectionCard from './SectionCard.vue'
defineProps({
  title: String,
  date: String,
  description: String,
})

defineEmits(['register'])
</script>

<template>
  <SectionCard>
    <template #header>
      {{ title }}
    </template>
    {{ date }}
    <template #footer>
      <div class="space-y-4">
        <p>{{ description }}</p>
        <div class="flex justify-end p-4">
          <ButtonCompoent @click="$emit('register')">Register</ButtonCompoent>
        </div>
      </div>
    </template>
  </SectionCard>
</template>
