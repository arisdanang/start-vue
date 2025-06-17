<script setup>
import { onMounted } from 'vue'
import BookingItem from '@/components/BookingItem.vue'
import MiniLoading from '@/components/MiniLoading.vue'
import useBookings from '@/composables/useBookings'
import ErrorCard from '@/components/ErrorCard.vue'

const { bookings, fetchBookings, error, isFetching, handleCancelBooking } = useBookings()

onMounted(() => {
  fetchBookings()
})
</script>

<template>
  <template v-if="error">
    <ErrorCard :retry="fetchBookings">
      Could not load bookings at the moment. please try again.
    </ErrorCard>
  </template>
  <template v-else>
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
  </template>
</template>
