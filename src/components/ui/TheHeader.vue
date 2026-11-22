<template>
  <header class="header">
    <div class="header-inner">
      <!-- Logo / Título -->
      <div class="header-brand">
        <span class="brand-icon">📓</span>
        <div class="brand-text">
          <span class="brand-title">Fichário Dev</span>
          <span class="brand-subtitle">Responsividade na prática</span>
        </div>
      </div>

      <!-- Botão menu mobile -->
      <button
        class="menu-toggle"
        :aria-expanded="store.menuAberto"
        aria-label="Abrir menu do fichário"
        @click="store.toggleMenu()"
      >
        <span class="menu-toggle-icon">{{ store.menuAberto ? '✕' : '☰' }}</span>
        <span class="menu-toggle-label">{{ store.menuAberto ? 'Fechar' : 'Folhas' }}</span>
      </button>
    </div>

    <!-- Navegação — fichas do fichário -->
    <nav class="nav-tabs" :class="{ 'nav-tabs--open': store.menuAberto }">
      <router-link
        v-for="route in rotas"
        :key="route.name"
        :to="route.path"
        class="nav-tab"
        :class="{ 'nav-tab--lida': store.estaLida(route.name) }"
        @click="store.fecharMenu()"
      >
        <span class="nav-tab-icon">{{ route.meta.icon }}</span>
        <span class="nav-tab-text">
          <span class="nav-tab-folha">Folha {{ route.meta.folha }}</span>
          <span class="nav-tab-title">{{ route.meta.title }}</span>
        </span>
        <span v-if="store.estaLida(route.name)" class="nav-tab-stamp" title="Lida!">✓</span>
      </router-link>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFicharioStore } from '@/stores/fichario'

const store = useFicharioStore()
const router = useRouter()

const rotas = computed(() => {
  return router.getRoutes()
    .filter(r => r.meta && r.meta.folha)
    .sort((a, b) => a.meta.folha - b.meta.folha)
})
</script>

<style scoped>
.header {
  background: white;
  border-bottom: 2px solid var(--border-subtle);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 3.5rem;
  max-width: var(--max-width);
  margin: 0 auto;
}

/* Brand */
.header-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
}

.brand-icon {
  font-size: 1.75rem;
  line-height: 1;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-title {
  font-family: var(--font-handwriting);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--ink-primary);
}

.brand-subtitle {
  font-size: 0.65rem;
  color: rgba(0,0,0,0.4);
  letter-spacing: 0.03em;
}

/* Menu toggle — mobile */
.menu-toggle {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: 1.5px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 0.4rem 0.75rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--ink-primary);
  cursor: pointer;
  transition: all var(--transition-quick);
}

.menu-toggle:hover {
  border-color: var(--ink-blue);
  color: var(--ink-blue);
}

.menu-toggle-icon { font-size: 1rem; }

/* Nav tabs — colapsa no mobile, mostra sempre no desktop */
.nav-tabs {
  display: none;
  flex-direction: column;
  background: white;
  border-top: 1px solid var(--border-subtle);
  padding: 0.5rem;
  gap: 0.25rem;
  max-height: 80vh;
  overflow-y: auto;
}

.nav-tabs--open {
  display: flex;
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.75rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--ink-primary);
  font-size: 0.875rem;
  transition: all var(--transition-quick);
  position: relative;
}

.nav-tab:hover {
  background: #F5F3F0;
  color: var(--ink-primary);
}

.nav-tab.router-link-active {
  background: #EFF6FF;
  color: var(--ink-blue);
  font-weight: 600;
}

.nav-tab-icon { font-size: 1.1rem; flex-shrink: 0; }

.nav-tab-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.nav-tab-folha {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(0,0,0,0.4);
}

.nav-tab-title {
  font-size: 0.85rem;
}

/* Carimbo de lida */
.nav-tab-stamp {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.4rem;
  height: 1.4rem;
  border: 2px solid #15803D;
  border-radius: 50%;
  color: #15803D;
  font-size: 0.75rem;
  font-weight: 700;
  animation: stamp 0.4s ease both;
  flex-shrink: 0;
}

/* Desktop — nav horizontal */
@media (min-width: 48rem) {
  .header-inner {
    padding: 0 1.5rem;
  }

  .menu-toggle {
    display: none;
  }

  .nav-tabs {
    display: flex !important;
    flex-direction: row;
    border-top: none;
    border-top: 1px solid var(--border-subtle);
    padding: 0;
    gap: 0;
    max-height: none;
    overflow: visible;
    overflow-x: auto;
    scrollbar-width: none;
    max-width: var(--max-width);
    margin: 0 auto;
  }

  .nav-tabs::-webkit-scrollbar { display: none; }

  .nav-tab {
    flex-direction: column;
    align-items: center;
    padding: 0.5rem 0.75rem;
    border-radius: 0;
    font-size: 0.75rem;
    gap: 0.15rem;
    border-bottom: 3px solid transparent;
    white-space: nowrap;
  }

  .nav-tab.router-link-active {
    background: transparent;
    border-bottom-color: var(--ink-blue);
  }

  .nav-tab-text {
    align-items: center;
  }

  .nav-tab-folha { font-size: 0.6rem; }
  .nav-tab-title { font-size: 0.75rem; }

  .nav-tab-stamp {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    width: 1.1rem;
    height: 1.1rem;
    font-size: 0.6rem;
    margin: 0;
  }
}
</style>
