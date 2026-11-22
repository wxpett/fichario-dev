<template>
  <div class="sheet-nav-footer">
    <router-link v-if="anterior" :to="anterior.path" class="btn btn-outline nav-btn">
      ← {{ anterior.meta.title }}
    </router-link>
    <div v-else />
    <div class="read-toggle">
      <button
        class="btn"
        :class="jaLida ? 'btn-green' : 'btn-primary'"
        @click="toggleLida"
      >
        {{ jaLida ? '✓ Lida!' : 'Marcar como lida' }}
      </button>
    </div>
    <router-link v-if="proxima" :to="proxima.path" class="btn btn-blue nav-btn">
      {{ proxima.meta.title }} →
    </router-link>
    <div v-else />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFicharioStore } from '@/stores/fichario'

const route = useRoute()
const router = useRouter()
const store = useFicharioStore()

const todasRotas = computed(() =>
  router.getRoutes()
    .filter(r => r.meta && r.meta.folha)
    .sort((a, b) => a.meta.folha - b.meta.folha)
)

const indiceAtual = computed(() =>
  todasRotas.value.findIndex(r => r.name === route.name)
)

const anterior = computed(() =>
  indiceAtual.value > 0 ? todasRotas.value[indiceAtual.value - 1] : null
)

const proxima = computed(() =>
  indiceAtual.value < todasRotas.value.length - 1
    ? todasRotas.value[indiceAtual.value + 1]
    : null
)

const jaLida = computed(() => store.estaLida(route.name))

function toggleLida() {
  if (jaLida.value) {
    store.desmarcarLida(route.name)
  } else {
    store.marcarLida(route.name)
  }
}
</script>

<style scoped>
.sheet-nav-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 2px solid var(--border-subtle);
  flex-wrap: wrap;
}

.nav-btn { white-space: nowrap; }

.btn-green {
  background: #15803D;
  color: white;
  border-color: #15803D;
}

.btn-green:hover {
  background: #166534;
  color: white;
}

.read-toggle {
  display: flex;
  justify-content: center;
}
</style>
