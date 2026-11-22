<template>
  <div class="sheet">
    <div class="section-block">
      <span class="section-label">Folha 6 de 6 — Desafio Final</span>
      <h1>
        <span class="highlight-title">🏆 Desafio</span>
      </h1>
      <p class="mt-2 text-sm text-muted">
        Você chegou até aqui! Agora vamos ver se você absorveu o conteúdo.
        As perguntas abaixo só podem ser respondidas corretamente se você testou os laboratórios.
      </p>
    </div>

    <!-- Intro -->
    <PostItNote cor="yellow" label="📋 Instruções" class="mb-3" :flat="true">
      Responda todas as perguntas e clique em <strong>"Verificar respostas"</strong>.
      Cada pergunta tem uma resposta exata que você encontra testando os laboratórios do guia.
      Boa sorte! 🎯
    </PostItNote>

    <!-- Perguntas -->
    <form class="desafio-form" @submit.prevent="verificar">
      <div
        v-for="(pergunta, i) in perguntas"
        :key="pergunta.id"
        class="pergunta-card"
        :class="{
          'pergunta-card--correta': enviado && respostas[i] !== '' && verificarResposta(i),
          'pergunta-card--errada': enviado && respostas[i] !== '' && !verificarResposta(i),
          'pergunta-card--vazia': enviado && respostas[i] === ''
        }"
      >
        <div class="pergunta-num">{{ i + 1 }}</div>
        <div class="pergunta-body">
          <p class="pergunta-texto">{{ pergunta.texto }}</p>
          <div class="pergunta-dica" v-if="pergunta.dica">
            💡 <em>{{ pergunta.dica }}</em>
          </div>

          <div class="pergunta-input-row">
            <input
              v-model="respostas[i]"
              type="text"
              :placeholder="pergunta.placeholder"
              :disabled="enviado && verificarResposta(i)"
              class="pergunta-input"
            />
            <span v-if="enviado" class="pergunta-feedback">
              <span v-if="respostas[i] === ''" class="badge badge-yellow">Sem resposta</span>
              <span v-else-if="verificarResposta(i)" class="badge badge-green">✓ Correto!</span>
              <span v-else class="badge badge-red">✗ Errado</span>
            </span>
          </div>

          <div v-if="enviado && !verificarResposta(i) && respostas[i] !== ''" class="pergunta-gabarito">
            <strong>Resposta esperada:</strong> {{ pergunta.gabarito_texto }}
          </div>
        </div>
      </div>

      <div class="desafio-actions">
        <button type="submit" class="btn btn-primary" :disabled="enviado && pontuacao === perguntas.length">
          {{ enviado ? 'Tentar novamente' : '🎯 Verificar respostas' }}
        </button>
      </div>
    </form>

    <!-- Resultado -->
    <transition name="fade">
      <div v-if="enviado" class="resultado-card" :class="resultadoClasse">
        <div class="resultado-numero">{{ pontuacao }}/{{ perguntas.length }}</div>
        <div class="resultado-label">{{ resultadoMensagem }}</div>
        <div class="resultado-estrelas">{{ estrelas }}</div>
      </div>
    </transition>

    <!-- Parabéns final -->
    <div v-if="enviado && pontuacao === perguntas.length" class="parabens-section">
      <PostItNote cor="green" label="🎉 Parabéns!">
        <strong>Você dominou o básico de responsividade!</strong><br>
        Agora você sabe: viewport, unidades CSS, Flexbox/Grid, imagens responsivas e boas práticas Vue.
        Continue praticando e explore os links das fontes em cada folha. 🚀
      </PostItNote>
    </div>

    <SheetNav />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PostItNote from '@/components/ui/PostItNote.vue'
import SheetNav from '@/components/ui/SheetNav.vue'

