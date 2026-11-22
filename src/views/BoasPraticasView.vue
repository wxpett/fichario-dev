<template>
  <div class="sheet">
    <div class="section-block">
      <span class="section-label">Folha 5 de 6</span>
      <h1>
        Boas práticas
        <span class="highlight-title">Vue 3</span>
      </h1>
      <p class="mt-2 text-sm text-muted">
        Código que funciona é bom. Código que funciona, é legível e escala sem dor é melhor ainda.
        Aqui estão as práticas que separam um projeto amador de um profissional.
      </p>
    </div>

    <!-- 1. Explicação -->
    <div class="section-block">
      <span class="section-label">📖 Explicação</span>

      <h2 class="mb-2">As regras do projeto bem estruturado</h2>

      <div class="practices-list">
        <div class="practice-item">
          <span class="practice-icon">📁</span>
          <div>
            <strong>Estrutura de pastas clara</strong>
            <p><code>src/views/</code> (páginas), <code>src/components/</code> (componentes reutilizáveis),
              <code>src/stores/</code> (Pinia), <code>src/router/</code>, <code>src/assets/styles/</code></p>
          </div>
        </div>
        <div class="practice-item">
          <span class="practice-icon">🏷️</span>
          <div>
            <strong>Nomes de componentes em PascalCase</strong>
            <p><code>TheHeader.vue</code>, <code>PostItNote.vue</code>, <code>LabGrid.vue</code> — sem abreviações obscuras.</p>
          </div>
        </div>
        <div class="practice-item">
          <span class="practice-icon">🔒</span>
          <div>
            <strong>Props tipadas e eventos com emit</strong>
            <p>Use <code>defineProps</code> com types e <code>defineEmits</code> explícito — o componente vira um contrato claro.</p>
          </div>
        </div>
        <div class="practice-item">
          <span class="practice-icon">🔑</span>
          <div>
            <strong>Sempre use <code>:key</code> no <code>v-for</code></strong>
            <p>Sem key, o Vue reutiliza elementos DOM de forma errada. Use um ID único, não o índice!</p>
          </div>
        </div>
        <div class="practice-item">
          <span class="practice-icon">🎨</span>
          <div>
            <strong>Variáveis CSS como Design Tokens</strong>
            <p>Defina cores, fontes e espaçamentos em <code>:root { --cor: #value }</code>. Um arquivo para mudar tudo.</p>
          </div>
        </div>
        <div class="practice-item">
          <span class="practice-icon">⚡</span>
          <div>
            <strong>Lazy loading de rotas</strong>
            <p><code>() => import('./views/MeuView.vue')</code> — cada rota vira um chunk separado. A primeira tela carrega mais rápido.</p>
          </div>
        </div>
        <div class="practice-item">
          <span class="practice-icon">📊</span>
          <div>
            <strong>Core Web Vitals</strong>
            <p>
              <span class="badge badge-blue">LCP</span> Largest Contentful Paint — velocidade do maior elemento carregar (&lt;2.5s)<br>
              <span class="badge badge-green">INP</span> Interaction to Next Paint — resposta a interações do usuário (&lt;200ms)<br>
              <span class="badge badge-red">CLS</span> Cumulative Layout Shift — estabilidade visual (&lt;0.1)
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Código -->
    <div class="section-block">
      <span class="section-label">💻 Código comentado</span>
      <CodeBlock linguagem="vue" filename="MeuComponente.vue" :codigo="codigoVue">
<span class="keyword">&lt;template&gt;</span>
  <span class="comment">&lt;!-- ✅ :key com ID único, não índice --&gt;</span>
  <span class="keyword">&lt;ul&gt;</span>
    <span class="keyword">&lt;li</span> <span class="property">v-for</span>=<span class="string">"animal in animais"</span> <span class="property">:key</span>=<span class="string">"animal.id"</span><span class="keyword">&gt;</span>
      {{ animal.nome }}
    <span class="keyword">&lt;/li&gt;</span>
  <span class="keyword">&lt;/ul&gt;</span>
<span class="keyword">&lt;/template&gt;</span>

<span class="keyword">&lt;script setup&gt;</span>
<span class="comment">// ✅ Props tipadas</span>
<span class="keyword">const</span> props = <span class="value">defineProps</span>({
  animais: {
    type: Array,
    required: <span class="value">true</span>,
    default: () => []
  },
  titulo: {
    type: String,
    default: <span class="string">'Lista'</span>
  }
})

<span class="comment">// ✅ Emit explícito</span>
<span class="keyword">const</span> emit = <span class="value">defineEmits</span>([<span class="string">'selecionar'</span>, <span class="string">'remover'</span>])
<span class="keyword">&lt;/script&gt;</span>
      </CodeBlock>

      <CodeBlock linguagem="javascript" filename="router/index.js" :codigo="codigoRouter" class="mt-2">
<span class="comment">// ✅ Lazy loading — cada rota = chunk separado</span>
<span class="keyword">const</span> routes = [
  {
    path: <span class="string">'/home'</span>,
    <span class="comment">// Sem lazy loading (ruim para bundle inicial):</span>
    <span class="comment">// component: HomeView</span>

    <span class="comment">// Com lazy loading (recomendado):</span>
    component: () => <span class="value">import</span>(<span class="string">'@/views/HomeView.vue'</span>)
  },
  {
    path: <span class="string">'/galeria'</span>,
    component: () => <span class="value">import</span>(<span class="string">'@/views/GaleriaView.vue'</span>)
  }
]
      </CodeBlock>
    </div>

    <!-- 3. Post-it -->
    <div class="section-block">
      <span class="section-label">🤔 Pergunta-guia</span>
      <PostItNote cor="green" label="📌 Pense nisso...">
        <strong>
          Uma lista de animais é exibida com <code style="font-size:0.9em">v-for</code>, sem
          <code style="font-size:0.9em">:key</code>, e cada item tem um campo de texto.
          A pessoa digita algo no campo do 2º animal. Depois, o 1º animal é removido.
          O que pode acontecer com o texto digitado, e por quê?
        </strong>
        <div style="margin-top:0.75rem; font-size:1rem;">
          <span style="font-weight:700; color:#166534;">Resposta:</span>
          Sem <code style="font-size:0.9em">:key</code>, o Vue usa uma estratégia chamada
          <strong>"patch in-place"</strong> (remendar no lugar): ao remover o 1º item,
          ele <em>reutiliza</em> o 1º elemento DOM e atualiza só o conteúdo.
          O texto digitado no input (que é estado do DOM, não do Vue) fica preso no 1º elemento.
          <br><br>
          Resultado: o texto que você digitou na <strong>Capivara</strong> fica visível na
          <strong>Quati</strong> — como se o texto fosse do animal errado.
          Com <code style="font-size:0.9em">:key="animal.id"</code>, o Vue sabe exatamente
          qual elemento DOM pertence a qual dado e remove o elemento correto.
          Teste no laboratório abaixo!
        </div>
      </PostItNote>
    </div>

    <!-- 4. Laboratório -->
    <div class="section-block">
      <span class="section-label">🔬 Laboratório</span>
      <LabVfor />
    </div>

    <!-- Fontes -->
    <div class="sources-section">
      <h3>📚 Fontes consultadas</h3>
      <ul class="sources-list">
        <li>
          <a href="https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key" target="_blank" rel="noopener">
            Vue 3 Docs — Maintaining State with key
          </a>
        </li>
        <li>
          <a href="https://vuejs.org/guide/components/props.html" target="_blank" rel="noopener">
            Vue 3 Docs — Component Props
          </a>
        </li>
        <li>
          <a href="https://web.dev/articles/vitals" target="_blank" rel="noopener">
            web.dev — Core Web Vitals
          </a>
        </li>
        <li>
          <a href="https://vuejs.org/guide/extras/ways-of-using-vue.html#single-page-application-spa" target="_blank" rel="noopener">
            Vue 3 Docs — SPA &amp; Lazy Loading
          </a>
        </li>
      </ul>
    </div>

    <SheetNav />
  </div>
</template>

<script setup>
import CodeBlock from '@/components/ui/CodeBlock.vue'
import PostItNote from '@/components/ui/PostItNote.vue'
import SheetNav from '@/components/ui/SheetNav.vue'
import LabVfor from '@/components/labs/LabVfor.vue'

const codigoVue = `<template>
  <ul>
    <li v-for="animal in animais" :key="animal.id">
      {{ animal.nome }}
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  animais: { type: Array, required: true, default: () => [] },
  titulo:  { type: String, default: 'Lista' }
})

const emit = defineEmits(['selecionar', 'remover'])
<\/script>`

const codigoRouter = `// ✅ Lazy loading — cada rota = chunk separado
const routes = [
  {
    path: '/home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/galeria',
    component: () => import('@/views/GaleriaView.vue')
  }
]`
</script>

<style scoped>
.practices-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.practice-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  background: white;
  font-size: 0.875rem;
}

.practice-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.practice-item p {
  margin-top: 0.25rem;
  color: rgba(0,0,0,0.6);
  font-size: 0.82rem;
}

.practice-item code {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--ink-blue);
  background: #EFF6FF;
  padding: 0.05rem 0.3rem;
  border-radius: 2px;
}
</style>
