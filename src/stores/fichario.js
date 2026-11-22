import { defineStore } from 'pinia'
import { ref, computed, onMounted, onUnmounted } from 'vue'

export const useFicharioStore = defineStore('fichario', () => {
  // --- Estado de leitura ---
  const lidas = ref(new Set(JSON.parse(localStorage.getItem('fichario-lidas') || '[]')))

  function marcarLida(roteName) {
    lidas.value.add(roteName)
    localStorage.setItem('fichario-lidas', JSON.stringify([...lidas.value]))
  }

  function desmarcarLida(roteName) {
    lidas.value.delete(roteName)
    localStorage.setItem('fichario-lidas', JSON.stringify([...lidas.value]))
  }

  function estaLida(roteName) {
    return lidas.value.has(roteName)
  }

  // --- Monitor de viewport ---
  const larguraJanela = ref(window.innerWidth)

  const breakpointAtivo = computed(() => {
    const w = larguraJanela.value
    if (w >= 1024) return 'Desktop'
    if (w >= 768) return 'Tablet'
    return 'Mobile'
  })

  const breakpointInfo = computed(() => {
    const w = larguraJanela.value
    if (w >= 1024) return { label: 'Desktop', rem: '≥ 64rem', cor: '#15803D' }
    if (w >= 768) return { label: 'Tablet', rem: '≥ 48rem', cor: '#1D4ED8' }
    return { label: 'Mobile', rem: '< 48rem', cor: '#B91C1C' }
  })

  function atualizarLargura() {
    larguraJanela.value = window.innerWidth
  }

  // Inicializar listener
  let resizeHandler = null

  function iniciarMonitor() {
    resizeHandler = () => { larguraJanela.value = window.innerWidth }
    window.addEventListener('resize', resizeHandler)
  }

  function pararMonitor() {
    if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  }

  // Menu mobile
  const menuAberto = ref(false)
  function toggleMenu() { menuAberto.value = !menuAberto.value }
  function fecharMenu() { menuAberto.value = false }

  return {
    // lidas
    lidas,
    marcarLida,
    desmarcarLida,
    estaLida,
    // viewport
    larguraJanela,
    breakpointAtivo,
    breakpointInfo,
    atualizarLargura,
    iniciarMonitor,
    pararMonitor,
    // menu
    menuAberto,
    toggleMenu,
    fecharMenu
  }
})
