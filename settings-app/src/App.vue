<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Tab, TabKey } from './types'
import TabLink from '@/components/TabLink.vue'
import GeneralSettings from '@/components/GeneralSettings.vue'
import NotificationsSettings from '@/components/NotificationsSettings.vue'
import PrivacySettings from '@/components/PrivacySettings.vue'
import FadeTransition from '@/components/FadeTransition.vue'

const tabs: Tab[] = [
  {
    key: 'General',
    label: 'General',
    component: GeneralSettings,
  },
  {
    key: 'Notifications',
    label: 'Notifications',
    component: NotificationsSettings,
  },
  {
    key: 'Privacy',
    label: 'Privacy',
    component: PrivacySettings,
  },
]

const defaultTab = ref<TabKey>('General')
const currentComponent = computed(() => tabs.find((tab) => tab.key === defaultTab.value)?.component)
</script>

<template>
  <main class="max-w-2xl mx-auto px-4">
    <nav class="font-medium text-center text-gray-500 border-b border-gray-200 mb-4">
      <ul class="flex flex-wrap -mb-px">
        <li v-for="tab in tabs" :key="tab.key">
          <TabLink :tab="tab" :currentTab="defaultTab" @click="defaultTab = tab.key" />
        </li>
      </ul>
    </nav>
    <FadeTransition>
      <component :is="currentComponent" />
    </FadeTransition>
  </main>
</template>
