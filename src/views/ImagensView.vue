<template>
  <div class="sheet">
    <div class="section-block">
      <span class="section-label">Folha 4 de 6</span>
      <h1>
        Imagens
        <span class="highlight-title">Responsivas</span>
      </h1>
      <p class="mt-2 text-sm text-muted">
        Imagens são o maior vilão de performance e layout. Configuradas certo, são invisíveis.
        Configuradas errado, quebram o design inteiro.
      </p>
    </div>

    <!-- 1. Explicação -->
    <div class="section-block">
      <span class="section-label">📖 Explicação</span>
      <h2 class="mb-2">As regras de ouro das imagens</h2>

      <div class="rules-grid">
        <div class="rule-item">
          <span class="rule-code">max-width: 100%</span>
          <span class="rule-desc">Imagem nunca ultrapassa o contêiner pai. Essencial!</span>
        </div>
        <div class="rule-item">
          <span class="rule-code">height: auto</span>
          <span class="rule-desc">Mantém proporção ao redimensionar a largura</span>
        </div>
        <div class="rule-item">
          <span class="rule-code">width + height no HTML</span>
          <span class="rule-desc">Reserva o espaço antes da imagem carregar. Evita CLS!</span>
        </div>
        <div class="rule-item">
          <span class="rule-code">loading="lazy" (e quando NÃO usar)</span>
          <span class="rule-desc">Carrega imagens fora da tela só quando o usuário rolar até elas. <strong>⚠️ Quando NÃO usar:</strong> nunca aplique em imagens do topo da página (Hero banner / LCP), pois atrasa a renderização inicial e prejudica a nota do Google!</span>
        </div>
        <div class="rule-item">
          <span class="rule-code">aspect-ratio</span>
          <span class="rule-desc">Define proporção sem precisar saber as dimensões exatas</span>
        </div>
        <div class="rule-item">
          <span class="rule-code">object-fit: cover</span>
          <span class="rule-desc">Preenche o espaço cortando a imagem (sem distorcer)</span>
        </div>
        <div class="rule-item">
          <span class="rule-code">srcset</span>
          <span class="rule-desc">Fornece versões diferentes da imagem para diferentes telas</span>
        </div>
      </div>
    </div>

    <!-- 2. Código -->
    <div class="section-block">
      <span class="section-label">💻 Código comentado</span>
      <CodeBlock linguagem="html" filename="imagens.html" :codigo="codigoHtml">
<span class="comment">&lt;!-- ✅ Imagem BÁSICA responsiva --&gt;</span>
<span class="keyword">&lt;img</span>
  <span class="property">src</span>=<span class="string">"foto.jpg"</span>
  <span class="property">alt</span>=<span class="string">"Descrição acessível da imagem"</span>
  <span class="property">width</span>=<span class="string">"800"</span>     <span class="comment">&lt;!-- ← reserva espaço, evita CLS --&gt;</span>
  <span class="property">height</span>=<span class="string">"450"</span>    <span class="comment">&lt;!-- ← proporção 16:9 --&gt;</span>
  <span class="property">loading</span>=<span class="string">"lazy"</span> <span class="comment">&lt;!-- ← sob demanda (NÃO usar na imagem Hero/LCP do topo!) --&gt;</span>
  <span class="property">style</span>=<span class="string">"max-width:100%; height:auto;"</span>
<span class="keyword">/&gt;</span>

<span class="comment">&lt;!-- ✅ Imagem com múltiplas resoluções (srcset) --&gt;</span>
<span class="keyword">&lt;img</span>
  <span class="property">src</span>=<span class="string">"foto-800.jpg"</span>
  <span class="property">srcset</span>=<span class="string">"foto-400.jpg 400w,
          foto-800.jpg 800w,
          foto-1600.jpg 1600w"</span>
  <span class="property">sizes</span>=<span class="string">"(min-width: 64rem) 800px,
         (min-width: 48rem) 600px,
         100vw"</span>
  <span class="property">alt</span>=<span class="string">"Hero responsivo"</span>
  <span class="property">width</span>=<span class="string">"800"</span> <span class="property">height</span>=<span class="string">"450"</span>
<span class="keyword">/&gt;</span>
      </CodeBlock>

      <CodeBlock linguagem="css" filename="imagens.css" :codigo="codigoCss" class="mt-2">
<span class="comment">/* ✅ Estilo base responsivo para imagens */</span>
<span class="selector">img</span> {
  <span class="property">max-width</span>: <span class="value">100%</span>;    <span class="comment">/* nunca extrapola o pai */</span>
  <span class="property">height</span>: <span class="value">auto</span>;      <span class="comment">/* mantém proporção */</span>
  <span class="property">display</span>: <span class="value">block</span>;    <span class="comment">/* remove espaço fantasma abaixo da imagem */</span>
}

