<template>
  <div class="bp-badge" :style="{ '--bp-cor': store.breakpointInfo.cor }">
    <span class="bp-label">{{ store.breakpointInfo.label }}</span>
    <span class="bp-width">{{ store.larguraJanela }}px</span>
    <span class="bp-rem">{{ store.breakpointInfo.rem }}</span>
  </div>
</template>

<script setup>
import { useFicharioStore } from '@/stores/fichario'
const store = useFicharioStore()
</script>

<style scoped>
.bp-badge {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background: white;
  border: 2px solid var(--bp-cor, #1D4ED8);
  border-radius: var(--radius-md);
  padding: 0.4rem 0.75rem;
  box-shadow: var(--shadow-dry);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.1rem;
  z-index: 200;
  font-size: 0.7rem;
  line-height: 1.2;
  opacity: 0.9;
  transition: border-color 0.3s ease;
  pointer-events: none;
}

.bp-label {
  font-weight: 700;
  font-size: 0.75rem;
  color: var(--bp-cor, #1D4ED8);
  font-family: var(--font-mono);
}

.bp-width {
  font-family: var(--font-mono);
  color: var(--ink-primary);
  font-weight: 500;
}

.bp-rem {
  color: rgba(0,0,0,0.4);
  font-family: var(--font-mono);
  font-size: 0.65rem;
}
</style>
