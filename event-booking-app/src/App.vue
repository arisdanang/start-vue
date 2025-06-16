<script setup>
import { onMounted } from 'vue'
import BookingItem from '@/components/BookingItem.vue'
import MiniLoading from '@/components/MiniLoading.vue'
import EventList from '@/components/EventList.vue'
import useBookings from '@/composables/useBookings'

const { bookings, fetchBookings, isFetching } = useBookings()
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
  fetchBookings()
})
</script>

<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <EventList @register="handleRegistration($event)" />
    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <section class="grid grid-cols-1 gap-4">
      <template v-if="!isFetching">
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
