<template>
  <div class="lab-box">
    <div class="lab-box-header">
      <span class="lab-badge">🔬 Laboratório {{ numero }}</span>
      <span class="lab-title">{{ titulo }}</span>
    </div>
    <div class="lab-instructions">
      💡 <strong>Como testar:</strong> {{ instrucoes }}
    </div>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  numero: { type: [Number, String], default: '' },
  titulo: { type: String, required: true },
  instrucoes: { type: String, default: 'Interaja com os controles abaixo e observe os resultados.' }
})
</script>
