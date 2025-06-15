<script setup>
import { ref, onMounted } from 'vue'
import EventCard from '@/components/EventCard.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'

defineEmits(['register'])
const events = ref([])
const fetching = ref(false)

const fetchEvents = async () => {
  fetching.value = true
  try {
    const response = await fetch('http://localhost:3001/events')
    events.value = await response.json()
  } finally {
    fetching.value = false
  }
}

onMounted(() => fetchEvents())
</script>

<template>
  <section class="grid grid-cols-2 gap-8">
    <template v-if="!fetching">
      <EventCard
        v-for="event in events"
        :key="event"
        :title="event.title"
        :date="event.date"
        :description="event.description"
        @register="$emit('register', event)"
      />
    </template>
    <template v-else>
      <LoadingIndicator v-for="i in 4" :key="i" />
    </template>
  </section>
</template>
