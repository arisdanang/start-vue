import { ref } from 'vue'

const bookings = ref([])
const isFetching = ref(false)

const fetchBookings = async () => {
  isFetching.value = true
  try {
    const response = await fetch('http://localhost:3001/bookings')
    bookings.value = await response.json()
  } finally {
    isFetching.value = false
  }
}

export default function useBookings() {
  return {
    bookings,
    isFetching,
    fetchBookings,
  }
}
