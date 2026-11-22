<template>
  <LabBox
    numero="2"
    titulo="Caneta Azul vs. Caneta Vermelha (px vs rem)"
    instrucoes="Mude o tamanho da fonte raiz no seletor. Observe como o card em 'rem' escala junto e o em 'px' fica travado. Depois use o conversor!"
  >
    <!-- Controle de fonte raiz -->
    <div class="control-row">
      <label>
        🎚️ Simular tamanho de fonte raiz do navegador:
        <strong style="color: var(--ink-blue)">{{ fonteRaiz }}px</strong>
      </label>
      <div class="btn-group">
        <button
          v-for="size in [16, 20, 24, 32]"
          :key="size"
          class="btn btn-outline size-btn"
          :class="{ active: fonteRaiz === size }"
          @click="fonteRaiz = size"
        >
          {{ size }}px
        </button>
      </div>
    </div>

    <!-- Mini-cards comparação -->
    <div class="cards-compare" :style="{ '--root-font': fonteRaiz + 'px' }">
      <div class="mini-card px-card">
        <div class="mini-card-badge">❌ px</div>
        <div class="mini-card-title" style="font-size: 20px;">Título (20px)</div>
        <div class="mini-card-body" style="font-size: 14px;">
          Texto do conteúdo (14px fixo). Não muda com as configurações de acessibilidade.
        </div>
        <div class="mini-card-padding" style="padding: 20px 24px;">
          Padding: 20px × 24px — rígido!
        </div>
        <div class="mini-card-info">
          Tamanho fixo: nunca escala 🔒
        </div>
      </div>

      <div class="mini-card rem-card">
        <div class="mini-card-badge">✅ rem</div>
        <div class="mini-card-title" :style="{ fontSize: 1.25 * fonteRaiz + 'px' }">
          Título (1.25rem = {{ (1.25 * fonteRaiz).toFixed(0) }}px)
        </div>
        <div class="mini-card-body" :style="{ fontSize: 0.875 * fonteRaiz + 'px' }">
          Texto (0.875rem = {{ (0.875 * fonteRaiz).toFixed(0) }}px). Escala com acessibilidade!
        </div>
        <div class="mini-card-padding" :style="{ padding: `${1.25 * fonteRaiz}px ${1.5 * fonteRaiz}px` }">
          Padding: 1.25rem × 1.5rem — fluido!
        </div>
        <div class="mini-card-info">
          Escala com o usuário ♿
        </div>
      </div>
    </div>

    <!-- Conversor de unidades -->
    <div class="converter-box">
      <h4 style="margin-bottom:0.75rem;">🔢 Conversor de Unidades</h4>
      <div class="converter-row">
        <div class="converter-input">
          <label>Valor</label>
          <input v-model.number="conversorValor" type="number" min="0" step="0.1" placeholder="Ex: 1.5" />
        </div>
        <div class="converter-input">
          <label>Unidade de entrada</label>
          <select v-model="conversorUnidade" class="select-input">
            <option value="rem">rem</option>
            <option value="em">em</option>
            <option value="pct">%</option>
            <option value="px">px</option>
          </select>
        </div>
        <div class="converter-input">
          <label>Contexto pai (para em e %)</label>
          <input v-model.number="contextoParent" type="number" min="1" placeholder="16" />
          <span class="text-xs text-muted">px</span>
        </div>
      </div>

      <div class="converter-results">
        <div class="converter-result-item">
          <span class="text-xs text-muted">rem</span>
          <strong>{{ converterPara('rem') }}rem</strong>
        </div>
        <div class="converter-result-item">
          <span class="text-xs text-muted">em (no ctx)</span>
          <strong>{{ converterPara('em') }}em</strong>
        </div>
        <div class="converter-result-item">
          <span class="text-xs text-muted">px</span>
          <strong style="color: var(--ink-blue)">{{ converterPara('px') }}px</strong>
        </div>
        <div class="converter-result-item">
          <span class="text-xs text-muted">%</span>
          <strong>{{ converterPara('pct') }}%</strong>
        </div>
      </div>
    </div>
  </LabBox>
</template>

<script setup>
import { ref, computed } from 'vue'
import LabBox from '@/components/ui/LabBox.vue'

const fonteRaiz = ref(16)
const conversorValor = ref(1.5)
const conversorUnidade = ref('rem')
const contextoParent = ref(16)

function converterPara(alvo) {
  const v = conversorValor.value || 0
  const raiz = fonteRaiz.value
  const pai = contextoParent.value || raiz

  // Converter para px primeiro
  let px = 0
  if (conversorUnidade.value === 'rem') px = v * raiz
  else if (conversorUnidade.value === 'em') px = v * pai
  else if (conversorUnidade.value === 'pct') px = (v / 100) * pai
  else if (conversorUnidade.value === 'px') px = v

  // Converter px para alvo
  if (alvo === 'px') return px.toFixed(1)
  if (alvo === 'rem') return (px / raiz).toFixed(3)
  if (alvo === 'em') return (px / pai).toFixed(3)
  if (alvo === 'pct') return ((px / pai) * 100).toFixed(1)
  return 0
}
</script>

<style scoped>
.control-row {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.btn-group {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.size-btn.active {
  background: var(--ink-primary);
  color: white;
  border-color: var(--ink-primary);
}

.cards-compare {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

@media (min-width: 36rem) {
  .cards-compare { grid-template-columns: 1fr 1fr; }
}

.mini-card {
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1.5px solid var(--border-subtle);
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.mini-card-badge {
  padding: 0.3rem 0.75rem;
  font-size: 0.72rem;
  font-weight: 700;
}

.px-card .mini-card-badge { background: #FEE2E2; color: #B91C1C; }
.rem-card .mini-card-badge { background: #DCFCE7; color: #15803D; }

.mini-card-title {
  padding: 0.5rem 0.75rem 0;
  font-weight: 700;
  transition: font-size 0.3s ease;
}

.mini-card-body {
  padding: 0.4rem 0.75rem;
  color: rgba(0,0,0,0.6);
  transition: font-size 0.3s ease;
}

.mini-card-padding {
  background: rgba(0,0,0,0.04);
  font-size: 0.72rem;
  transition: padding 0.3s ease;
  color: rgba(0,0,0,0.5);
  font-family: var(--font-mono);
}

.mini-card-info {
  padding: 0.4rem 0.75rem;
  font-size: 0.72rem;
  font-weight: 600;
}

.px-card .mini-card-info { color: #B91C1C; }
.rem-card .mini-card-info { color: #15803D; }

/* Conversor */
.converter-box {
  background: #F9F7F4;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 1rem;
  margin-top: 0.5rem;
}

.converter-row {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

@media (min-width: 40rem) {
  .converter-row { flex-direction: row; }
}

.converter-input {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.select-input {
  font-family: var(--font-body);
  font-size: 0.875rem;
  padding: 0.4rem 0.75rem;
  border: 1.5px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  background: white;
  color: var(--ink-primary);
  cursor: pointer;
}

.converter-results {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

@media (min-width: 40rem) {
  .converter-results { grid-template-columns: repeat(4, 1fr); }
}

.converter-result-item {
  background: white;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 0.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.converter-result-item strong {
  font-family: var(--font-mono);
  font-size: 1rem;
}
</style>