const perguntas = [
  {
    id: 1,
    texto: 'No laboratório de Grid da Folha 3, a partir de qual largura exata do contêiner surgem 2 colunas? (use o formato: NNNpx)',
    dica: 'Dica: 14rem + 1rem gap + 14rem = ? rem. 1rem = 16px.',
    placeholder: 'Ex: 464px',
    gabarito: ['464px', '464'],
    gabarito_texto: '464px (14rem + 1rem gap + 14rem = 29rem = 464px)'
  },
  {
    id: 2,
    texto: 'No laboratório de Grid da Folha 3, a partir de qual largura surgem 3 colunas? (formato: NNNpx)',
    dica: 'Dica: 3 colunas + 2 gaps. Cada gap = 1rem = 16px.',
    placeholder: 'Ex: 704px',
    gabarito: ['704px', '704'],
    gabarito_texto: '704px (14rem + 1rem + 14rem + 1rem + 14rem = 44rem = 704px)'
  },
  {
    id: 3,
    texto: 'Na Folha 1, qual é o nome exato do atributo da meta tag viewport que faz o celular usar a largura real do dispositivo?',
    dica: 'É a propriedade do atributo content.',
    placeholder: 'Ex: width=device-width',
    gabarito: ['width=device-width', 'width = device-width'],
    gabarito_texto: 'width=device-width'
  },
  {
    id: 4,
    texto: 'Na Folha 2, qual unidade CSS respeita as configurações de tamanho de fonte do usuário no navegador?',
    dica: 'É uma unidade relativa ao elemento raiz.',
    placeholder: 'Ex: rem',
    gabarito: ['rem'],
    gabarito_texto: 'rem (relativo ao font-size do elemento html raiz)'
  },
  {
    id: 5,
    texto: 'Na Folha 4, qual métrica do Google (sigla de 3 letras) mede o problema do texto "pulando" quando uma imagem carrega?',
    dica: 'É um dos Core Web Vitals.',
    placeholder: 'Ex: CLS',
    gabarito: ['cls', 'CLS', 'Cls'],
    gabarito_texto: 'CLS — Cumulative Layout Shift'
  }
]

const respostas = ref(perguntas.map(() => ''))
const enviado = ref(false)

function verificarResposta(i) {
  const resposta = respostas.value[i].trim().toLowerCase()
  return perguntas[i].gabarito.some(g => g.toLowerCase() === resposta)
}

const pontuacao = computed(() =>
  perguntas.filter((_, i) => verificarResposta(i)).length
)

const resultadoClasse = computed(() => {
  const p = pontuacao.value
  if (p === perguntas.length) return 'resultado-card--perfeito'
  if (p >= Math.floor(perguntas.length / 2)) return 'resultado-card--bom'
  return 'resultado-card--ruim'
})

const resultadoMensagem = computed(() => {
  const p = pontuacao.value
  if (p === perguntas.length) return 'Perfeito! Você absorveu tudo! 🎓'
  if (p >= 4) return 'Muito bem! Só mais um ajuste.'
  if (p >= 3) return 'Bom progresso! Revise as folhas com erro.'
  return 'Revise as folhas e tente novamente!'
})

const estrelas = computed(() => {
  const p = pontuacao.value
  const total = perguntas.length
  const stars = Math.round((p / total) * 5)
  return '⭐'.repeat(stars) + '☆'.repeat(5 - stars)
})

function verificar() {
  if (enviado.value) {
    // Reset
    respostas.value = perguntas.map(() => '')
    enviado.value = false
  } else {
    enviado.value = true
  }
}
</script>

<style scoped>
.desafio-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.pergunta-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.25rem;
  border: 2px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  background: white;
  transition: border-color 0.3s ease, background 0.3s ease;
}

.pergunta-card--correta {
  border-color: #15803D;
  background: #F0FDF4;
}

.pergunta-card--errada {
  border-color: var(--margin-line);
  background: #FFF5F5;
}

.pergunta-card--vazia {
  border-color: #D97706;
  background: #FFFBEB;
}

.pergunta-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  background: var(--ink-primary);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.pergunta-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pergunta-texto {
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.5;
}

.pergunta-dica {
  font-size: 0.82rem;
  color: rgba(0,0,0,0.5);
  font-style: italic;
}

.pergunta-input-row {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
}

.pergunta-input {
  flex: 1;
  min-width: 10rem;
}

.pergunta-gabarito {
  font-size: 0.82rem;
  padding: 0.4rem 0.75rem;
  background: #FEE2E2;
  border-radius: var(--radius-sm);
  color: #991B1B;
}

.desafio-actions {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}

.resultado-card {
  margin-top: 2rem;
  padding: 2rem;
  border-radius: var(--radius-lg);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid var(--border-subtle);
}

.resultado-card--perfeito {
  background: #F0FDF4;
  border-color: #15803D;
}

.resultado-card--bom {
  background: #EFF6FF;
  border-color: var(--ink-blue);
}

.resultado-card--ruim {
  background: #FFF7ED;
  border-color: #D97706;
}

.resultado-numero {
  font-size: 3rem;
  font-weight: 700;
  font-family: var(--font-handwriting);
  color: var(--ink-primary);
  line-height: 1;
}

.resultado-label {
  font-size: 1rem;
  font-weight: 500;
}

.resultado-estrelas {
  font-size: 1.5rem;
  letter-spacing: 0.1em;
}

.parabens-section {
  margin-top: 2rem;
}
</style>
