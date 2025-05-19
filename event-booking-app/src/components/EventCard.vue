<script setup>
import ButtonCompoent from './ButtonComponent.vue'
import RoundedCard from './RoundedCard.vue'
defineProps({
  title: String,
  date: String,
  description: String,
})

defineEmits(['register'])
</script>

<template>
  <RoundedCard>
    <h3 class="p-4 font-medium text-xl border-b border-gray-200">{{ title }}</h3>
    <p class="p-4 border-b border-gray-200">{{ date }}</p>
    <p class="p-4">{{ description }}</p>
    <section class="flex justify-end p-4">
      <ButtonCompoent @click="$emit('register')">Register</ButtonCompoent>
    </section>
  </RoundedCard>
</template>
