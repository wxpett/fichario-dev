<template>
  <LabBox
    numero="4"
    titulo="Foto Polaroid com Atraso (CLS + Consumo de API)"
    instrucoes="Clique em 'Carregar Foto'. Observe o texto pulando quando o checkbox está desmarcado. Marque 'Reservar espaço' e recarregue para ver a diferença!"
  >
    <!-- Controle de reserva de espaço -->
    <div class="cls-controls">
      <label class="checkbox-label">
        <input v-model="reservarEspaco" type="checkbox" class="checkbox-input" />
        <span>
          Reservar espaço (<code>width</code> e <code>height</code> no HTML)
        </span>
      </label>
      <span class="badge" :class="reservarEspaco ? 'badge-green' : 'badge-red'">
        {{ reservarEspaco ? '✓ CLS → 0' : '⚠️ CLS → alto' }}
      </span>
    </div>

    <!-- Área da Polaroid -->
    <div class="polaroid-area">
      <!-- Texto que fica "pulando" -->
      <div class="texto-acima">
        <p>📝 Este texto está <strong>acima</strong> da foto. Se o espaço não for reservado, ele vai saltar quando a imagem carregar. Fique de olho!</p>
      </div>

      <!-- Polaroid -->
      <div class="polaroid-wrapper">
        <div class="polaroid">
          <!-- Sem reserva de espaço: container sem tamanho definido -->
          <div
            class="polaroid-img-area"
            :class="{ 'reservado': reservarEspaco }"
          >
            <div v-if="!carregou && !carregando" class="polaroid-placeholder">
              <span>🖼️</span>
              <span class="text-xs text-muted">Foto vai aparecer aqui</span>
            </div>

            <div v-if="carregando && !carregou" class="polaroid-loading">
              <div class="spinner" />
              <span class="text-xs text-muted">Carregando ({{ countdown }}s)...</span>
            </div>

            <img
              v-if="carregou"
              :src="srcImagem"
              :width="reservarEspaco ? 400 : undefined"
              :height="reservarEspaco ? 260 : undefined"
              alt="Foto aleatória do Picsum"
              class="polaroid-img"
            />
          </div>
          <div class="polaroid-caption">
            {{ carregou ? '📸 foto_aleatoria.jpg' : '— sem foto —' }}
          </div>
        </div>
      </div>

      <!-- Texto que "pula" -->
      <div class="texto-abaixo">
        <p>📝 Este texto está <strong>abaixo</strong> da foto. <span v-if="!reservarEspaco" class="text-red"><strong>Ele vai saltar!</strong></span><span v-else class="text-green"><strong>Ele ficou no lugar ✓</strong></span></p>
        <p class="text-xs text-muted mt-1">{{ descricaoCLS }}</p>
      </div>
    </div>

    <!-- Botão carregar -->
    <div class="btn-row">
      <button
        class="btn btn-blue"
        :disabled="carregando"
        @click="carregarFoto"
      >
        {{ carregando ? `⏳ Aguardando (${countdown}s)...` : carregou ? '🔄 Nova Foto' : '📷 Carregar Foto' }}
      </button>
      <button v-if="carregou" class="btn btn-outline" @click="resetar">
        Resetar
      </button>
    </div>

    <!-- Explicação CLS -->
    <div class="cls-explainer">
      <div class="cls-metric">
        <span class="text-xs text-muted">Métrica simulada</span>
        <strong :class="reservarEspaco ? 'text-green' : 'text-red'">
          CLS: {{ reservarEspaco ? '0.00' : estimativaCLS }}
        </strong>
      </div>
      <div class="cls-scale">
        <span class="cls-zone bom">Bom (&lt;0.1)</span>
        <span class="cls-zone medio">Médio (0.1–0.25)</span>
        <span class="cls-zone ruim">Ruim (&gt;0.25)</span>
      </div>
    </div>
  </LabBox>
</template>

<script setup>
import { ref, computed } from 'vue'
import LabBox from '@/components/ui/LabBox.vue'

const reservarEspaco = ref(false)
const carregando = ref(false)
const carregou = ref(false)
const srcImagem = ref('')
const countdown = ref(2)
let timer = null

const descricaoCLS = computed(() => {
  if (!carregou.value) return 'Clique em "Carregar Foto" para ver o efeito.'
  if (reservarEspaco.value) {
    return 'width e height no HTML reservaram espaço. O layout não mudou quando a imagem chegou.'
  }
  return 'Sem width e height no HTML, o browser não sabia o tamanho. Layout recalculado ao carregar!'
})

const estimativaCLS = computed(() => {
  return carregou.value && !reservarEspaco.value ? '0.42' : '0.00'
})

function carregarFoto() {
  if (carregando.value) return
  carregou.value = false
  carregando.value = true
  countdown.value = 2

  // Adiciona timestamp para evitar cache
  const seed = Math.floor(Math.random() * 1000)
  srcImagem.value = `https://picsum.photos/seed/${seed}/400/260`

  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      carregando.value = false
      carregou.value = true
    }
  }, 1000)
}

function resetar() {
  if (timer) clearInterval(timer)
  carregando.value = false
  carregou.value = false
  srcImagem.value = ''
  countdown.value = 2
}
</script>

<style scoped>
.cls-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
  padding: 0.75rem;
  background: #F9F7F4;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  user-select: none;
}

.checkbox-input {
  width: 1.1rem;
  height: 1.1rem;
  accent-color: var(--ink-blue);
  cursor: pointer;
}

.polaroid-area {
  margin-bottom: 1rem;
}

.texto-acima, .texto-abaixo {
  padding: 0.75rem 1rem;
  background: #FFF;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.text-green { color: #15803D; }

.polaroid-wrapper {
  display: flex;
  justify-content: center;
  margin: 0.75rem 0;
}

.polaroid {
  background: white;
  padding: 0.75rem 0.75rem 2rem;
  border: 1px solid #DDD;
  box-shadow: 3px 4px 12px rgba(0,0,0,0.15);
  transform: rotate(-1deg);
  max-width: 26rem;
  width: 100%;
}

.polaroid-img-area {
  background: #F0EDE8;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: height 0.3s ease;
  min-height: 2rem;
}

.polaroid-img-area.reservado {
  /* Reserva exata do espaço da imagem: 400×260 proporção */
  aspect-ratio: 400 / 260;
  width: 100%;
  height: auto;
}

.polaroid-placeholder, .polaroid-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 2rem;
  color: rgba(0,0,0,0.3);
  font-size: 2rem;
  min-height: 10rem;
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #E0DDD5;
  border-top-color: var(--ink-blue);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.polaroid-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.polaroid-caption {
  text-align: center;
  padding-top: 0.75rem;
  font-family: var(--font-handwriting);
  font-size: 1rem;
  color: rgba(0,0,0,0.5);
}

.btn-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

/* CLS Explainer */
.cls-explainer {
  background: #F9F7F4;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cls-metric {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.cls-metric strong {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.cls-scale {
  display: flex;
  border-radius: var(--radius-sm);
  overflow: hidden;
  font-size: 0.7rem;
  font-weight: 600;
}

.cls-zone {
  flex: 1;
  text-align: center;
  padding: 0.3rem 0.25rem;
  color: white;
}

.cls-zone.bom { background: #15803D; }
.cls-zone.medio { background: #D97706; }
.cls-zone.ruim { background: #B91C1C; }
</style>
