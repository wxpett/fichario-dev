<template>
  <div class="code-block-wrapper">
    <div class="code-block-header">
      <div class="code-block-dots">
        <span /><span /><span />
      </div>
      <span class="text-xs" style="color:#888">{{ filename || linguagem }}</span>
      <button
        class="code-block-copy"
        :class="{ copied: copiado }"
        @click="copiar"
      >
        <span>{{ copiado ? '✓ Copiado!' : '📋 Copiar' }}</span>
      </button>
    </div>
    <pre class="code-content"><slot /></pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  linguagem: { type: String, default: 'css' },
  filename: { type: String, default: '' },
  codigo: { type: String, default: '' }
})

const copiado = ref(false)

async function copiar() {
  const texto = props.codigo || document.querySelector('.code-content')?.textContent || ''
  try {
    await navigator.clipboard.writeText(texto)
    copiado.value = true
    setTimeout(() => { copiado.value = false }, 2000)
  } catch {
    copiado.value = false
  }
}
</script>
