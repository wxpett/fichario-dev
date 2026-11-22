<template>
  <LabBox
    numero="5"
    titulo="Bug do v-for sem :key ao vivo"
    instrucoes="Digite algo no campo de texto do 2º animal (Quati). Depois clique em 'Remover 1º animal'. Veja o que acontece com o texto em cada lista!"
  >
    <div class="listas-compare">
      <!-- Lista SEM :key -->
      <div class="lista-col">
        <div class="lista-header lista-header--ruim">
          <span class="badge badge-red">❌ Sem :key</span>
          <code class="text-xs">v-for="animal in animais"</code>
        </div>
        <div class="lista-warning">
          ⚠️ Vue reutiliza os elementos DOM in-place. O input NÃO segue o dado!
        </div>
        <ul class="animais-lista">
          <li v-for="animal in animaisSemKey" class="animal-item">
            <span class="animal-emoji">{{ animal.emoji }}</span>
            <span class="animal-nome">{{ animal.nome }}</span>
            <input
              type="text"
              class="animal-input"
              :placeholder="`Digite algo sobre ${animal.nome}...`"
            />
          </li>
        </ul>
        <button class="btn btn-outline remover-btn" @click="removerPrimeiro('semKey')">
          🗑️ Remover 1º animal ({{ animaisSemKey[0]?.nome }})
        </button>
        <div v-if="animaisSemKey.length === 0" class="lista-vazia">
          Lista vazia!
        </div>
        <button v-if="animaisSemKey.length < 3" class="btn btn-outline mt-1" @click="resetarSemKey">
          ↺ Resetar lista
        </button>
      </div>

      <!-- Lista COM :key -->
      <div class="lista-col">
        <div class="lista-header lista-header--bom">
          <span class="badge badge-green">✅ Com :key</span>
          <code class="text-xs">v-for="animal in animais" :key="animal.id"</code>
        </div>
        <div class="lista-info">
          ✓ Vue sabe exatamente qual elemento DOM pertence a qual dado. O input segue!
        </div>
        <ul class="animais-lista">
          <li v-for="animal in animaisComKey" :key="animal.id" class="animal-item">
            <span class="animal-emoji">{{ animal.emoji }}</span>
            <span class="animal-nome">{{ animal.nome }}</span>
            <input
              v-model="animal.texto"
              type="text"
              class="animal-input"
              :placeholder="`Digite algo sobre ${animal.nome}...`"
            />
          </li>
        </ul>
        <button class="btn btn-outline remover-btn" @click="removerPrimeiro('comKey')">
          🗑️ Remover 1º animal ({{ animaisComKey[0]?.nome }})
        </button>
        <div v-if="animaisComKey.length === 0" class="lista-vazia">
          Lista vazia!
        </div>
        <button v-if="animaisComKey.length < 3" class="btn btn-outline mt-1" @click="resetarComKey">
          ↺ Resetar lista
        </button>
      </div>
    </div>

    <!-- Explicação -->
    <div class="bug-explainer">
      <h4 class="mb-1">🔍 O que está acontecendo?</h4>
      <div class="explainer-grid">
        <div class="explainer-item explainer-item--ruim">
          <strong>❌ Sem :key — Patch in-place</strong>
          <p>Ao remover a Capivara, o Vue pega o 1º elemento DOM e atualiza só o texto para "Quati".
            O <code>&lt;input&gt;</code> já tinha conteúdo digitado — e fica preso no lugar errado!</p>
        </div>
        <div class="explainer-item explainer-item--bom">
          <strong>✅ Com :key="animal.id" — Remoção precisa</strong>
          <p>O Vue usa o <code>id</code> para identificar cada elemento DOM. Ao remover a Capivara,
            ele remove o elemento DOM certo. O input do Quati segue junto com o seu dado.</p>
        </div>
      </div>
    </div>
  </LabBox>
</template>

<script setup>
import { ref } from 'vue'
import LabBox from '@/components/ui/LabBox.vue'

const animaisBase = [
  { id: 1, nome: 'Capivara', emoji: '🦫' },
  { id: 2, nome: 'Quati', emoji: '🦝' },
  { id: 3, nome: 'Tucano', emoji: '🦜' }
]

// Lista SEM :key (sem v-model — o bug está no DOM)
const animaisSemKey = ref([...animaisBase.map(a => ({ ...a }))])

// Lista COM :key (com v-model no texto)
const animaisComKey = ref([...animaisBase.map(a => ({ ...a, texto: '' }))])

function removerPrimeiro(lista) {
  if (lista === 'semKey') {
    animaisSemKey.value.shift()
  } else {
    animaisComKey.value.shift()
  }
}

function resetarSemKey() {
  animaisSemKey.value = [...animaisBase.map(a => ({ ...a }))]
}

function resetarComKey() {
  animaisComKey.value = [...animaisBase.map(a => ({ ...a, texto: '' }))]
}
</script>

<style scoped>
.listas-compare {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
}

@media (min-width: 40rem) {
  .listas-compare { grid-template-columns: 1fr 1fr; }
}

.lista-col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.lista-header {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
}

.lista-header--ruim { background: #FEF2F2; border: 1px solid #FECACA; }
.lista-header--bom { background: #F0FDF4; border: 1px solid #BBF7D0; }

.lista-warning {
  font-size: 0.78rem;
  color: #B91C1C;
  background: #FEF2F2;
  padding: 0.4rem 0.6rem;
  border-radius: var(--radius-sm);
}

.lista-info {
  font-size: 0.78rem;
  color: #15803D;
  background: #F0FDF4;
  padding: 0.4rem 0.6rem;
  border-radius: var(--radius-sm);
}

.animais-lista {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}

.animal-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.5rem;
  background: white;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
}

.animal-emoji { font-size: 1.25rem; flex-shrink: 0; }

.animal-nome {
  font-size: 0.85rem;
  font-weight: 500;
  min-width: 4.5rem;
}

.animal-input {
  flex: 1;
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  min-width: 0;
}

.remover-btn {
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  color: #B91C1C;
  border-color: #FECACA;
}

.remover-btn:hover {
  background: #FEF2F2;
  border-color: #B91C1C;
}

.lista-vazia {
  text-align: center;
  padding: 1rem;
  color: rgba(0,0,0,0.3);
  font-size: 0.85rem;
  font-style: italic;
}

/* Explicação */
.bug-explainer {
  background: #F9F7F4;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 1rem;
}

.explainer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

@media (min-width: 40rem) {
  .explainer-grid { grid-template-columns: 1fr 1fr; }
}

.explainer-item {
  padding: 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.82rem;
  line-height: 1.5;
}

.explainer-item p { margin-top: 0.3rem; color: rgba(0,0,0,0.6); }
.explainer-item code { font-family: var(--font-mono); font-size: 0.78rem; }

.explainer-item--ruim {
  background: #FEF2F2;
  border-left: 3px solid #B91C1C;
}

.explainer-item--bom {
  background: #F0FDF4;
  border-left: 3px solid #15803D;
}

.mt-1 { margin-top: 0.4rem; }
</style>
