<template>
  <LabBox
    numero="3"
    titulo="Régua de Esticar (Grid minmax)"
    instrucoes="Arraste o slider para mudar a largura do contêiner. Observe quando surgem 2 e 3 colunas. Preste atenção no destaque em 464px!"
  >
    <div class="slider-row">
      <label>
        📏 Largura do contêiner:
        <strong
          class="largura-valor"
          :style="{ color: corLargura }"
        >{{ largura }}px</strong>
      </label>
      <input
        v-model.number="largura"
        type="range"
        min="280"
        max="800"
        step="4"
      />
      <div class="slider-labels">
        <span>280px</span>
        <span>800px</span>
      </div>
    </div>

    <!-- Marcos de referência -->
    <div class="marcos-row">
      <button class="btn btn-outline marco-btn" @click="largura = 300">300px (1 col)</button>
      <button
        class="btn marco-btn"
        :class="largura >= 464 ? 'btn-blue' : 'btn-outline'"
        @click="largura = 464"
      >
        464px (2 col) ✨
      </button>
      <button
        class="btn marco-btn"
        :class="largura >= 704 ? 'btn-blue' : 'btn-outline'"
        @click="largura = 704"
      >
        704px (3 col) ✨
      </button>
    </div>

    <!-- Info em tempo real -->
    <div class="grid-info" :class="{ 'grid-info--highlight': largura === 464 || largura === 704 }">
      <div class="info-item">
        <span class="info-label">Largura</span>
        <strong :style="{ color: corLargura }">{{ largura }}px</strong>
      </div>
      <div class="info-item">
        <span class="info-label">Colunas ativas</span>
        <strong style="font-size:1.5rem;">{{ colunasAtivas }}</strong>
      </div>
      <div class="info-item">
        <span class="info-label">Conta</span>
        <span class="text-mono text-xs">{{ contaColuna }}</span>
      </div>
      <div v-if="largura >= 464 && largura < 704" class="info-badge badge badge-green">
        🎉 Passou de 464px! Surgiu a 2ª coluna!
      </div>
      <div v-if="largura >= 704" class="info-badge badge badge-blue">
        🎉 Passou de 704px! Surgiu a 3ª coluna!
      </div>
    </div>

    <!-- Grid demo -->
    <div class="grid-demo-wrapper">
      <div
        class="grid-demo"
        :style="{ width: largura + 'px' }"
      >
        <div
          v-for="n in 6"
          :key="n"
          class="grid-demo-card"
          :class="{ 'card-ativo': n <= colunasAtivas }"
        >
          <span class="card-num">{{ n }}</span>
          <span class="card-label">Card {{ n }}</span>
        </div>
      </div>
    </div>

    <div class="formula-box">
      <span class="text-xs text-muted">Fórmula aplicada:</span>
      <code>grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr))</code>
      <code class="mt-1">gap: 1rem &nbsp;|&nbsp; 1rem = 16px &nbsp;|&nbsp; 14rem = 224px</code>
    </div>
  </LabBox>
</template>

<script setup>
import { ref, computed } from 'vue'
import LabBox from '@/components/ui/LabBox.vue'

const largura = ref(300)

const colunasAtivas = computed(() => {
  const w = largura.value
  const minCol = 14 * 16  // 14rem = 224px
  const gap = 1 * 16      // 1rem = 16px
  // Quantas colunas cabem: N * 224 + (N-1) * 16 <= w
  // 224N + 16N - 16 <= w
  // 240N <= w + 16
  // N <= (w + 16) / 240
  return Math.floor((w + gap) / (minCol + gap))
})

const corLargura = computed(() => {
  if (largura.value >= 704) return '#1D4ED8'
  if (largura.value >= 464) return '#15803D'
  return '#B91C1C'
})

const contaColuna = computed(() => {
  const c = colunasAtivas.value
  const minCol = 14  // rem
  const gap = 1       // rem
  if (c === 1) return `${minCol}rem = ${minCol * 16}px`
  if (c === 2) return `${minCol}rem + ${gap}rem gap + ${minCol}rem = ${(2 * minCol + gap)}rem = ${(2 * minCol + gap) * 16}px`
  if (c === 3) return `${minCol}+${gap}+${minCol}+${gap}+${minCol} = ${(3 * minCol + 2 * gap)}rem = ${(3 * minCol + 2 * gap) * 16}px`
  return `${c} colunas`
})
</script>

<style scoped>
.slider-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  color: rgba(0,0,0,0.4);
  font-family: var(--font-mono);
}

.largura-valor {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.marcos-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.marco-btn {
  font-size: 0.78rem;
  padding: 0.3rem 0.6rem;
}

.grid-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  padding: 1rem;
  background: #F9F7F4;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--border-subtle);
  margin-bottom: 1.25rem;
  transition: all 0.3s ease;
}

.grid-info--highlight {
  border-color: #15803D;
  background: #F0FDF4;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.info-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(0,0,0,0.4);
}

.info-badge {
  grid-column: 1 / -1;
  display: inline-block !important;
  font-size: 0.8rem !important;
  padding: 0.3rem 0.75rem !important;
}

.grid-demo-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.grid-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
  min-width: 280px;
  transition: width 0.15s ease;
  border: 2px dashed var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 0.75rem;
  background: white;
}

.grid-demo-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  min-height: 5rem;
  border-radius: var(--radius-md);
  border: 2px solid var(--border-subtle);
  background: #F9F7F4;
  transition: all 0.3s ease;
}

.card-ativo {
  border-color: var(--ink-blue);
  background: #EFF6FF;
}

.card-num {
  font-size: 1.5rem;
  font-weight: 700;
  font-family: var(--font-handwriting);
  color: var(--ink-blue);
}

.card-label {
  font-size: 0.72rem;
  color: rgba(0,0,0,0.4);
}

.formula-box {
  background: #1E1E2E;
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.formula-box code {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: #A6E3A1;
}

.formula-box .text-muted {
  color: #6C7086;
  font-size: 0.72rem;
}
</style>