<span class="comment">/* ✅ Container de imagem com proporção fixa */</span>
<span class="selector">.img-container</span> {
  <span class="property">aspect-ratio</span>: <span class="value">16 / 9</span>;  <span class="comment">/* ou 4/3, 1/1 etc. */</span>
  <span class="property">overflow</span>: <span class="value">hidden</span>;
  <span class="property">border-radius</span>: <span class="value">0.5rem</span>;
}

<span class="selector">.img-container img</span> {
  <span class="property">width</span>: <span class="value">100%</span>;
  <span class="property">height</span>: <span class="value">100%</span>;
  <span class="property">object-fit</span>: <span class="value">cover</span>;    <span class="comment">/* preenche sem distorcer */</span>
}
      </CodeBlock>
    </div>

    <!-- 3. Post-it -->
    <div class="section-block">
      <span class="section-label">🤔 Pergunta-guia</span>
      <PostItNote cor="pink" label="📌 Pense nisso...">
        <strong>
          Ao abrir uma página, o texto aparece primeiro. Quando a imagem termina de carregar,
          ela empurra o texto para baixo. Por que isso acontece quando a imagem não tem
          <code style="font-size:0.9em">width</code> e <code style="font-size:0.9em">height</code> no HTML?
          Qual métrica do Google mede esse problema?
        </strong>
        <div style="margin-top:0.75rem; font-size:1rem;">
          <span style="font-weight:700; color:#9F1239;">Resposta:</span>
          Sem <code style="font-size:0.9em">width</code> e <code style="font-size:0.9em">height</code>,
          o browser não sabe o tamanho da imagem antes de baixá-la.
          Então ele renderiza com altura 0px. Quando a imagem chega, o browser descobre as dimensões
          e <strong>recalcula o layout inteiro</strong> — empurrando tudo abaixo dela.
          <br><br>
          Esse fenômeno é chamado de <strong>Layout Shift</strong> e é medido pela métrica
          <strong>CLS — Cumulative Layout Shift</strong> (um dos Core Web Vitals do Google).
          CLS ideal: abaixo de <strong>0.1</strong>. Acima de 0.25 = crítico para SEO e UX.
          A solução: sempre inclua <code style="font-size:0.9em">width</code> e <code style="font-size:0.9em">height</code>
          no HTML — o browser reserva o espaço antes de baixar a imagem.
        </div>
      </PostItNote>
    </div>

    <!-- 4. Laboratório -->
    <div class="section-block">
      <span class="section-label">🔬 Laboratório</span>
      <LabImagens />
    </div>

    <!-- Fontes -->
    <div class="sources-section">
      <h3>📚 Fontes consultadas</h3>
      <ul class="sources-list">
        <li>
          <a href="https://developer.mozilla.org/pt-BR/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images" target="_blank" rel="noopener">
            MDN — Imagens responsivas
          </a>
        </li>
        <li>
          <a href="https://web.dev/articles/cls" target="_blank" rel="noopener">
            web.dev — Cumulative Layout Shift (CLS)
          </a>
        </li>
        <li>
          <a href="https://web.dev/articles/optimize-cls" target="_blank" rel="noopener">
            web.dev — Optimize CLS
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
import LabImagens from '@/components/labs/LabImagens.vue'

const codigoHtml = `<!-- ✅ Imagem BÁSICA responsiva -->
<img
  src="foto.jpg"
  alt="Descrição acessível"
  width="800"
  height="450"
  loading="lazy" <!-- ← sob demanda (NÃO usar na imagem Hero/LCP do topo!) -->  style="max-width:100%; height:auto;"
/>

<!-- ✅ Imagem com srcset (múltiplas resoluções) -->
<img
  src="foto-800.jpg"
  srcset="foto-400.jpg 400w, foto-800.jpg 800w, foto-1600.jpg 1600w"
  sizes="(min-width: 64rem) 800px, (min-width: 48rem) 600px, 100vw"
  alt="Hero responsivo"
  width="800" height="450"
/>`

const codigoCss = `img {
  max-width: 100%;
  height: auto;
  display: block;
}

.img-container {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 0.5rem;
}

.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}`
</script>

<style scoped>
.rules-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}

.rule-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.6rem 1rem;
  border: 1px solid var(--border-subtle);
  border-left: 3px solid var(--ink-blue);
  border-radius: var(--radius-sm);
  background: white;
}

.rule-code {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--ink-blue);
  font-weight: 600;
}

.rule-desc {
  font-size: 0.82rem;
  color: rgba(0,0,0,0.6);
}

@media (min-width: 48rem) {
  .rules-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
