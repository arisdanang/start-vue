import { ref } from 'vue'

interface IGeneralSettings {
  username: string
  email: string
  about: string
  gender: string
  country: string
}

const general = ref<IGeneralSettings>({
  username: '',
  email: '',
  about: '',
  gender: 'male',
  country: 'indonesia',
})

export function useSettings() {
  return {
    general,
  }
}
