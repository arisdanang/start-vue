import { ref } from 'vue'

const bookings = ref([])
const isFetching = ref(false)
const error = ref(null)

const fetchBookings = async () => {
  isFetching.value = true
  error.value = null
  try {
    const response = await fetch('http://localhost:3001/bookings')
    bookings.value = await response.json()
  } catch (e) {
    console.error('failed to fetch bookings', e)
    error.value = e
  } finally {
    isFetching.value = false
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

export default function useBookings() {
  return {
    bookings,
    isFetching,
    fetchBookings,
    error,
    handleCancelBooking,
    handleRegistration,
  }
}
