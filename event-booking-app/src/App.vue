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
  if (bookings.value.some((booking) => booking.eventId === event.id && booking.userId === 1)) {
    alert('you are already registered for this event')
    return
  }

  const newBooking = {
    id: Date.now().toString(),
    userId: 1,
    eventId: event.id,
    eventTitle: event.title,
    status: 'pending',
  }
  bookings.value.push(newBooking)

  try {
    const response = await fetch('http://localhost:3001/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newBooking,
        status: 'confirmed',
      }),
    })

    if (response.ok) {
      const index = bookings.value.findIndex((booking) => booking.id === newBooking.id)

      bookings.value[index] = await response.json()
    } else {
      throw new Error('failed to confirm the booking')
    }
  } catch (error) {
    console.error('failed to register for event', error)
    bookings.value = bookings.value.filter((booking) => booking.id !== newBooking.id)
  }
}

const handleCancelBooking = async (bookingId) => {
  const index = bookings.value.findIndex((booking) => booking.id === bookingId)
  const originalBooking = bookings.value[index]
  bookings.value.splice(index, 1)

  try {
    const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error("booking can't be cancelled")
    }
  } catch (error) {
    console.error('failed to cancel the booking', error)

    // bring back the original booking if fail to delete
    bookings.value.splice(index, 0, originalBooking)
  }
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
      <template v-if="!isFetchingBookings">
        <BookingItem
          v-for="booking in bookings"
          :key="booking"
          :title="booking.eventTitle"
          :status="booking.status"
          @cancel-booking="handleCancelBooking(booking.id)"
        />
      </template>
      <template v-else>
        <MiniLoading />
      </template>
    </section>
  </main>
</template>
