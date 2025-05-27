<script setup>
import { ref, onMounted } from 'vue'
import EventCard from '@/components/EventCard.vue'
import BookingItem from '@/components/BookingItem.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import MiniLoading from '@/components/MiniLoading.vue'

const events = ref([])
const isFetchingEvents = ref(false)

const bookings = ref([])
const isFetchingBookings = ref(false)

const fetchEvents = async () => {
  isFetchingEvents.value = true
  try {
    const response = await fetch('http://localhost:3001/events')
    events.value = await response.json()
  } finally {
    isFetchingEvents.value = false
  }
}

const fetchBookings = async () => {
  isFetchingBookings.value = true
  try {
    const response = await fetch('http://localhost:3001/bookings')
    bookings.value = await response.json()
  } finally {
    isFetchingBookings.value = false
  }
}

const handleRegistration = async (event) => {
  const newBooking = {
    id: Date.now().toString(),
    userId: 1,
    eventId: event.id,
    eventTitle: event.title,
  }

  await fetch('http://localhost:3001/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...newBooking,
      status: 'confirmed',
    }),
  })
}

onMounted(() => {
  fetchEvents()
  fetchBookings()
})
</script>

<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <section class="grid grid-cols-2 gap-8">
      <template v-if="!isFetchingEvents">
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
        <LoadingIndicator v-for="i in 4" :key="i" />
      </template>
    </section>
    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <section class="grid grid-cols-1 gap-4">
      <template v-if="isFetchingBookings">
        <BookingItem v-for="booking in bookings" :key="booking" :title="booking.eventTitle" />
      </template>
      <template v-else>
        <MiniLoading />
      </template>
    </section>
  </main>
</template>
