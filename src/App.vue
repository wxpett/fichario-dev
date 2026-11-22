<template>
  <div class="app-layout">
    <TheHeader />
    <main class="main-content">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
    <BreakpointBadge />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useFicharioStore } from '@/stores/fichario'
import TheHeader from '@/components/ui/TheHeader.vue'
import BreakpointBadge from '@/components/ui/BreakpointBadge.vue'

const store = useFicharioStore()

onMounted(() => {
  store.iniciarMonitor()
})

onUnmounted(() => {
  store.pararMonitor()
})
</script>
