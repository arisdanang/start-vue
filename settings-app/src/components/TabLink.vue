<script setup lang="ts">
import type { Tab } from '@/types'
import { computed } from 'vue'

const props = defineProps<{
  currentTab: string
  tab: Tab
}>()

const isActive = computed(() => props.currentTab === props.tab.key)

defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    @click="$emit('click')"
    :class="{
      'p-4 border-b-2': true,
      'border-transparent': !isActive,
      'border-b-blue-600 text-blue-600': isActive,
    }"
  >
    {{ tab.label }}
  </button>
</template>
