<script setup>
import { ref, onMounted } from 'vue'
import EventCard from '@/components/EventCard.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import useBookings from '@/composables/useBookings'
import ErrorCard from '@/components/ErrorCard.vue'

const events = ref([])
const fetching = ref(false)
const error = ref(null)

const { handleRegistration } = useBookings()

const fetchEvents = async () => {
  fetching.value = true
  error.value = null
  try {
    const response = await fetch('http://localhost:3001/events')
    events.value = await response.json()
  } catch (e) {
    error.value = e
  } finally {
    fetching.value = false
  }
}

onMounted(() => fetchEvents())
</script>

<template>
  <template v-if="error">
    <ErrorCard :retry="fetchEvents">
      Could not load events at the moment. please try again.
    </ErrorCard>
  </template>
  <template v-else>
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <template v-if="!fetching">
        <template v-if="events.length">
          <EventCard
            v-for="event in events"
            :key="event"
            :title="event.title"
            :date="event.date"
            :description="event.description"
            @register="handleRegistration(event)"
          />
        </template>
        <template v-else>
          <div class="col-span-2 text-center text-gray-400">no events yet</div>
        </template>
      </template>
      <template v-else>
        <LoadingIndicator v-for="i in 4" :key="i" />
      </template>
    </section>
  </template>
</template>
